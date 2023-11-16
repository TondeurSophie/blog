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

//affichage de tous les titres
app.get('/articles/titre', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('select titre from articles');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})



//ajout article
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
    const id = req.params.titre
    
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const supp = await conn.query('delete from `articles` where `titre` = ? ', [id]);
        console.log(supp);
        res.status(200).json(supp.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage de l'article avec le titre = ...
app.get('/article/:titre', async (req, res) => {
    const titre = req.params.titre;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM articles WHERE titre = ?;', [titre]);
        if (rows.length > 0) {
            res.status(200).json(rows);
            console.log(rows)
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

//mes articles
app.get('/article_mes/:id', async (req, res) => {
    const id_conn = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM articles WHERE utilisateurs_id = ?;', [id_conn]);
        console.log("connexion",rows)
        if (rows.length > 0) {
            res.status(200).json(rows);
            console.log(rows)
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
})


//modification article
app.put('/article/:titre', async (req, res) => {
    const titre = req.params.titre;
    const { utilisateurs_id, auteur, date_creation, texte } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            // 'UPDATE articles SET utilisateurs_id = ?, auteur = ?, date_creation = ?, texte = ? WHERE titre = ?;',
            // [utilisateurs_id, auteur, date_creation, texte, titre]
            'UPDATE articles SET texte = ? WHERE titre = ?;',
            [texte, titre]
        );
        res.status(200).json({ message: 'Article updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});



//______________________________________________________
//Utilisateur

app.get('/utilisateurs', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('select * from utilisateurs');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

// //ajout utilisateur
app.post('/utilisateurs', async(req, res) => {
    // console.log("post",req);
    let conn;
    bcrypt.hash(req.body.mdp,10)
        .then(async (hash) => {
            console.log("Lancement de la connexion")
            console.log(req.body)
            conn = await pool.getConnection();
            console.log("Lancement de la requête")
            const rows = await conn.query('insert into utilisateurs (nom, email, mdp) values (?,?,?)', [req.body.nom,req.body.email,hash]);
            console.log(rows.affectedRows);
            res.status(200).json(rows.affectedRows);
        })
    
    .catch((error) => res.status(500).json(error))
})

//vérification email dans bdd
app.post('/utilisateursBDD', async(req,res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('select * from utilisateurs where email = ? ', [email]);
        console.log(rows)
        if (rows.length > 0) {
            const hash = rows[0].mdp;
            //compare mdp avec hash
            const match = await bcrypt.compare(mdp,hash);
            console.log(match);
            if (match){
                console.log("Vous êtes connecté")
                res.status(200).json({id:rows[0].id});
            }else{
                console.log("le mdp de correspond pas")
            }
            
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})



app.listen(3008, () => { //ouverture du serveur sur port 3008
    console.log("Serveur à l'écoute") //affiche message dans la console
})