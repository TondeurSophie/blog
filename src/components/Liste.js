import React, { useEffect, useState } from 'react';

export default function Liste() {
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
        <center><h1>Liste de tous les articles</h1></center>
       {affichage ? 
         blog.map(articles => (
           <div>
             <fieldset>
               <p>Date de publication : {articles.date_creation}</p>
               <p>Auteur : {articles.auteur}</p>
               <p>Titre : {articles.titre}</p>
               <p> {articles.texte}</p>
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
       
         <br/><br/>
     </div>
   )
  
}