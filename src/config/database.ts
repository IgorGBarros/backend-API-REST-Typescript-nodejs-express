import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';

// Array de instruções SQL para criar as tabelas
const TABLES_CREATE_QUERIES = [
    ` CREATE TABLE Gerente (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        nivel_plano_crescimento TEXT DEFAULT 'Ouro',
        pontuacao INTEGER DEFAULT 0
    );
    
    CREATE TABLE Grupo (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        gerente_id INTEGER NOT NULL,
        FOREIGN KEY (gerente_id) REFERENCES Gerente(id)
    );
    
    CREATE TABLE LiderNegocio (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        nivel_plano_crescimento TEXT DEFAULT 'Prata',
        pontuacao INTEGER DEFAULT 0,
        grupo_id INTEGER NOT NULL,
        endereco TEXT,
        bairro TEXT,
        cidade TEXT,
        cep TEXT,
        data_nascimento DATE,
        telefone TEXT,
        cpf TEXT UNIQUE,
        rg TEXT ,
        data_cadastro DATE,
        FOREIGN KEY (grupo_id) REFERENCES Grupo(id)
    );
    
    CREATE TABLE Consultora (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        nivel_plano_crescimento TEXT DEFAULT 'Semente',
        pontuacao INTEGER DEFAULT 0,
        ativa BOOLEAN DEFAULT 1,
        lider_negocio_id INTEGER,
        endereco TEXT,
        bairro TEXT,
        cidade TEXT,
        cep TEXT,
        data_nascimento DATE,
        telefone TEXT,
        cpf TEXT UNIQUE,
        rg TEXT,
        data_cadastro DATE,
        total_vendas REAL DEFAULT 0,
        comissao REAL DEFAULT 0,
        FOREIGN KEY (lider_negocio_id) REFERENCES LiderNegocio(id)
    );
        
    CREATE TABLE Ciclo (
        id INTEGER PRIMARY KEY,
        numero INTEGER NOT NULL,
        data_abertura DATE NOT NULL,
        data_fechamento DATE NOT NULL
    );
    
    CREATE TABLE CicloConsultora (
        id INTEGER PRIMARY KEY,
        ciclo_id INTEGER,
        consultora_id INTEGER,
        pontos_acumulados INTEGER,
        FOREIGN KEY (ciclo_id) REFERENCES Ciclo(id),
        FOREIGN KEY (consultora_id) REFERENCES Consultora(id)
    );
    
    CREATE TABLE Produto (
        id INTEGER PRIMARY KEY,
        codigo TEXT NOT NULL,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL NOT NULL,
        pontuacao INTEGER NOT NULL
    );
    
    CREATE TABLE Pedido (
        id INTEGER PRIMARY KEY,
        codigo_pedido TEXT NOT NULL,
        produto_id INTEGER,
        consultora_id INTEGER,
        total_pedido REAL NOT NULL,
        opcao_pagamento TEXT,
        opcao_entrega TEXT,
        FOREIGN KEY (produto_id) REFERENCES Produto(id),
        FOREIGN KEY (consultora_id) REFERENCES Consultora(id)
    );`
    
];

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Base de dados conectada com sucesso.');
        
        // Iterar sobre o array de instruções SQL e criar cada tabela
        TABLES_CREATE_QUERIES.forEach(query => {
            database.run(query, (err) => {
                if (err) {
                    console.log(`Erro ao criar tabela: ${err.message}`);
                } else {
                    console.log('Tabela criada com sucesso.');
                }
            });
        });
    }
});

export default database;
