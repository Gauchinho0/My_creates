const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Função para gerar um ID único
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Middleware para validar a entrada
function validateInput(req, res, next) {
    // Implementação básica de validação de entrada
    const { email, senha, nome } = req.body;
    if (!email || !senha || !nome) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }
    next();
}

// Middleware para verificar a autenticação do aluno
async function authenticateAluno(req, res, next) {
    const { email, senha } = req.body;
    try {
        const data = await fs.readFile('data/alunos.json', 'utf8');
        const alunos = JSON.parse(data);
        const aluno = alunos.find(a => a.email === email);
        if (!aluno || !await bcrypt.compare(senha, aluno.senha)) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }
        req.aluno = aluno;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao autenticar aluno' });
    }
}

// Middleware para verificar a autenticação do professor
async function authenticateProfessor(req, res, next) {
    const { email, senha } = req.body;
    try {
        const data = await fs.readFile('data/professores.json', 'utf8');
        const professores = JSON.parse(data);
        const professor = professores.find(p => p.email === email);
        if (!professor || !await bcrypt.compare(senha, professor.senha)) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }
        req.professor = professor;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao autenticar professor' });
    }
}

// Rota para obter as turmas
app.get('/turmas', async (req, res) => {
    try {
        const data = await fs.readFile('data/turmas.json', 'utf8');
        const turmas = JSON.parse(data);
        res.json(turmas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao ler as turmas.' });
    }
});

// Rota para o professor alterar horários e turnos das disciplinas
app.put('/disciplinas/:id', authenticateProfessor, async (req, res) => {
    const disciplinaId = req.params.id;
    const { horarios, turno } = req.body;

    try {
        const data = await fs.readFile('data/disciplinas.json', 'utf8');
        let disciplinas = JSON.parse(data);

        const disciplinaIndex = disciplinas.findIndex(d => d.id === disciplinaId);
        if (disciplinaIndex === -1) {
            res.status(404).json({ error: 'Disciplina não encontrada.' });
            return;
        }

        disciplinas[disciplinaIndex].horarios = horarios;
        disciplinas[disciplinaIndex].turno = turno;

        await fs.writeFile('data/disciplinas.json', JSON.stringify(disciplinas, null, 2));

        res.json({ message: 'Horários e turno da disciplina atualizados com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar os horários e turno da disciplina.' });
    }
});

// Rota para o aluno se matricular em uma turma
app.post('/matricular', validateInput, authenticateAluno, async (req, res) => {
    const { alunoId, disciplinaId } = req.body;

    try {
        const alunosData = await fs.readFile('data/alunos.json', 'utf8');
        const disciplinasData = await fs.readFile('data/disciplinas.json', 'utf8');

        let alunos = JSON.parse(alunosData);
        let disciplinas = JSON.parse(disciplinasData);

        const alunoIndex = alunos.findIndex(a => a.id === alunoId);
        if (alunoIndex === -1) {
            res.status(404).json({ error: 'Aluno não encontrado.' });
            return;
        }

        const disciplinaIndex = disciplinas.findIndex(d => d.id === disciplinaId);
        if (disciplinaIndex === -1) {
            res.status(404).json({ error: 'Disciplina não encontrada.' });
            return;
        }

        if (alunos[alunoIndex].disciplinas.includes(disciplinaId)) {
            res.status(400).json({ error: 'O aluno já está matriculado nesta disciplina.' });
            return;
        }

        if (disciplinas[disciplinaIndex].vagas_disponiveis <= 0) {
            res.status(400).json({ error: 'Não há vagas disponíveis nesta disciplina.' });
            return;
        }

        alunos[alunoIndex].disciplinas.push(disciplinaId);
        disciplinas[disciplinaIndex].alunos.push(alunoId);
        disciplinas[disciplinaIndex].vagas_disponiveis--;

        await fs.writeFile('data/alunos.json', JSON.stringify(alunos, null, 2));
        await fs.writeFile('data/disciplinas.json', JSON.stringify(disciplinas, null, 2));

        res.json({ message: 'Matrícula realizada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao realizar a matrícula.' });
    }
});

// Rota para obter as informações da matrícula do aluno
app.get('/matricula/aluno/:id', authenticateAluno, async (req, res) => {
    const alunoId = req.params.id;

    try {
        const alunosData = await fs.readFile('data/alunos.json', 'utf8');
        const disciplinasData = await fs.readFile('data/disciplinas.json', 'utf8');

        const alunos = JSON.parse(alunosData);
        const disciplinas = JSON.parse(disciplinasData);

        const aluno = alunos.find(a => a.id === alunoId);
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado.' });
            return;
        }

        const matriculas = [];
        for (const disciplinaId of aluno.disciplinas) {
            const disciplina = disciplinas.find(d => d.id === disciplinaId);
            if (disciplina) {
                matriculas.push({
                    disciplina: disciplina.nome,
                    horarios: disciplina.horarios,
                    turno: disciplina.turno
                });
            }
        }

        res.json({ aluno: aluno.nome, matriculas: matriculas });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter as informações da matrícula.' });
    }
});

// Rota para autenticação e cadastro de alunos
app.post('/login/aluno', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const data = await fs.readFile('data/alunos.json', 'utf8');
        const alunos = JSON.parse(data);

        const aluno = alunos.find(a => a.email === email);
        if (!aluno || !await bcrypt.compare(senha, aluno.senha)) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        res.json({ message: 'Login bem-sucedido', alunoId: aluno.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao autenticar aluno' });
    }
});

app.post('/cadastro/aluno', validateInput, async (req, res) => {
    const { email, senha, nome } = req.body;

    try {
        const data = await fs.readFile('data/alunos.json', 'utf8');
        const alunos = JSON.parse(data);

        const alunoExists = alunos.some(a => a.email === email);
        if (alunoExists) {
            res.status(400).json({ error: 'Este e-mail já está em uso.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const novoAluno = {
            id: generateId(),
            nome: nome,
            email: email,
            senha: hashedPassword,
            disciplinas: []
        };

        alunos.push(novoAluno);
        await fs.writeFile('data/alunos.json', JSON.stringify(alunos, null, 2));

        res.json({ message: 'Cadastro realizado com sucesso.', alunoId: novoAluno.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar aluno' });
    }
});

// Rota para autenticação e cadastro de professores
app.post('/login/professor', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const data = await fs.readFile('data/professores.json', 'utf8');
        const professores = JSON.parse(data);

        const professor = professores.find(p => p.email === email);
        if (!professor || !await bcrypt.compare(senha, professor.senha)) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        res.json({ message: 'Login bem-sucedido', professorId: professor.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao autenticar professor' });
    }
});

app.post('/cadastro/professor', validateInput, async (req, res) => {
    const { email, senha, nome } = req.body;

    try {
        const data = await fs.readFile('data/professores.json', 'utf8');
        const professores = JSON.parse(data);

        const professorExists = professores.some(p => p.email === email);
        if (professorExists) {
            res.status(400).json({ error: 'Este e-mail já está em uso.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const novoProfessor = {
            id: generateId(),
            nome: nome,
            email: email,
            senha: hashedPassword
        };

        professores.push(novoProfessor);
        await fs.writeFile('data/professores.json', JSON.stringify(professores, null, 2));

        res.json({ message: 'Cadastro realizado com sucesso.', professorId: novoProfessor.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar professor' });
    }
});
