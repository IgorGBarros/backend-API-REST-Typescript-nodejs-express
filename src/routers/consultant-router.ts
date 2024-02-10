import express from 'express'
import Consultant from '../models/consultant'
import consultantRepository from '../repositories/consultant-repository'


const consultantRouter = express.Router()
consultantRouter.post('/consultant', (req, res) => {
    const consultant: Consultant = req.body
    consultantRepository.create(consultant, (id) => {
        if (id) {
            res.status(201).location(`/consultant/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
  
}),
consultantRouter.get('/consultant', (req, res) => {
    //res.send('Lê todos os itens')
    consultantRepository.lerTodos((consultant) => res.json(consultant))
    
}),
consultantRouter.get('/consultant/:id', (req, res) => {
    const id: number = +req.params.id
    consultantRepository.ler(id, (consultant) => {
        if (consultant) {
            res.json(consultant)
        } else {
            res.status(404).send()
        }
    })
    //res.send(`Lê o item ${id}`)
}),
consultantRouter.put('/consultant/:id', (req, res) => {
    const id: number = +req.params.id
    consultantRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Atualiza o item ${id}`)
}),
consultantRouter.delete('/consultant/:id', (req, res) => {
    const id: number = +req.params.id
    consultantRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Apaga o item ${id}`)
})
export default consultantRouter