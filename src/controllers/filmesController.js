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
    try {
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link } = req.body;

    let final_link = ["/view?usp=drive_link"];
    if (!link.includes(final_link)) {
        res.status(500).send('O link precisa terminar em "/view?usp=drive_link". Por favor suba seu filme para o google drive e extraia o link de la. ');
    } else {
        const result = await pool.query('INSERT INTO filmes ( titulo, ano, sinopse, tempo, categoria, classificacao_idade, link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [ titulo, ano, sinopse, tempo, categoria, classificacao_idade, link]);
        res.json(result.rows[0]);

    } 
   } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function updateMovie(req, res) {
    const { id_filme } = req.params;
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link } = req.body;
    try {
        const result = await pool.query('UPDATE filmes SET titulo = $1, ano = $2, sinopse = $3, tempo = $4, categoria = $5, classificacao_idade = $6, link = $7  WHERE id_filme = $8 RETURNING *', [ titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, id_filme]);
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

