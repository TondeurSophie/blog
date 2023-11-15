import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Accueil from './components/Accueil.js';
import Liste from './components/Liste.js';
import Connexion from './components/Connexion.js';
function App() {
  return (
    <div>
    <Link to="/">Accueil</Link>
      <Link to="/liste">Liste</Link>
      <Link to="/connexion">Connexion</Link>

    <Routes>     
        {/* <Route exact path="/" component={<Accueil/>} /> */}
        <Route path="/"           element={<Accueil/>}/>
        <Route path="/liste"      element={<Liste/>} />
        <Route path="/connexion"  element={<Connexion/>} />
    </Routes>
    </div>
  );
  
}

export default App;
