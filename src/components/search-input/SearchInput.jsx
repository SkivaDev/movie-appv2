import React, { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import './search-input.scss'

function SearchInput() {

  const inputRef = useRef();
  const navigate = useNavigate();
  const [t] = useTranslation("global");


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
    <div className={`SearchInput ${error ? "input-error" : ""}`}>
      <form className={`SearchInput__form`} onSubmit={onSubmit}>
        <input 
          className={`SearchInput__input`} 
          ref={inputRef}
          type="text"
          value={text}
          onChange={onChange}
          placeholder={`${t("lang.search")}`}
        />
        <button 
        className={`SearchInput__btn`} 
        type="submit"
        >
          <BiSearch className={`SearchInput__logo`}/>
        </button>
      </form>
    </div>
  )
}

export default SearchInput