import { users, products, purchases, getAllUsers,getAllProducts } from "./database";

console.log("Usuários cadastrados")
console.table(users)

console.log("Produtos cadastrados")
console.table(products)

console.log("Produdos Comprados")
console.table(purchases)

console.log(getAllUsers())
console.log(getAllProducts())