const express = require('express') // récupération d'express
require('dotenv').config()
const app = express() //variable utilisant la librairie récupération d'express
const mariadb = require('mariadb');
let cors = require('cors')
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database : process.env.DB_DTB,
    user:process.env.DB_USER,
    password:process.env.DB_PWD,
});
const article = [];
app.get('/articles',async(req,res)=>{
    let conn;
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête")
        const rows = await conn.query('Select * from articles;');
        console.log(rows);
        res.status(200).json(rows)
    }
    catch(err){
        console.log(err);
    }
})
app.use(express.json())
app.use(cors())
//On définit la route racine"/"
app.get("/", (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1> Page d'accueil </h1> "); //On envoie du code HTML
});



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

app.get('/article/:titre', (req, res) => {
    const titre = req.params.titre; // Utilisez le bon nom de paramètre
    const larticle = article.find(article => article.titre === titre);
    res.status(200).json(larticle);
});

app.post('/article', (req,res)=>{
    article.push(req.body)
    res.status(200).json(article)
})

app.put('/article/:titre', (req, res) => {
    const titre = req.params.titre;
    let larticle = article.find(article => article.titre === titre);
    larticle.theme = req.body.theme;
    larticle.article = req.body.article;
    larticle.reponse = req.body.reponse;
    res.status(200).json(larticle);})

    app.delete('/article/:titre', (req, res) => {
        const titre = req.params.titre;
        let larticle = article.find(article => article.titre === titre);
        article.splice(article.indexOf(larticle), 1);
        res.status(200).json(article);
    });

app.listen(8000, () => {
    console.log('Server started on port 8000');
  })