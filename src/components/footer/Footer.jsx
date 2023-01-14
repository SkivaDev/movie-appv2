import React from 'react'
import './footer.scss'

function Footer() {

  const thisYear = "2023";

  return (
    <div className='footer'>
      <div className='footer__container'>
        <h2 className='footer__text'>
          {`© All rights reserved | Fabrizio Ortiz ${thisYear}`}
        </h2>
      </div>
    </div>
  )
}

export default Footer