CREATE DATABASE datecine;

\c dateCine;

CREATE TABLE produtores (
    produtor_id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(20) NOT NULL,
    descrição VARCHAR(70) NOT NULL,
    contato VARCHAR(70) NOT NULL,
    id_filme INT,
    FOREIGN KEY (id_filme) REFERENCES filmes(id_filme)
);

CREATE TABLE filmes (
    id_filme SERIAL PRIMARY KEY,
    titulo VARCHAR(15) NOT NULL,
    ano DATE NOT NULL,
    sinopse VARCHAR(100) NOT NULL,
    tempo VARCHAR(5) NOT NULL,
    categoria VARCHAR(15) NOT NULL,
    classificacao_idade VARCHAR(10) NOT NULL,
    link VARCHAR(100)
);
