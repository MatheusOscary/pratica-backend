const express = require('express');
const Pedidos = require('./routes/Pedidos')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.use('/pedidos', Pedidos);

app.listen(3000, () =>{
    console.log("O servidor está aberto na porta 3000");
});