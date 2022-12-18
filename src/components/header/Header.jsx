import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import BurgerButton from '../burger-button/BurgerButton'
import LanguageToggle from '../language-toggle/LanguageToggle'
import SearchButton from '../search-button/SearchButton'
import SearchInput from '../search-input/SearchInput'

import './header.scss'

const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Trending',
    path: '/trending'
  },
  {
    display: 'Categories',
    path: '/categories'
  },
  {
    display: 'Popular',
    path: '/popular'
  },
  {
    display: 'Upcoming',
    path: '/upcoming'
  },
]

function Header() {

  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex(e => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          headerRef.current.classList.add('shrink');
      } else {
          headerRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
        window.removeEventListener('scroll', shrinkHeader);
    };
  }, [])
  


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