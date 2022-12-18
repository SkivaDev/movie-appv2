import React from 'react'
import { BiSearch } from "react-icons/bi"
import './search-button.scss'

function SearchButton(props) {


  const onSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div className={`searchButton ${props.clicked ? 'open' : ''}`}>
      <form 
        className={`searchButton__form ${props.clicked ? 'open' : ''}`}
        onSubmit={onSubmit}
      >
        <input 
          className={`searchButton__input ${props.clicked ? 'open' : ''}`}
          type="text" 
        />
        <button
          onClick={props.handleClick}
          type='submit'
          className={`searchButton__btn ${props.clicked ? 'open' : ''}`}
        >
         <BiSearch className={`searchButton__logo`}/>
        </button>
      </form>
    </div>
  )
}

export default SearchButton