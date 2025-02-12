import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app=express();
const port=3000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
db.connect();

app.use(bodyParser.json());


// Add items from Cart to DB 