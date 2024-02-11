import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';

// Array de instruções SQL para criar as tabelas
const TABLES_CREATE_QUERIES = [
    `CREATE TABLE IF NOT EXISTS consultant (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        data_birth DATE,
        consultant_code TEXT UNIQUE,
        accumulated_points INTEGER,
        entry_date DATE,
        total_sales REAL,
        total_commission REAL,
        status TEXT,
        last_activity_date DATE,
        street_address TEXT,
        cep TEXT,
        neighborhood TEXT,
        state TEXT,
        phone_number TEXT,
        cpf TEXT,
        level TEXT,
        digital_space_link TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_code TEXT UNIQUE,
        name TEXT,
        description TEXT,
        price REAL,
        points INTEGER,
        image TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS order_product (
        request TEXT PRIMARY KEY UNIQUE,
        consultant_code TEXT,
        product_code TEXT,
        quantity INTEGER,
        commission REAL,
        total_amount REAL,
        total_points INTEGER,
        FOREIGN KEY (consultant_code) REFERENCES Consultant(consultant_code),
        FOREIGN KEY (product_code) REFERENCES Product(product_code)
    )`,
    `CREATE TABLE IF NOT EXISTS purchase_order (
        order_number TEXT PRIMARY KEY,
        request TEXT,
        consultant_code TEXT,
        order_date DATE,
        total_amount REAL,
        total_points INTEGER,
        captacao TEXT,
        FOREIGN KEY (consultant_code) REFERENCES Consultant(consultant_code)
    )`,

    `CREATE TABLE IF NOT EXISTS cycle (
        cycle_number INTEGER PRIMARY KEY,
        start_date DATE,
        end_date DATE
    )`,
    `CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    role TEXT,
    referralCode TEXT,
    referrerCode TEXT
    )`,
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
