require('dotenv').config()
const mariadb = require('mariadb');
const express = require('express') //récupération d'express
const app = express() //variable utilisant librairie express
let cors = require('cors')
//const question = require('./question.json')

console.log(process.env.DB_HOST)
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectLimit:100
});

app.use(express.json())
app.use(cors())

//connexion BDD
app.get('/articles', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('select * from articles');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})


app.listen(3008, () => { //ouverture du serveur sur port 3000
    console.log("Serveur à l'écoute") //affiche message dans la console
})