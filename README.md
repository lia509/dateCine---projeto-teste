# dateCine-Banco de dados do projeto final sobre cinema independente.
Banco de dados criados no SQL shell. 

## API URL (contatos)
http://localhost:3100/contatos


## Arquivo SQL 
• Banco de dados rodando na porta 7007;


• Server Rodando na porta 3100;

CREATE DATABASE datacine;

\c dataCine;

CREATE TABLE produtores (
    produtor_id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(20) NOT NULL,
    descricao VARCHAR(70) NOT NULL,
    contato VARCHAR(70) NOT NULL
    
);

CREATE TABLE filmes (
    id_filme SERIAL PRIMARY KEY,
    titulo VARCHAR(70) NOT NULL,
    ano DATE NOT NULL,
    sinopse VARCHAR(100) NOT NULL,
    tempo VARCHAR(5) NOT NULL,
    categoria VARCHAR(15) NOT NULL,
    classificacao_idade VARCHAR(10) NOT NULL,
    link VARCHAR(100),
    link_capa VARCHAR(300),
    produtor_id INT,
    FOREIGN KEY (produtor_id) REFERENCES produtores(produtor_id)
);


CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem VARCHAR(200) NOT NULL
);

