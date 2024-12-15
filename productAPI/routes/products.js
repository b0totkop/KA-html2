import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await dbQuery("SELECT * FROM products;");
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

router.get("/products/:id", async (req, res, next) => {
    try {
        const [product] = await dbQuery("SELECT * FROM products WHERE id = ?;", [req.params.id]);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await dbRun("INSERT INTO products (name, description, picture, price) VALUES (?, ?, ?, ?);", [req.body.name, req.body.description, req.body.picture, req.body.price]);
        res.status(201).json({ id: result.lastID, ...req.body });
    } catch (err) {
        next(err);
    }
});

router.put("/products/:id", async (req, res, next) => {
    try {
        const [product] = await dbQuery("SELECT * FROM products WHERE id = ?;", [req.params.id]);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await dbRun("UPDATE products SET name = ?, description = ?, picture = ?, price = ? WHERE id = ?;", 
            [req.body.name || product.name, req.body.description || product.description, req.body.picture || product.picture, req.body.price || product.price, req.params.id]);
        res.status(200).json({ id: req.params.id, name: req.body.name || product.name, description: req.body.description || product.description, picture: req.body.picture || product.picture, price: req.body.price || product.price});
    } catch (err) {
        next(err);
    }
});

router.delete("/products/:id", async (req, res, next) => {
    try {
        const [product] = await dbQuery("SELECT * FROM products WHERE id = ?;", [req.params.id]);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await dbRun("DELETE FROM products WHERE id = ?;", [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;