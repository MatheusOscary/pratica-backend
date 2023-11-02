const express = require('express');
const fs = require('fs');
const routes = express.Router();

const statusEnum = {
    PROCESSANDO: 'PROCESSANDO',
    PENDENTE: 'PENDENTE',
    APROVADO: 'APROVADO',
    CANCELADO: 'CANCELADO'
};

function default_error(res, error){
    res.status(500).json({erro: 'Ocorreu um erro no processo!', mensagem: error.message})
};

routes.get('/', (req, res) => {
    try{
        let file_json = fs.readFileSync('./base/base.json', 'utf-8');
        file_json = JSON.parse(file_json);
        res.status(200).json(file_json);
    } catch(error){
        default_error(res, error);
    }
});

routes.get('/resumoStatus', (req, res) => {
    const Contador_status = {};
    for (const status of Object.values(statusEnum)) {
        Contador_status[status] = 0;
    };

    try {
        let file_json = fs.readFileSync('./base/base.json', 'utf-8');
        file_json = JSON.parse(file_json);
        file_json.forEach(pedido => {
            Contador_status[pedido.status]++;
        });
        qtdTotalPedidos = file_json.length;
        res.status(200).json({
            qtdStatusProcessando: Contador_status[statusEnum.PROCESSANDO],
            qtdStatusPendente: Contador_status[statusEnum.PENDENTE],
            qtdStatusAprovado: Contador_status[statusEnum.APROVADO],
            qtdStatusCancelado: Contador_status[statusEnum.CANCELADO],
            qtdTotalPedidos
        })
    } catch (error) {
        default_error(res, error);
    }
})

routes.get('/totalVendas', (req, res)=>{
    try{
        let file_json = fs.readFileSync('./base/base.json', 'utf-8');
        file_json = JSON.parse(file_json);
        var totalVendas = 0;
        file_json.forEach(pedido => {
            if(pedido.status != 'CANCELADO'){
                totalVendas += pedido.valor;
            }
        }); 
        totalVendas = totalVendas.toFixed(2)
        res.status(200).json({totalVendas})
    } catch(error){
        default_error(res, error);
    }
});



module.exports = routes;