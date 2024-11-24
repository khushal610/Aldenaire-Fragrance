import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import for table functionality

function SellReport() {
  const [orderData, setOrderData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6666"];

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/get-all-order-data");
      const fetchedData = response.data;

      setOrderData(fetchedData);
      filterDataByMonth(fetchedData, selectedMonth);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const filterDataByMonth = (data, month) => {
    if (!month) {
      setChartData([]);
      setTotalAmount(0);
      return;
    }

    const filteredData = data.filter((order) => {
      const orderMonth = new Date(order.createdAt).getMonth() + 1; // Get month (1-indexed)
      return orderMonth === parseInt(month);
    });

    const productCount = filteredData.flatMap((order) => order.orderInfo)
      .reduce(
        (acc, item) => {
          acc.counts[item.productName] = (acc.counts[item.productName] || 0) + 1;
          acc.prices[item.productName] = parseFloat(item.productPrice); // Ensure price is a number
          acc.totalAmount += parseFloat(item.productPrice) * item.quantity; // Ensure correct math
          return acc;
        },
        { counts: {}, prices: {}, totalAmount: 0 }
      );

    const processedData = Object.entries(productCount.counts).map(([productName, count]) => ({
      productName,
      count,
      price: productCount.prices[productName], // Include price in the chart data
    }));

    setChartData(processedData);
    setTotalAmount(productCount.totalAmount);
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    filterDataByMonth(orderData, selectedMonth);
  }, [selectedMonth, orderData]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleMonthDoubleClick = () => {
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-indexed)
    setSelectedMonth(currentMonth.toString()); // Set the current month
  };

const downloadPDF = () => {
  const doc = new jsPDF();
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const organizationName = "Aldenaire Fragrance";
  
  // Title with organization name and date
  doc.setFontSize(18);
  doc.text(organizationName, 14, 15); // Organization Name
  
  // Move down the position for the title
  doc.setFontSize(12);
  const title = `Selling Report for ${selectedMonth ? `Month: ${selectedMonth}` : "All Time"}`;
  doc.text(title, 14, 25); // Month/All Time
  
  // Move down the position further before starting the table
  const startY = 35;
  
  // Add table with product details
  const tableColumns = ["Product Name", "Count", "Price"];
  const tableRows = chartData.map(({ productName, count, price }) => [
    productName,
    count,
    `${price.toFixed(2)} Rs`, // Ensure price is a number and format it
  ]);
  
  doc.autoTable({
    head: [tableColumns],
    body: tableRows,
    startY: startY,
  });

  // Add total amount at the bottom of the table
  doc.setFontSize(12);
  const totalY = doc.lastAutoTable.finalY + 10; // Calculate position based on the table's end
  doc.text(`Total Amount: ${totalAmount.toFixed(2)} Rs`, 14, totalY);

  // Save the PDF with today's date
  doc.save(`Selling_Report_${dateStr}.pdf`);
};


  return (
    <div className="py-20 w-full p-10 flex flex-col lg:flex-row">
      {/* Chart Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-3xl mb-4">Selling Report Page</h2>

        {/* Month Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="month" className="font-medium text-lg">
            Filter by Month:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            onDoubleClick={handleMonthDoubleClick} // Handle double click
            className="ml-2 p-2 border rounded"
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="productName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ productName, count }) => `${productName}: ${count}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
          {/* Show button only if there is data */}
          {chartData.length > 0 && (
            <button
              onClick={downloadPDF}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download Report as PDF
            </button>
          )}
        </ResponsiveContainer>
      </div>

      {/* Right Section: Product Selling Details */}
      <div className="w-full lg:w-1/3 lg:pl-10 mt-8 lg:mt-0">
        <h3 className="text-2xl mb-4">Product Selling Details</h3>
        <ul className="space-y-2">
          {chartData.map(({ productName, count }, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border rounded shadow-sm"
            >
              <span className="font-medium">{productName}</span>
              <span className="text-gray-600">{count}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-lg font-semibold">
          Total Amount Sold: ₹{totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default SellReport;
