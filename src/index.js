import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";

import App from './App';

const languageConfig = JSON.parse(localStorage.getItem("language_config"));

i18next.init({
  interpolation: { escapeValue: false},
  lng: `${languageConfig ? languageConfig.language : "es"}`,
  resources: {
    en: {
      global: global_en
    },
    es: {
      global: global_es
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

