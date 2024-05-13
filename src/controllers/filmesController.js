app.get('/filmes', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM filmes');
        res.json({
            total: resultado.rowCount,
            herois: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os filmes', error);
        res.status(500).send('Erro ao obter os filmes');
    }
});

app.post('/filmes', async (req, res) => {
    try {
        const { titulo, ano, sinopse, tempo, categoria, classificacao_idade } = req.body;

        
            await pool.query('INSERT INTO filmes (id_filme, titulo, ano, sinopse, tempo, categoria, classificacao_idade) VALUES ($1, $2, $3, $4, $5, %6, %7)', [id_filme, titulo, ano, sinopse, tempo, categoria, classificacao_idade]);
            res.status(201).send({ mensagem: 'filmes criado com sucesso' });
        } catch (error) {
        console.error('Erro ao criar filme', error);
        res.status(500).send('Erro ao criar filme');
    }
});

app.delete('/filmes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('DELETE FROM filmes WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'filmes deletado com sucesso' })
    } catch (error) {
        console.error('Erro ao apagar filme', error);
        res.status(500).send('Erro ao apagar o filme');
    }
});

app.put('/filmes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, poder, nivel, hp } = req.body;
        await pool.query('UPDATE filmes SET nome = $1, poder = $2, nivel = $3, hp = $4 WHERE id = $5', [nome, poder, nivel, hp, id])
        res.status(200).send({ mensagem: 'Filme atualizado com sucesso' })
    } catch (error) {
        console.error('Erro ao atualizar', error);
        res.status(500).send('Erro ao atualizar');
    }
});