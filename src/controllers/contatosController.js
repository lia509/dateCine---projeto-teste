const pool = require('../config/dbConfig')

async function getAllContatos(req, res) {
    try {
        const result = await pool.query('SELECT * FROM contatos');
        res.json({
            total : result.rowCount,
            contatos : result.rows
        });
    } catch (error) {
        console.error('erro ao obter todos os contatos', error);
        res.json({ error: error.message });
    }
}

async function getContatoByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM contatos WHERE nome Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                contatos : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM contatos WHERE id = $1', [param]);
            res.json({
                total : result.rowCount,
                contatos : result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function createContato(req, res) {
    const { nome, email, mensagem } = req.body;
    try {
        const result = await pool.query('INSERT INTO contatos ( nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *', [ nome, email, mensagem]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function updateContato(req, res) {
    const { id } = req.params;
    const { nome, email, mensagem } = req.body;
    try {
        const result = await pool.query('UPDATE contatos SET nome = $2, email = $3, mensagem = $4  WHERE id = $1 RETURNING *', [nome, email, mensagem, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function deleteContato(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM contatos WHERE id = $1', [id]);
        res.json({ message: 'Hero deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllContatos, getContatoByParam, createContato, updateContato, deleteContato };