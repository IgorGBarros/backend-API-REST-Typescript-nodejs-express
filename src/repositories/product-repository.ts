import Product from "../models/product";
import database from "../config/database";

const generateProductCode = (): string => {
    const length = 6
    const characters = '012345'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const productRepository = {
    create: (product: Product, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO product(product_code, name, description, price, points) VALUES (?, ?, ?, ?, ?)'
        const params = [
            generateProductCode(), 
            product.name, 
            product.description, 
            product.price, 
            product.points
        ]
        database.run(sql, params, function(err) {
            if (err) {
                console.error('Erro ao inserir produto:', err);
                return callback(); // Chame o callback sem passar um ID para indicar falha
            }
            callback(this?.lastID); // Passa o ID do último produto inserido para o callback
        })
    },
    lerTodos: (callback: (product: Product[]) => void) => {
        const sql = 'SELECT * FROM product'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows as Product[]))
    },
    ler: (id: number, callback: (product?: Product) => void) => {
        const sql = 'SELECT * FROM product WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row as Product))
    },
    atualizar: (id: number, product: Product, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE product SET name = ?, description = ? , price = ?, points = ? WHERE id = ?'
        const params = [product.name, product.description,product.price,product.points, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM product WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default productRepository
