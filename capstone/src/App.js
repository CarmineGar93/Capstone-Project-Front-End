import './customized.css'
import './customstyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Explore from './components/explore/Explore';
import LoginRegister from './components/LoginRegister';
import Layout from './components/Layout';
import Recepies from './components/recepies/Recepies';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Layout child={<Explore />} />} />
        <Route path='/home' element={<Layout child={<Home />} />} />
        <Route path='/auth/*' element={<LoginRegister />} />
        <Route path='/recepies' element={<Layout child={<Recepies />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
