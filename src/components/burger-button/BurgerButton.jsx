import React from 'react'
import './burger-button.scss'

function BurgerButton(props) {

  return (
    <div
      onClick={props.handleClick}
      className={`BurgerButton ${props.clicked ? 'open' : ''}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default BurgerButton