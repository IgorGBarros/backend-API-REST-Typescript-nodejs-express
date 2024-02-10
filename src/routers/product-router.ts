import express from 'express'
import Product from '../models/product'
import productRepository from '../repositories/product-repository'


const productRouter = express.Router()
productRouter.post('/product', (req, res) => {
    const product: Product = req.body
    productRepository.create(product, (id) => {
        if (id) {
            res.status(201).location(`/product/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
  
}),
productRouter.get('/product', (req, res) => {
    //res.send('Lê todos os itens')
    productRepository.lerTodos((product) => res.json(product))
    
}),
productRouter.get('/product/:id', (req, res) => {
    const id: number = +req.params.id
    productRepository.ler(id, (product) => {
        if (product) {
            res.json(product)
        } else {
            res.status(404).send()
        }
    })
    //res.send(`Lê o item ${id}`)
}),
productRouter.put('/product/:id', (req, res) => {
    const id: number = +req.params.id
    productRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Atualiza o item ${id}`)
}),
productRouter.delete('/product/:id', (req, res) => {
    const id: number = +req.params.id
    productRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
    //res.send(`Apaga o item ${id}`)
})
export default productRouter