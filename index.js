const express = require('express') //récupération d'express
const app = express() //variable utilisant librairie express





app.listen(3000, () => { //ouverture du serveur sur port 3000
    console.log("Serveur à l'écoute") //affiche message dans la console
})