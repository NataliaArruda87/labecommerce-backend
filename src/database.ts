import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
import { CATEGORY } from "./types"

export const users: TUser [] =[
    {
        id:"001",
        email:"luiza@gemail.com",
        password:"123456",
    },
    {
        id:"002",
        email: "julio@gemail.com",
        password:"567890",
    }
]

export const products:TProduct [] = [
    {
        id:"1011",
        name:"anel",
        price:40,
        category:CATEGORY.ACESSORIES,
    },

    {
        id:"1012",
        name:"camiseta",
        price:80,
        category:CATEGORY.CLOTHS, 
    }
]

export const purchases: TPurchase []=[
    {
        userId:"001",
        productId:"1011",
        quantity:3,
        totalPrice:120
    },

    {
        userId:"002",
        productId:"1012",
        quantity:2,
        totalPrice:160
    }
]

export const createUser = (id:string, email:string, senha: string) => {
    const newUser: TUser = {
        id: id,
        email: email,
        password: senha
    }

    users.push(newUser)

    console.log("Cadastro realizado com sucesso!")
}

export const getAllUsers = () => {
    return users
}

export const createProduct = (id: string, name: string, price: number, category: CATEGORY) => {
    const newProduct:TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    products.push(newProduct)

    console.log("Produto criado com sucesso!")
}

export const getAllProducts = () => {
    return products
}

export const getProductsById = (idToSearch:string) : TProduct[]=> {
    return products.filter(
        (product) => {
          return(product.id === idToSearch)
        }
      )  
}

export const queryProductsByName = (q:string) :void => {
    const query =  products.filter(
        (product) => {
          return(product.name.toLowerCase().includes(q.toLowerCase()))
        }
      ) 

      console.table(query)
}

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) :void => {
    const newPurchase:TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    console.log("Compra realizada com sucesso!")
    console.table(purchases)
}

export const getAllPurchasesFromUserId = (userIdToSearch:string) :TPurchase[]=> {
    return purchases.filter(
        (purchase) => {
          return(purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
      ) 
}
