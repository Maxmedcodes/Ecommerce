import express from 'express';
import bodyParser from 'body-parser';

import pkg from "pg";
import axios from 'axios';
import env from 'dotenv';
import cors from 'cors';


const app=express();
const port=3000;
const {Pool} = pkg;
env.config();
app.use(cors());
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
pool.connect((err) => {
    if(err) {
        console.error('Error connecting to the database', err.stack);
    }
    else {
        console.log('Connected to the database');
    }
});

app.use(bodyParser.json());

app.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const query = `SELECT * FROM "${category}"`;
        const result = await pool.query(query);
        console.log(category)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from DataBase.');
    }
});

app.listen(port, () => {
    console.log('Server running on http://localhost:3000');
});
export const query = (text, params) => pool.query(text, params);
// Add items from Cart to DB 