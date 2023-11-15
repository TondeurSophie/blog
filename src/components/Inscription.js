import React, { useState } from 'react';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');

  const handleLogin = () => {
    
  };

  return (
    <div>
<div className='formulaire'>
    <center>
      <h2>Inscription</h2>
      <form>
      <label>Nom: 
          <input
            type="text"
            // value={nom}
            // onChange={(e) => setNom(e.target.value)}
          />
        </label>
        <br/>
        <label>Email: 
          <input
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br/>
        <label>Mot de passe:
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button type="button" onClick={handleLogin}>S'inscrire</button>
      </form>
      </center>
    </div>
    </div>
  )
}