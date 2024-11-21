import './customized.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyNavbar from './components/MyNavbar';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar></MyNavbar>
      <Routes>
        <Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
