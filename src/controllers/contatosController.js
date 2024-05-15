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