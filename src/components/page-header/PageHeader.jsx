import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { BiArrowBack } from "react-icons/bi"
import './page-header.scss'

function PageHeader(props) {

  const [t] = useTranslation("global");
  const [titlePage, setTitlePage] = useState("");

  const navigate = useNavigate();

  const returnBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const confTitlePage = () => {
      switch (props.category) {
        case "trending":
          setTitlePage(`${t("lang.trendingMovies")}`);
          break;
        case "upcoming":
          setTitlePage(`${t("lang.upcomingMovies")}`);
          break;
        case "popular":
          setTitlePage(`${t("lang.popularMovies")}`);
          break;
        case "categories":
          setTitlePage(`${t("lang.categories")}`);
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
          <p className={`button-text`}>{`${t("lang.goBack")}`}</p>
        </button>
      </div>
    </div>
  )
}

export default PageHeader