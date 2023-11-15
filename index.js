const express = require('express');
require('dotenv').config();
const app = express();
const mariadb = require('mariadb');
const cors = require('cors');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.use(express.json());
app.use(cors());

app.get('/articles', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM articles;');
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

app.get('/', (req, res) => {
    res.status(200).send('<h1> Page d\'accueil </h1>');
});

app.get('/article/:titre', async (req, res) => {
    const titre = req.params.titre;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM articles WHERE titre = ?;', [titre]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
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

app.post('/article', async (req, res) => {
    const nouvelArticle = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            'INSERT INTO articles (titre, theme, article, reponse) VALUES (?, ?, ?, ?);',
            [nouvelArticle.titre, nouvelArticle.theme, nouvelArticle.article, nouvelArticle.reponse]
        );
        res.status(201).json({ message: 'Article added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

app.put('/article/:titre', async (req, res) => {
    const titre = req.params.titre;
    const { theme, article, reponse } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            'UPDATE articles SET theme = ?, article = ?, reponse = ? WHERE titre = ?;',
            [theme, article, reponse, titre]
        );
        res.status(200).json({ message: 'Article updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

app.delete('/article/:titre', async (req, res) => {
    const titre = req.params.titre;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('DELETE FROM articles WHERE titre = ?;', [titre]);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

// Lancement du serveur
app.listen(8000, () => {
    console.log('Server started on port 8000');
  })