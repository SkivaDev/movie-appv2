import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
import './page-header.scss'

function PageHeader(props) {

  const [titlePage, setTitlePage] = useState("");

  const navigate = useNavigate();

  const returnBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const confTitlePage = () => {
      switch (props.category) {
        case "trending":
          setTitlePage("Trending Movies");
          break;
        case "upcoming":
          setTitlePage("Upcoming Movies");
          break;
        case "popular":
          setTitlePage("Popular Movies");
          break;
        case "categories":
          setTitlePage("Categories");
          break;
        default:
          setTitlePage(props.keyword);
          break;
      }
    }
    confTitlePage();
  }, [props.category])

  return (
    <div className={`pageHeader`}>
      <div className={`pageHeader__text`}>
        <h1 className={`text`}>
          {titlePage}
        </h1>
      </div>
      <div className={`pageHeader__btn`}>
        <button className={`button`} onClick={returnBack}>
          <BiArrowBack className={`button-icon`} />
          <p className={`button-text`}>GO BACK</p>
        </button>
      </div>
    </div>
  )
}

export default PageHeader