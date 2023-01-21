import React , {useState} from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useTranslation } from 'react-i18next'
import './language-toggle.scss'

function LanguageToggle(props) {

  const [t, i18n] = useTranslation("global");

  const defaultLanguage = {
    language: "es",
  }

  const {
    item: language,
    saveItem: saveLanguage,
  } = useLocalStorage("language_config", defaultLanguage);

  const onChange = () => {
    if(language.language === "es") {
      i18n.changeLanguage("en");
      saveLanguage({
       language: "en",
      })
    } else {
      i18n.changeLanguage("es");
      saveLanguage({
        language: "es",
       })
    }
  }

  return (
    <label 
    className={`LanguageToggle ${props.clickedBurger ? 'active-burger': ''}`}
    >
      <input className='LanguageToggle__input' type="checkbox" onChange={onChange} checked={language.language === "es" ? false : true}/>
      <span className='LanguageToggle__slider slider'></span>
      <span className='LanguageToggle__text text on'>EN</span>
      <span className='LanguageToggle__text text off'>ES</span>
    </label>
  )
}

export default LanguageToggle