import './customized.css'
import './customstyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyNavbar from './components/MyNavbar';
import Home from './components/home/Home';
import MyFooter from './components/MyFooter';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
