const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname, 'banco_de_dados.db');
const db = new sqlite3.Database(dbPath);

// Middleware para permitir o acesso aos arquivos estáticos na pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter todos os cursos
app.get('/cursos', (req, res) => {
    db.all('SELECT * FROM cursos', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro interno do servidor');
        } else {
            res.json(rows);
        }
    });
});

// Rota para obter todas as disciplinas de um curso específico
app.get('/disciplinas/:cursoId', (req, res) => {
    const cursoId = req.params.cursoId;
    db.all('SELECT * FROM disciplinas WHERE curso_id = ?', [cursoId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro interno do servidor');
        } else {
            res.json(rows);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});
