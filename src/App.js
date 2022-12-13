import './App.scss';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import DetailPage from './pages/DetailPage';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <HashRouter>

        <Header/>

        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/trending' element={<CatalogPage />} />

          <Route path='/categories' element={<CatalogPage />} />

          <Route path='/popular' element={<CatalogPage />} />
          <Route path='/upcoming' element={<CatalogPage />} />

          <Route path='/search/name=:keyword' element={<CatalogPage /> } />
          <Route path='/movie/:id' element={<DetailPage />} />
          <Route path="*" element={<p>Not found 404</p>} />
        </Routes>

        <Footer/>
      </HashRouter>
    </>
    );
}

export default App;
