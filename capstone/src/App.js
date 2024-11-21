import './customized.css'
import './customstyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyNavbar from './components/MyNavbar';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar></MyNavbar>
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
