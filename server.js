/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'tarefa_db'
});

// API para listar tarefas
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tarefas ORDER BY ordem', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API para excluir tarefa
app.delete('/api/tasks/:id', (req, res) => {
    db.query('DELETE FROM tarefas WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    });
});

// Outras APIs (incluir, editar, reordenar) devem ser implementadas aqui...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
*/
