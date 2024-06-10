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
    sinopse VARCHAR(500) NOT NULL,
    tempo VARCHAR(20) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    classificacao_idade VARCHAR(10) NOT NULL,
    link VARCHAR(300),
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
