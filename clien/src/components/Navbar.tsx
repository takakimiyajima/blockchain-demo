import React from 'react'

export const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <h2>BlockChains</h2>
      </div>
      <ul className='navLinks'>
        <li>Market</li>
        <li>Exchange</li>
        <li>BlockChain</li>
        <li>Walletd</li>
      </ul>
      <button>Login</button>
    </nav>
  )
}
