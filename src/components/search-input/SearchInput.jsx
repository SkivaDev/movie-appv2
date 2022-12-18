import React, { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import './search-input.scss'

function SearchInput() {

  const inputRef = useRef();
  const onSubmit = () => {}
  const onChange = () => {}

  const text = "";

  return (
    <div className='SearchInput'>
      <form className={`SearchInput__form`} onSubmit={onSubmit}>
        <input 
          className={`SearchInput__input`} 
          ref={inputRef}
          type="text"
          value={text}
          onChange={onChange}
          placeholder='Search'
        />
        <button className={`SearchInput__btn`} type="submit">
          <BiSearch className={`SearchInput__logo`}/>
        </button>
      </form>
    </div>
  )
}

export default SearchInput