import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Sobre from './Pages/Sobre.js';
import Contato from './Pages/Contato.js';
import Login from './Pages/Login.js';
import Dashboard_Analise from './Pages/Dashboard-analise.js';
import Dashboard_Resultado from './Pages/Dashboard-resultado.js';
import Dashboard_Resumo from './Pages/Dashboard-resumo.js';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard-analise" element={<Dashboard_Analise />} />
          <Route path='/dashboard-resultado' element={<Dashboard_Resultado />} />
          <Route path='/dashboard-resumo' element={<Dashboard_Resumo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
