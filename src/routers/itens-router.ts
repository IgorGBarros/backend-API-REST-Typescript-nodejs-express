import express from 'express'
import Item from '../models/itens'
import itensRepository from '../repositories/itens-repository'
const itensRouter = express.Router()
itensRouter.post('/itens', (req, res) => {
    const item: Item = req.body
    itensRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/itens/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
    //res.send('Cria novo item')
})
itensRouter.get('/itens', (req, res) => {
    //res.send('Lê todos os itens')
    itensRepository.lerTodos((itens) => res.json(itens))
    
})
itensRouter.get('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    itensRepository.ler(id, (item) => {
        if (item) {
            res.json(item)
        } else {
            res.status(404).send()
        }
    })
    //res.send(`Lê o item ${id}`)
})
itensRouter.put('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    itensRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Atualiza o item ${id}`)
})
itensRouter.delete('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    itensRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Apaga o item ${id}`)
})
export default itensRouter