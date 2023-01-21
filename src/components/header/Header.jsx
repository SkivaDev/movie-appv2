import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import BurgerButton from '../burger-button/BurgerButton'
import LanguageToggle from '../language-toggle/LanguageToggle'
import SearchButton from '../search-button/SearchButton'
import SearchInput from '../search-input/SearchInput'

import './header.scss'
/*
import { useTranslation } from 'react-i18next'
const [t] = useTranslation("global");
`${t("lang.home")}`
*/
function Header() {

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [t] = useTranslation("global");

  const headerNav = [
    {
      display: `${t("lang.home")}`,
      path: '/'
    },
    {
      display: `${t("lang.trending")}`,
      path: '/trending'
    },
    {
      display: `${t("lang.categories")}`,
      path: '/categories'
    },
    {
      display: `${t("lang.popular")}`,
      path: '/popular'
    },
    {
      display: `${t("lang.upcoming")}`,
      path: '/upcoming'
    },
  ]

  const active = headerNav.findIndex(e => e.path === pathname);

  // useEffect(() => {
  //   const shrinkHeader = () => {
  //     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
  //         headerRef.current.classList.add('shrink');
  //     } else {
  //         headerRef.current.classList.remove('shrink');
  //     }
  //   }
  //   window.addEventListener('scroll', shrinkHeader);
  //   return () => {
  //       window.removeEventListener('scroll', shrinkHeader);
  //   };
  // }, [])
  


  //click burger sidevar
  const [clickedBurger, setClickedBurger] = useState(false);
  const handleClickBurger = () => {
    setClickedBurger(!clickedBurger);
  }
  // click searche btn input
  const [clickedSearcher, setClickedSearcher] = useState(false);
  const handleclickSearcher = () => {
    setClickedSearcher(!clickedSearcher);
  }

  return (
    <div ref={headerRef} className='header'>
      <div className='header--background'>
        <div className='header__wrap container'>

          <div className='header__burger'>
            <BurgerButton clicked={clickedBurger} handleClick={handleClickBurger}/>
          </div>

          <div className={`header__title
            ${clickedSearcher ? 'active-searcher' : ''}`}
          >
            <Link to='/' className='title'>MOVIEAPP</Link>
          </div>

          <ul className={`header__nav 
            ${clickedBurger ? 'active-burger' : ''}`}
          >
            {
              headerNav.map((e, i) => (
                <li key={i} className={`${i === active ? 'active' : ''}`}>
                  <Link to={e.path}>
                    {e.display}
                  </Link>
                </li>
              ))
            }
          </ul>

          <div className={`header__cfg 
            ${clickedBurger ? 'active-burger': ''}
            ${clickedSearcher ? 'active-searcher' : ''}`}
          >
            <LanguageToggle
             clickedBurger={clickedBurger}
            />
            <SearchInput/>
          </div>

          <div 
            className={`header__searching 
            ${clickedSearcher ? 'active-searcher' : ''}`}
          >
            <SearchButton clicked={clickedSearcher} handleClick={handleclickSearcher}/>
          </div>
          
          <div 
            className={`header__sidevar 
            ${clickedBurger ? 'active-burger': ''}`}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header