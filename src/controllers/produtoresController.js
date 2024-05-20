const pool = require('../config/dbConfig')

async function getAllProdutores(req, res) {
    try {
       

        const result = await pool.query('SELECT * FROM produtores;');
        res.json({
            total : result.rowCount,
            produtores : result.rows
        });


    } catch (error) {
        console.error('erro ao pegar produtores', error);
        res.json({ error: error.message });
    }
}

async function getProdutoresByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM produtores WHERE nome Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                produtores : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM produtores WHERE produtor_id = $1', [param]);
            res.json({  
                total : result.rowCount,
                produtores : result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function createProdutores(req, res) {
    const { nome, nacionalidade, descricao, contato } = req.body;

    try {
        const result = await pool.query('INSERT INTO produtores ( nome, nacionalidade, descricao, contato) VALUES ($1, $2, $3, $4) RETURNING *', [ nome, nacionalidade, descricao, contato]);
        res.json(result.rows[0]);

   } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function updateProdutores(req, res) {
    const { produtor_id } = req.params;
    const { nome, nacionalidade, descricao, contato } = req.body;
    try {
        const result = await pool.query('UPDATE produtores SET nome = $1, nacionalidade = $2, descricao = $3, contato = $4  WHERE produtor_id = $5 RETURNING *', [ nome, nacionalidade, descricao, contato, produtor_id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function deleteProdutores(req, res) {
    const { produtor_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM produtores WHERE produtor_id = $1', [produtor_id]);
        res.json({ message: 'Produtor deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar produtor', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllProdutores, createProdutores, updateProdutores, deleteProdutores, getProdutoresByParam };

