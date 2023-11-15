import React from 'react'
import '../App.css'

export default function Accueil() {
  return (
    <div>
        <br/>
        Bienvenue sur notre blog
        <br/>
        Ce blog vous permet de lire des articles concernant les films et les animaux.
        <img src={`${process.env.PUBLIC_URL}/blog.jpeg`} alt='' className='image'/>
    </div>
  )
}


