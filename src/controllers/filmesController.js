const pool = require('../config/dbConfig')

async function getAllMovies(req, res) {
    try {
        const result = await pool.query('SELECT * FROM filmes');
        res.json({
            total : result.rowCount,
            filmes : result.rows
        });
    } catch (error) {
        console.error('erro ao pegar filmes', error);
        res.json({ error: error.message });
    }
}

async function getMovieByParam(req, res) {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM filmes WHERE titulo Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                filmes : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM filmes WHERE id_filme = $1', [param]);
            res.json({
                total : result.rowCount,
                filmes : result.rows
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function createMovie(req, res) {
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link } = req.body;
    try {
        const result = await pool.query('INSERT INTO filmes ( titulo, ano, sinopse, tempo, categoria, classificacao_idade, link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [ titulo, ano, sinopse, tempo, categoria, classificacao_idade, link]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function updateMovie(req, res) {
    const { id_filme } = req.params;
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link } = req.body;
    try {
        const result = await pool.query('UPDATE filmes SET titulo = $2, ano = $3, sinopse = $4, tempo = $5, categoria = $6, classificacao_idade = $7, link = $8  WHERE id = $1 RETURNING *', [id_filme, titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

async function deleteMovie(req, res) {
    const { id_filme } = req.params;
    try {
        const result = await pool.query('DELETE FROM filmes WHERE id = $1', [id_filme]);
        res.json({ message: 'Hero deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}

module.exports = { getAllMovies, getMovieByParam, createMovie, updateMovie, deleteMovie };