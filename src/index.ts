import { users, products, purchases, getAllUsers,getAllProducts } from "./database";
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






/*console.log("Usuários cadastrados")
console.table(users)

console.log("Produtos cadastrados")
console.table(products)

console.log("Produdos Comprados")
console.table(purchases)

console.log(getAllUsers())
console.log(getAllProducts())*/