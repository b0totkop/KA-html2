import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE users")
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, address TEXT)");

    
    const users = [
        { firstName: "John", lastName: "Doe", email: "john.doe@example.com", address: "blabla" },
        { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", address: "szeged a u" },
        { firstName: "Sam", lastName: "Jhonson", email: "sam.johnson@example.com", address: "bp o utca" },
    ];

    for (const user of users) {
        await dbRun("INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)", [user.firstName, user.lastName, user.email, user.address]);
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
