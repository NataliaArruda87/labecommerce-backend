"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductsById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "001",
        email: "luiza@gemail.com",
        password: "123456",
    },
    {
        id: "002",
        email: "julio@gemail.com",
        password: "567890",
    }
];
exports.products = [
    {
        id: "1011",
        name: "anel",
        price: 40,
        category: types_1.CATEGORY.ACESSORIES,
    },
    {
        id: "1012",
        name: "camiseta",
        price: 80,
        category: types_1.CATEGORY.CLOTHS,
    }
];
exports.purchases = [
    {
        userId: "001",
        productId: "1011",
        quantity: 3,
        totalPrice: 120
    },
    {
        userId: "002",
        productId: "1012",
        quantity: 2,
        totalPrice: 160
    }
];
const createUser = (id, email, senha) => {
    const newUser = {
        id: id,
        email: email,
        password: senha
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso!");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso!");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductsById = (idToSearch) => {
    return exports.products.filter((product) => {
        return (product.id === idToSearch);
    });
};
exports.getProductsById = getProductsById;
const queryProductsByName = (q) => {
    const query = exports.products.filter((product) => {
        return (product.name.toLowerCase().includes(q.toLowerCase()));
    });
    console.table(query);
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso!");
    console.table(exports.purchases);
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()));
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map