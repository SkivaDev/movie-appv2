import React, { useEffect, useRef } from 'react'
import { IoIosArrowUp } from "react-icons/io"
import './up-button.scss'

function TopButton() {

  const refUpButton = useRef();

  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    clientWidth,
  } = document.documentElement;

  useEffect(() => {
    const addAnEventListener = () => {
     const isTablet = clientWidth <= 1024;
     if(isTablet) {
      window.addEventListener('scroll', showUpButton)
     } else {
      window.removeEventListener('scroll', showUpButton)
     }
    }
    addAnEventListener();
  }, [])
  
  const showUpButton = () => {

    if(document.documentElement.scrollTop >= window.innerHeight) {
      refUpButton.current.style.display = "block";
    } else {
      refUpButton.current.style.display = "none";
    }

  }

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth',});
  }

  return (
    <button className='upButton' ref={refUpButton} onClick={handleClick}>
      <div className='upButton__container'>
        <IoIosArrowUp className='upButton__icon'/>
      </div>
    </button>
  )
}

export default TopButton