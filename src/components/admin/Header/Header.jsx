import React from 'react'
import './Header.css'
function Header() {
  return (
    <div>
        <div className='header-box'>
            <div className='search-box'>
                <input className='search-input' placeholder='Your keyword'></input>
                <button>Search</button>
            </div>
            <div className='logout-box'>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Header