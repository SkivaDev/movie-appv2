import React from 'react'
import './language-toggle.scss'

function LanguageToggle(props) {
  return (
    <label 
    className={`LanguageToggle ${props.clickedBurger ? 'active-burger': ''}`}
    >
      <input className='LanguageToggle__input' type="checkbox"/>
      <span className='LanguageToggle__slider slider'></span>
      <span className='LanguageToggle__text text on'>EN</span>
      <span className='LanguageToggle__text text off'>ES</span>
    </label>
  )
}

export default LanguageToggle