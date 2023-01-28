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
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string | undefined

        if (name !== undefined) {
            if (name.length <= 0) {
                res.status(400)
                throw new Error("A palavra utilizada para busca deve ter pelo menos um caratére")
            }
        }

        const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE "%${name}%"
        `)
        
        res.status(200).send(result)
        /*const result = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())*/
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
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        
        const id = req.body.id
        const total_price = req.body.total_price
        const buyer_id = req.body.buyer_id

        if (!id) {
            res.status(404)
            throw new Error("Adicione um Id de compra para criar uma nova compra!")
        }

        if (!buyer_id) {
            res.status(404)
            throw new Error("Adicione um id de comprador para criar uma nova compra!")
        }

        if (!total_price) {
            res.status(404)
            throw new Error("Adicione o valor total dos produtos para criar uma nova compra!")
        }

        if(!(users.find((user) => user.id === buyer_id))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido.")
        }

        await db.raw(`
        INSERT INTO purchases(id, total_price, buyer_id)
        VALUES("${id}", "${total_price}", "${buyer_id}")
    `)
        res.status(201).send("Compra cadastrada com sucesso!")
        
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
app.get('/products/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!(products.find((product) => product.id === id))) {
            res.status(404)
            throw new Error("Produto não encontrada, verifique a Id!")
        }

        const result = await db("products").where({ id: id })

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
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!(users.find((user) => user.id === id))) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para ser deletado.")
        }
        const result = await db("purchases").where({ buyer_id: id })
        
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


//Delete User by Id
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [userIdToDelete] = await db("users").where({ id: idToDelete  })

        if(!userIdToDelete) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para ser deletado.") 
        }
 
        await db("users").del().where({ id: idToDelete })

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
app.delete('/products/:id', async (req: Request, res: Response) => {
   try {
        const id = req.params.id

        const [productIdToDelete] = await db("products").where({id: id})

        if(!productIdToDelete) {
            res.status(404)
            throw new Error("O usuário não existe. Escolha um usuário valido para ser deletado.") 
        }
        
        await db("products").del().where({id: id})

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

        const [result] = await db("users").where({ id: id })

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        if (!email) {
            res.status(404)
            throw new Error("Adicione um email para o usuário!")
        }

        if (!password) {
            res.status(404)
            throw new Error("Adicione uma senha para o usuário!")
        }

        const userUpdate = {
            email: email || result.email,
            password: password || result.password
        }
        
        
        await db("users").update(userUpdate).where({ id: id })
        
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
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const { name, price, category } = req.body 

        const [result] = await db("products").where({ id: id })

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        if (!name) {
            res.status(404)
            throw new Error("Adicione um nome para o produto!")
        }

        if (!price) {
            res.status(404)
            throw new Error("Adicione um preço para produto!")
        }

        if (!category) {
            res.status(404)
            throw new Error("Adicione uma categoria para o produto!")
        }
        
        const productUpdate = {
            name: name || result.name,
            price: price || result.price,
            category: category || result.category
        }
        
        await db("products").update(productUpdate).where({ id: id })
        
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