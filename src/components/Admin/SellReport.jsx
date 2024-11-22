import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import axios from "axios";

function SellReport() {
  const [orderData, setOrderData] = useState([]);
  const [chartData, setChartData] = useState([]);


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6666"];

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/get-all-order-data");
      const fetchedData = response.data;

    
      const productCount = fetchedData.flatMap((order) => order.orderInfo)
        .reduce((acc, item) => {
          acc[item.productName] = (acc[item.productName] || 0) + 1;
          return acc;
        }, {});

    
      const processedData = Object.entries(productCount).map(([productName, count]) => ({
        productName,
        count,
      }));

      setOrderData(fetchedData);
      setChartData(processedData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="py-20 w-full p-10">
      <h2 className="text-3xl">Selling Report Page</h2>
      <ResponsiveContainer width="100%" aspect={3}>
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
      </ResponsiveContainer>
    </div>
  );
}

export default SellReport;
