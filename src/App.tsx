import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';



function App() {
  return (

    <BrowserRouter>
      <header>
        <p>logo</p>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
