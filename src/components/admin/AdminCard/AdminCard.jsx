import React from 'react'
import './AdminCard.css'
function AdminCard({title, number, icon}) {
  return (
    <div className='card'>
        <div className='card-content'>
            <h3>{title}</h3>
            <p>{number}</p>
        </div>
        <div className='card-icon'>
            <div style={{ fontSize: "24px" }}>{icon}</div>
        </div>
    </div>
  )
}

export default AdminCard