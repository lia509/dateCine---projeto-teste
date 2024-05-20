const pool = require('../config/dbConfig')

async function getAllMovies(req, res) {
    try {
        const result = await pool.query('SELECT *, EXTRACT(YEAR FROM ano) AS ano FROM filmes;');
        res.json({
            total : result.rowCount,
            filmes : result.rows
        });
    } catch (error) {
        console.error('erro ao pegar filmes', error);
        res.json({ error: error.message });
    }
}

async function getAllMoviesByProductor(req, res) {

    try {
        const { produtor_id } = req.params;
        const { rows } = await pool.query(
            `SELECT 
                produtores.produtor_id,
                produtores.nome AS nome_produtor,
                filmes.titulo,
                filmes.ano,
                filmes.sinopse
             FROM 
                filmes
             INNER JOIN 
                produtores ON filmes.produtor_id = produtores.produtor_id
             WHERE 
                filmes.produtor_id = $1`,
            [produtor_id]
        );


        res.status(200).send({
            message: "filmes encontrados com sucesso!",
            produtores: rows,
        });
    } catch (error) {
        console.error("Erro ao buscar filmes", error);
        res.status(500).send("Erro ao buscar filmes");
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
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, link_capa, produtor_id} = req.body;

    let final_link = ["/view?usp=drive_link"];
    if (!link.includes(final_link)) {
        res.status(500).send('O link precisa terminar em "/view?usp=drive_link". Por favor suba seu filme para o google drive e extraia o link de la. ');
    } else {
        const result = await pool.query('INSERT INTO filmes ( titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, link_capa, produtor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [ titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, link_capa, produtor_id]);
        res.json(result.rows[0]);

    } 
   } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
}



async function updateMovie(req, res) {
    const { id_filme } = req.params;
    const { titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, link_capa } = req.body;
    try {
        const result = await pool.query('UPDATE filmes SET titulo = $1, ano = $2, sinopse = $3, tempo = $4, categoria = $5, classificacao_idade = $6, link = $7, link_capa = $8  WHERE id_filme = $9 RETURNING *', [ titulo, ano, sinopse, tempo, categoria, classificacao_idade, link, link_capa,  id_filme]);
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

module.exports = { getAllMovies, getAllMoviesByProductor,  getMovieByParam, createMovie, updateMovie, deleteMovie };

