/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Detail from './pages/Detail';
import logo from './assets/logo.png'


function App() {
  const navigate = useNavigate();

  return (
    <>
      <header
        css={css`
          padding: 0.2rem 0;
        `}
      >
        <img
          src={logo}
          height="55"
          alt="로고"
          onClick={() => navigate('/')}
          css={css`
            cursor: pointer;
          `}
        />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/:complimentId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
