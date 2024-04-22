const express = require('express'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express();
const port = 3000; 

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/data', express.static(path.join(__dirname, 'data'))); 

// Função para gerar um ID único
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Rota para servir a página inicial
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Rota para autenticação de alunos
app.post('/login/aluno', (req, res) => {
    const { email, senha } = req.body; 
    fs.readFile('data/alunos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler os dados de alunos.' });
            return;
        }
        const alunos = JSON.parse(data); 
        const aluno = alunos.find(a => a.email === email && a.senha === senha); 
        if (aluno) {
            res.json({ message: 'Login bem-sucedido', aluno }); 
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' }); 
        }
    });
});

// Rota para cadastro de alunos
app.post('/cadastro/aluno', (req, res) => {
    const { nome, email, senha } = req.body;
    fs.readFile('data/alunos.json', 'utf8', (err, data) => { 
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler os dados de alunos.' });
            return;
        }
        const alunos = JSON.parse(data); 
        const alunoExistente = alunos.find(a => a.email === email);
        if (alunoExistente) {
            res.status(400).json({ error: 'Já existe um aluno cadastrado com este e-mail.' }); 
            return;
        }
        const novoAluno = { id: generateId(), nome, email, senha, disciplinas: [] }; 
        alunos.push(novoAluno);
        fs.writeFile('data/alunos.json', JSON.stringify(alunos, null, 2), (err) => { 
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
                return;
            }
            res.json({ message: 'Cadastro de aluno realizado com sucesso', aluno: novoAluno }); 
        });
    });
});

// Rota para autenticação de professores
app.post('/login/professor', (req, res) => {
    const { email, senha } = req.body; 
    fs.readFile('data/professores.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler os dados de professores.' });
            return;
        }
        const professores = JSON.parse(data); 
        const professor = professores.find(p => p.email === email && p.senha === senha); 
        if (professor) {
            res.json({ message: 'Login bem-sucedido', professor });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' }); 
        }
    });
});

// Rota para cadastro de professores
app.post('/cadastro/professor', (req, res) => {
    const { nome, email, senha } = req.body; 
    fs.readFile('data/professores.json', 'utf8', (err, data) => { 
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler os dados de professores.' });
            return;
        }
        const professores = JSON.parse(data); 
        const professorExistente = professores.find(p => p.email === email); 
        if (professorExistente) {
            res.status(400).json({ error: 'Já existe um professor cadastrado com este e-mail.' }); 
            return;
        }
        const novoProfessor = { id: generateId(), nome, email, senha }; 
        fs.writeFile('data/professores.json', JSON.stringify(professores, null, 2), (err) => { 
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao cadastrar professor.' });
                return;
            }
            res.json({ message: 'Cadastro de professor realizado com sucesso', professor: novoProfessor }); 
        });
    });
});

// Rota para obter as disciplinas
app.get('/disciplinas', (req, res) => {
    fs.readFile('data/disciplinas.json', 'utf8', (err, data) => { 
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler as disciplinas.' });
            return;
        }
        const disciplinas = JSON.parse(data); 
        res.json(disciplinas);
    });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`); 
});
