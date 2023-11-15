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
app.get('/question',async(req,res)=>{
    let conn;
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête")
        const rows = await conn.query('Select * from question;');
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

app.get("/1", (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1> Page 1 </h1> "); //On envoie du code HTML
});

app.get("/2", (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1> Page 2 </h1> "); //On envoie du code HTML
});

app.get("/page/:numPage/", (req, res) => {
    let page= req.params.numPage; //On récupère la variable numPage
    page=parseInt(page);
    let valide=Number.isInteger(page);
    if(valide){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1> Page " + page +" </h1>");
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1> Attention on attends un entier !!! </h1>");
    }
    
});

app.get('/question', (req,res) => {
    res.status(200).json(question)
})

app.get('/question/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const laQuestion = question.find(question=> question.id === id)
    res.status(200).json(laQuestion)
})

app.post('/question', (req,res)=>{
    question.push(req.body)
    res.status(200).json(question)
})

app.put('/question/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    let laQuestion = question.find(question=> question.id === id)
    laQuestion.theme=req.body.theme,
    laQuestion.question=req.body.question,
    laQuestion.reponse=req.body.reponse,
    res.status(200).json(laQuestion)
})

app.delete('/question/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    let laQuestion = question.find(question=> question.id === id)
    question.splice(question.indexOf(laQuestion),1)
    res.status(200).json(question)
})

app.listen(8000, () => {
    console.log('Server started on port 8000');
  })