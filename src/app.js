import express from 'express';
import path from 'path';

//creamos un servidor http 
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

export default app