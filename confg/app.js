var express = require('express');
var mysql = require('mysql');
var app = express();
var cors = require('cors');

var connection = mysql.createConnection({
	host: 'rds-mysql-bd.czayjjshv3at.us-east-1.rds.amazonaws.com',
	user: 'root',
	password : 'olafe281',
	database:'bolo_app',
	acquireTimeout:30000
});

app.use(cors());

app.get('/getclientes', function (req, res) {
	console.log('Get Clientes');
	console.log('---------------');
	
	connection.query('select * from clientes', function (err, result) {
		if (err) {
			console.log('Erro na query')
		} else {
			console.log('Sucesso!\n');
			console.log(result); 
			res.send(result);
		}
	});
});

//-------------------------adicionar clientes-------------------------

app.post('/addclientes', function (req, res) {
	console.log('Add Clientes');
	console.log('---------------');
	
	connection.query('insert into clientes (cli_nome,cli_telefone) values(?,?)', function (err, result) {
		if (err) {
			console.log('Erro ao adicionar cliente')
		} else {
			console.log('Sucesso!\n');
			console.log(result); 
			res.send(result);
		}
	});
});


app.listen(8088, function () {
	console.log('Banco rodando em http://localhost:8088');
});