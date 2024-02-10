import Consultant from "../models/consultant";
import database from "./database";

const generateConsultantCode = (): string => {
    const length = 10
    const characters = '0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const consultantRepository = {
    create: (consultant: Consultant, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO consultant(consultant_code, name, email, data_birth, street_address,cep,neighborhood,phone_number,cpf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const params = [
            generateConsultantCode(), 
            consultant.name, 
            consultant.email, 
            consultant.data_birth, 
            consultant.street_address,
            consultant.cep,
            consultant.neighborhood,
            consultant.phone_number,
            consultant.cpf,
            
        ]
        database.run(sql, params, function(err) {
            if (err) {
                console.error('Erro ao inserir consultora:', err);
                return callback(); // Chame o callback sem passar um ID para indicar falha
            }
            callback(this?.lastID); // Passa o ID do último produto inserido para o callback
        })
    },
    lerTodos: (callback: (consultant: Consultant[]) => void) => {
        const sql = 'SELECT * FROM consultant'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows as Consultant[]))
    },
    ler: (id: number, callback: (consultant?: Consultant) => void) => {
        const sql = 'SELECT * FROM consultant WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row as Consultant))
    },
    atualizar: (id: number, consultant: Consultant, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE consultant SET name = ?, email = ? , data_birth = ?, street_address = ?,cep = ?,neighborhood = ?,phone_number = ?,cpf =? WHERE id = ?'
        const params = [ 
            consultant.name, 
            consultant.email, 
            consultant.data_birth, 
            consultant.street_address,
            consultant.cep,
            consultant.neighborhood,
            consultant.phone_number,
            consultant.cpf, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM consultant WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default consultantRepository
