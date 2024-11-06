import React from 'react'
import './user.css'

function UserFeedback() {
  return (
    <div className='w-full bg-green-300'>
        <div className='user-feedback-table-container'>
            <table className='table1'>
                <tr className='tr1'>
                <th className='th1'>First Name</th>
                <th className='th1'>Last Name</th>
                <th className='th1'>Points</th>
                </tr>
                <tr className='tr1'>
                <td className='td1'>Peter</td>
                <td className='td1'>Griffin</td>
                <td className='td1'>$100</td>
                </tr>
                <tr className='tr1'>
                <td className='td1'>Lois</td>
                <td className='td1'>Griffin</td>
                <td className='td1'>$150</td>
                </tr>
                <tr className='tr1'>
                <td className='td1'>Joe</td>
                <td className='td1'>Swanson</td>
                <td className='td1'>$300</td>
                </tr>
                <tr className='tr1'>
                <td className='td1'>Cleveland</td>
                <td className='td1'>Brown</td>
                <td className='td1'>$250</td>
                </tr>
            </table>
        </div>
    </div>
  )
}

export default UserFeedback
