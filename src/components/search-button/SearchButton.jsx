import React, { useRef, useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import './search-button.scss'

function SearchButton(props) {

  const inputRef = useRef();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  // independent function
  const validate = (value) => {
    if (!value) {
      inputRef.current.focus();
      setText(value);
      setError(true);
      console.log("El error es verdadero");
      return false;
    }
    setError(false);
    return true;
  };

  const onChange = (event) => {
    setText(event.target.value);
    setError(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if(validate(text)) {
      navigate(`/search/name=${text}`)
    }
    setText("");
    console.log("errosIs", error);
  }

  return (
    <div className={`searchButton ${props.clicked ? 'open' : ''} ${error ? "input-error" : ""}`}>
      <form 
        className={`searchButton__form ${props.clicked ? 'open' : ''}`}
        onSubmit={onSubmit}
      >
        <input 
          className={`searchButton__input ${props.clicked ? 'open' : ''}`}
          ref={inputRef}
          type="text"
          value={text}
          onChange={onChange}
          placeholder='Search' 
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