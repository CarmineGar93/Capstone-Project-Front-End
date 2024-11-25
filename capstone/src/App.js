import './customized.css'
import './customstyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import LoginRegister from './components/LoginRegister';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Layout child={<Home />} />} />
        <Route path='/auth/*' element={<LoginRegister />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
