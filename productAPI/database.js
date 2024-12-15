import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE products")
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, picture TEXT, price REAL)");
    
    const products = [
        { name: "Milk", description: "1.5%", picture: "milk.picture", price: 7.00 },
        { name: "Cookie", description: "Chocolate", picture: "cookie.picture", price: 17.70 },
        { name: "Hot-dog", description: "hot + dog", picture: "hotdog.picture", price: 19.99 },
    ];

    for (const product of products) {
        await dbRun("INSERT INTO products (name, description, picture, price) VALUES (?, ?, ?, ?)", [product.name, product.description, product.picture, product.price]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };