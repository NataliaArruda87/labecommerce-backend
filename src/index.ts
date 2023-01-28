import { users, products, purchases, getAllPurchasesFromUserId } from "./database";
import express, { Request, Response } from "express";
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

const app = express()
app.use(express.json());
app.use(cors());

app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})




//Get All Users
app.get('/users', async (req: Request, res: Response) => {
    try {
        
        const result = await db.raw(`SELECT * FROM users`)
        
        res.status(200).send(result)  

    } catch (error) {
        
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    } 
})


//Get All Products
app.get('/products', async (req: Request, res: Response) => {
    try {
        
        const result = await db.raw(`SELECT * FROM products`)

        res.status(200).send(result)

    } catch (error) {
        
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }  
})


// Search Product
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 0) {
            res.status(400)
            throw new Error("A palavra utilizada para busca deve ter pelo menos um caratére")
        }

        const result = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    })

    res.status(200).send(result)
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }    
})


//Create Users
app.post('/users', async (req: Request, res: Response) => {
    try {
        
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        if (!id) {
            res.status(404)
            throw new Error("Adicione um id para criar um novo usuário!")
        }

        if (!email) {
            res.status(404)
            throw new Error("Adicione um email para criar um novo usuário!")
        }

        if (!password) {
            res.status(404)
            throw new Error("Adicione uma senha para criar um novo usuário!")
        }
        
        if(users.find((user) => user.id === id)) {
            res.status(404)
            throw new Error("Esse id já exisiste! Cadastre outro")
        }

        if(users.find((user) => user.email === email)) {
            res.status(404)
            throw new Error("Esse email já existe. Cadastre outro.")
        }

        await db.raw(`
            INSERT INTO users(id, email, password)
            VALUES("${id}", "${email}", "${password}")
        `)

        res.status(201).send("Cdastro de novo usuário realizado com sucesso!")
    
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }  
})


//Create Product
app.post('/products', async(req: Request, res: Response) => {
    try {
        
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
       
        if (!id) {
            res.status(404)
            throw new Error("Adicione um id para criar um novo produto!")
        }

        if (!name) {
            res.status(404)
            throw new Error("Adicione um nome para criar um novo produto!")
        }

        if (!price) {
            res.status(404)
            throw new Error("Adicione um preço para criar um novo produto!")
        }

        if (!category) {
            res.status(404)
            throw new Error("Adicione uma categoria para criar um novo produto!")
        }

        if(products.find((product) => product.id === id)) {
            res.status(404)
            throw new Error("Esse produto já existe. Cadastre outro.")
        }
    
        await db.raw(`
        INSERT INTO products(id, name, price, category)
        VALUES("${id}", "${name}", "${price}", "${category}")
    `)
    
        res.status(201).send("Cdastro de novo produto realizado com sucesso!")
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }
    
   
})


//Get All Purchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM purchases`)

        res.status(200).send(result)
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }
})


//Create Purchase
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }

        if (!userId) {
            res.status(404)
            throw new Error("Adicione um Id de usuário para criar uma nova compra!")
        }

        if (!productId) {
            res.status(404)
            throw new Error("Adicione um id de produto para criar uma nova compra!")
        }

        if (!quantity) {
            res.status(404)
            throw new Error("Adicione uma quantidade de produtos para criar uma nova compra!")
        }

        if (!totalPrice) {
            res.status(404)
            throw new Error("Adicione o valor total dos produtos para criar uma nova compra!")
        }

        if(!(users.find((user) => user.id === userId))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido.")
        }

        if(!(products.find((product) => product.id === productId))) {
            res.status(404)
            throw new Error("O produto não existe. Escolha um produto valido.")
        }

        purchases.push(newPurchase)

        res.status(201).send("Compra realizado com sucesso!")
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }    
})


//Get Products by Id
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = products.find((product) => product.id === id)

        if (!result) {
            res.status(404)
            throw new Error("Produto não encontrada, verifique a Id!")
        }

        res.status(200).send(result)
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    } 
})


// Get Purchases by user Id
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!(users.find((user) => user.id === id))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para ser deletado.")
        }

        res.status(200).send(getAllPurchasesFromUserId(id))

    } catch (error) {
         console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }
    
})


//Delete User by Id
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!(users.find((user) => user.id === id))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para ser deletado.")
        }

        const indexToRemove = users.findIndex((user) => user.id === id)
        
        if (indexToRemove >= 0) {
            users.splice(indexToRemove, 1)
        }

        res.status(200).send("Usuário deletado com sucesso")
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }   
})


//Delete Product by Id
app.delete('/products/:id', (req: Request, res: Response) => {
   try {
        const id = req.params.id

        if(!(products.find((product) => product.id === id))) {
            res.status(404)
            throw new Error("O produto não existe. Escolha um produto valido para ser deletado.")
        }

        const indexToRemove = products.findIndex((product) => product.id === id)
        
        if (indexToRemove >= 0) {
            products.splice(indexToRemove, 1)
        }

        res.status(200).send("Produto deletado com sucesso")
    
   } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
   }  
})


//Edit User By Id
app.put('/users/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body 

        if(!(users.find((user) => user.id === id))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para editar.")
        }

        const newEmail = req.body.email
        const newPassword = req.body.password

        if (!newEmail) {
            res.status(404)
            throw new Error("Adicione um email para o usuário!")
        }

        if (!newPassword) {
            res.status(404)
            throw new Error("Adicione uma senha para o usuário!")
        }

        const user = users.find((user) => user.id === id)
        
        if(user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }
        
        res.status(200).send("Atualização realizada com sucesso")
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }
    
})


// Edit Product By id
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!(products.find((product) => product.id === id))) {
            res.status(404)
            throw new Error("O produto não existe. Escolha um produto valido para editar.")
        }

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as string | undefined

        if (!newName) {
            res.status(404)
            throw new Error("Adicione um nome para o produto!")
        }

        if (!newPrice) {
            res.status(404)
            throw new Error("Adicione um preço para produto!")
        }

        if (!newCategory) {
            res.status(404)
            throw new Error("Adicione uma categoria para o produto!")
        }

        const product = products.find((product) => product.id === id)
        
        if(product) {
            product.name = newName || product.name
            product.category = newCategory || product.category
            product.price = newPrice || product.price
        }
        
        res.status(200).send("Atualização realizada com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
    }   
})




/*console.log("Usuários cadastrados")
console.table(users)

console.log("Produtos cadastrados")
console.table(products)

console.log("Produdos Comprados")
console.table(purchases)

console.log(getAllUsers())
console.log(getAllProducts())*/