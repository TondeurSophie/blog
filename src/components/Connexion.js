import React, { useState } from 'react';
import '../App.css'

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
  };

  return (
    
    <div className='formulaire'>
    <center>
      <h2>Connexion</h2>
      <form>
        <label>Email: 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br/>
        <label>Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button type="button" onClick={handleLogin}>Se Connecter</button>
      </form>
      </center>
    </div>
    
  );
}

export default Connexion;