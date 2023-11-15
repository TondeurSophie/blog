import React, { useEffect, useState } from 'react';


export default function Accueil() {
  
  
  // Pour stocker
  const [blog, setblog] = useState([]); 
  // Pour gérer l'affichage
  const [affichage, setAffichage] = useState(false);


  const recup = async ()=>{
    //Chargement BDD
    await fetch(`http://localhost:3008/articles`, 
    {method: "GET"})
    .then(reponse => reponse.json()).then(data => {
        setblog(data);
        setAffichage(true);
        console.log(data);
      })
      .catch(error => console.error(error));
  };





  useEffect(() => {
    recup()
  },[])

  

  return (
    <div>
      {affichage ? 
        blog.map(articles => (
          <div>
            <fieldset>
              <p>Articles : {articles.utilisateurs_id}</p>
              <p>Articles : {articles.titre}</p>
            </fieldset>
          </div>
        )) : <p>Chargement ...</p>}
      
        <br/><br/>
    </div>
  )
}

