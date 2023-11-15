import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Accueil from './components/Accueil.js';
import Liste from './components/Liste.js';
import Connexion from './components/Connexion.js';
import Inscription from './components/Inscription.js';
function App() {
  return (
    <div>
      <div className='header'>
        <Link className="button" to="/">Accueil</Link>
        <Link className="button" to="/liste">Liste</Link>
        <Link className="button" to="/connexion">Connexion</Link>
        <Link className="button" to="/inscription">Inscription</Link>
      </div>
      <center><h1 className='titre'>Filmox</h1></center>
    <Routes>     
        {/* <Route exact path="/" component={<Accueil/>} /> */}
        <Route path="/"           element={<Accueil/>}/>
        <Route path="/liste"      element={<Liste/>} />
        <Route path="/connexion/*"  element={<Connexion/>} />
        <Route path="/inscription"      element={<Inscription/>} />
    </Routes>
    
    </div>
  );
  
}

export default App;
