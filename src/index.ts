import { users, products, purchases, getAllPurchasesFromUserId } from "./database";
import express, { Request, Response } from "express";
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";

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
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

//Get All Products
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

// Search Product
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    })
    res.status(200).send(result)
})

//Create Users
app.post('/users', (req: Request, res: Response) => {
    
    const { id, email, password } = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Cdastro de novo usuário realizado com sucesso!")
})

//Create Product
app.post('/products', (req: Request, res: Response) => {
    
    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Cdastro de novo produto realizado com sucesso!")
})

//Get All Purchases
app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

//Create Purchase
app.post('/purchases', (req: Request, res: Response) => {
    
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizado com sucesso!")
})

//Get Products by Id
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})

// Get Purchases by user Id
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    res.status(200).send(getAllPurchasesFromUserId(id))
})

//Delete User by Id
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = users.findIndex((user) => user.id === id)
    
    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)
    }
    res.status(200).send("Usuário deletado com sucesso")
})

//Delete Product by Id
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)
    
    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }
    res.status(200).send("Produto deletado com sucesso")
})

//Edit User By Id
app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)
    
    if(user) {
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    
    res.status(200).send("Atualização realizada com sucesso")
})

// Edit Product By id
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined


    const product = products.find((product) => product.id === id)
    
    if(product) {
        product.name = newName || product.name
        product.category = newCategory || product.category
        product.price = newPrice || product.price
    }
    
    res.status(200).send("Atualização realizada com sucesso")
})




/*console.log("Usuários cadastrados")
console.table(users)

console.log("Produtos cadastrados")
console.table(products)

console.log("Produdos Comprados")
console.table(purchases)

console.log(getAllUsers())
console.log(getAllProducts())*/