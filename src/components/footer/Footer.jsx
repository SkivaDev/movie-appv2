import React from 'react'
import { useTranslation } from 'react-i18next'
import './footer.scss'

function Footer() {

  const [t] = useTranslation("global");
  const thisYear = new Date().getFullYear();

  return (
    <div className='footer'>
      <div className='footer__container'>
        <h2 className='footer__text'>
          {`© ${t("lang.allRightsReserved")} | Fabrizio Ortiz ${thisYear}`}
        </h2>
      </div>
    </div>
  )
}

export default Footer