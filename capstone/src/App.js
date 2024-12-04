import './customized.css'
import './customstyle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Explore from './components/explore/Explore';
import LoginRegister from './components/LoginRegister';
import Layout from './components/Layout';
import Recipes from './components/recipes/Recipes';
import Home from './components/home/Home';
import WeeklyPlans from './components/plans/WeeklyPlans';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Layout child={<Explore />} />} />
        <Route path='/home' element={<Layout child={<Home />} />} />
        <Route path='/auth/*' element={<LoginRegister />} />
        <Route path='/recipes' element={<Layout child={<Recipes />} />} />
        <Route path='/plans' element={<Layout child={<WeeklyPlans />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
