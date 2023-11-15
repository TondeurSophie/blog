require('dotenv').config()
const mariadb = require('mariadb');
const express = require('express') //récupération d'express
const app = express() //variable utilisant librairie express
let cors = require('cors')
const bcrypt = require('bcrypt');


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

// //ajout article
app.post('/article', async(req, res) => {
    console.log("post",req);
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('insert into articles values (?,?,?,?,?)', [req.body.utilisateurs_id,req.body.titre,req.body.auteur,req.body.date_creation,req.body.texte]);
        // console.log(rows);
        res.status(200).json(rows.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})

// //supprimer article
app.delete('/article/:titre', async(req, res) => {
    const id = parseInt(req.params.id)
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const supp = await conn.query('delete from `articles` where `titre` = ?', [id]);
        console.log(supp);
        res.status(200).json(supp);
    }
    catch(err){
        console.log(err);
    }
})

// //afficher les articles en fonction utilisateur_id
// //exemple : http://localhost:3000/question/1
// app.get('/articleID', (req, res) => {
//     const id = parseInt(req.params.id)
//     const larticle = articles.find(articles => articles.utilisateurs_id === id)
//     res.status(200).json(larticle)
// })


// //ajout utilisateur
app.post('/utilisateur', async(req, res) => {
    console.log("post",req);
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('insert into utilisateurs values (?,?,?,?)', [req.body.id,req.body.nom,req.body.email,req.body.mdp]);
        // console.log(rows);
        res.status(200).json(rows.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})


app.listen(3008, () => { //ouverture du serveur sur port 3008
    console.log("Serveur à l'écoute") //affiche message dans la console
})