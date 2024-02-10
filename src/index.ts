import express, { Request, Response } from 'express'
import cors from 'cors'
import productRouter from './routers/product-router'
import { body, validationResult } from 'express-validator'
import productRepository from './repositories/product-repository'
import Product from './models/product'
import Consultant from './models/consultant'
import consultantRouter from './routers/consultant-router'
import consultantRepository from './repositories/consultant-repository'

// App Express
const app = express()

// Defina o mecanismo de visualização como EJS
app.set('view engine', 'ejs')

// Defina o diretório de visualização
app.set('views', __dirname + '/views')

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo! Servidor Express com Nodemon ')
})
// Cors
// Middlewares
app.use(cors({
    origin: ['http://localhost:3000']
}))

// Rota para exibir o formulário de criação de produto

app.get('/create_product', (req, res) => {
    // Renderiza o arquivo de modelo EJS para exibir o formulário de criação de produto
    res.render('create_product'); // Remova o ./src/views e mantenha apenas 'create_product'
    //console.log(__dirname);
})

// Rota para criar um novo produto
app.post('/create_product', [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('price').notEmpty().isNumeric(),
    body('points').notEmpty().isInt(),
    ], 
    async (req: Request<{}, {}, Product>, res: Response) => {
    // Verifica se houve erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Cria o produto com os dados do corpo da requisição
        await productRepository.create(req.body, (id?: number) => {
            if (id) {
                return res.status(201).json({ id });
            } else {
                return res.status(500).json({ error: 'Erro ao criar o produto' });
            }
        })
    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

app.get('/create_consultant', (req, res) => {
    // Renderiza o arquivo de modelo EJS para exibir o formulário de criação de produto
    res.render('create_consultant'); // Remova o ./src/views e mantenha apenas 'create_product'
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}/create_consultant`)
})
// Rota para criar um novo consultor
app.post('/create_consultant', [
    body('name').notEmpty().isString(),
    body('email').notEmpty().isString(),
    body('data_birth').notEmpty().isString(),
    body('street_address').notEmpty().isString(),
    body('cep').notEmpty().isNumeric(),
    body('neighborhood').notEmpty().isString(),
    body('phone_number').notEmpty().isNumeric(),
    body('cpf').notEmpty().isNumeric(),
    ], 
    async (req: Request<{}, {}, Consultant>, res: Response) => {
    // Verifica se houve erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
    }

    try {
        // Cria o produto com os dados do corpo da requisição
        await consultantRepository.create(req.body, (id?: number) => {
            if (id) {
                return res.status(201).json({ id: 'Cadastrado com Sucesso!' });
            } else {
                return res.status(500).json({ error: 'Erro ao criar consultora' });
            }
        })
    } catch (error) {
        console.error('Erro ao criar consultora:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
})


app.put('/update_consultant/', [
    body('name').notEmpty().isString(),
    body('email').notEmpty().isString().isEmail(),
    body('data_birth').notEmpty().isString(), // Ajuste conforme necessário
    body('street_address').notEmpty().isString(),
    body('cep').notEmpty().isNumeric(),
    body('neighborhood').notEmpty().isString(),
    body('phone_number').notEmpty().isNumeric(),
    body('cpf').notEmpty().isNumeric(),
], async (req: Request<{ id: string }, {}, Consultant>, res: Response) => {
    // Verifica se houve erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const consultantId = parseInt(req.params.id, 10);

    try {
        // Atualiza o consultor com os dados do corpo da requisição
        await consultantRepository.atualizar(consultantId, req.body, (notFound: boolean) => {
            if (notFound) {
                return res.status(404).json({ error: 'Consultor não encontrado' });
            } else {
                return res.status(200).json({ message: 'Consultor atualizado com sucesso!' });
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar o consultor:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
})


// Rotas
app.use('/api', productRouter)
app.use('/api', consultantRouter)
// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404).send('Endpoint não encontrado')
})

// Inicia o sevidor

// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})