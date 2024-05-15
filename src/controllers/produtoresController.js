const pool = require('../config/dbConfig')

async function getAllProdutores(req, res) {
    try {
        const result = await pool.query('SELECT * FROM produtores');
        res.json({
            total : result.rowCount,
            produtores : result.rows
        });
    } catch (error) {
        console.error('erro ao pegar produtores', error);
        res.json({ error: error.message });
    }
}

// async function getProdutoresByParam(req, res) {
//     const { param } = req.params;
//     try {
//         if (isNaN(param)) {
//             const result = await pool.query('SELECT * FROM filmes WHERE titulo Like $1', [`%${param}%`]);
//             res.json({
//                 total : result.rowCount,
//                 filmes : result.rows
//             });
//         } else {
//             const result = await pool.query('SELECT * FROM filmes WHERE id_filme = $1', [param]);
//             res.json({  
//                 total : result.rowCount,
//                 filmes : result.rows
//             });
//         }
//     } catch (error) {
//         console.error('Error executing query', error);
//         res.json({ error: error.message });
//     }
// }

async function createProdutores(req, res) {
    const { nome, nacionalidade, descrição, contato } = req.body;

    try {
        const result = await pool.query('INSERT INTO filmes ( nome, nacionalidade, descrição, contato) VALUES ($1, $2, $3, $4) RETURNING *', [ nome, nacionalidade, descrição, contato]);
        res.json(result.rows[0]);

   } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function updateProdutores(req, res) {
    const { produtor_id } = req.params;
    const { nome, nacionalidade, descrição, contato } = req.body;
    try {
        const result = await pool.query('UPDATE filmes SET nome = $1, nacionalidade = $2, descrição = $3, contato = $4  WHERE produtor_id = $5 RETURNING *', [ nome, nacionalidade, descrição, contato, produtor_id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function deleteMovie(req, res) {
    const { id_filme } = req.params;
    try {
        const result = await pool.query('DELETE FROM filmes WHERE id_filme = $1', [id_filme]);
        res.json({ message: 'filme deletado com sucesso' });
    } catch (error) {
        console.error('Error ao apagar filme', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllMovies, getMovieByParam, createMovie, updateMovie, deleteMovie };

