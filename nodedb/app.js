var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var url = require('url');
/*var rest = require('restler');
var fs = require('fs');
*/
/*var pool = mysql.createPool({
    host: '177.67.81.178',
    user: 'club',
    password: 'plut@o',
    database: 'esocial',
    acquireTimeout: 30000
});
*/
var pool = mysql.createPoll({
    host: 'localhost',
    user: 'root',
    password : 'olafe281',
    database:'bolo_vania',
    acquireTimeout:30000
});

// incluindo a funcoes.js
var fs = require('fs');
eval(fs.readFileSync('funcoes.js') + '');

var app = express();
// ativa chamadas de qualquer dom�nio
app.use(cors())
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

// --------------------------------- chamadas de exemplo --------------------------------------------
app.post('/testcrawler2', function (req, res) {
    console.log('get test crawler');

    rest.get('http://www.google.com/search?q=' + req.body.consulta).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            res.send(result);
        }
    });

});

app.get('/teste', function (req, res) {
    console.log('teste');
    var valor = myfunction();
    res.send({ retorno: valor });
});


app.get('/gettime', function (req, res) {
    console.log('get time');
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('select sysdate() as data', function (err, rows) {
            // And done with the connection.
            res.send(rows);
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

app.get('/getalunos', function (req, res) {
    console.log('get alunos');
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM developer.aluno', function (err, rows) {
            // And done with the connection.
            console.log(rows);
            res.send(rows);
            connection.release();
            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

// ---------------------------- chamadas valendo 
app.post('/adduser', function (req, res) {
    console.log('add user');
    console.log(req.body.usu_nome);
    console.log(req.body.usu_senha);
    console.log('-----');
    pool.getConnection(function (err, connection) {
        var lComando = '';
        lComando  =  'insert into usuario(usu_nome,usu_email,usu_senha,usu_status,usu_data_ativacao) values(?,?,md5(?),?, ';
        lComando += ' sysdate() )';

        connection.query(lComando,
            [req.body.usu_nome, req.body.usu_email, req.body.usu_senha, req.body.usu_status], function (err, result) {
                // And done with the connection.
                if (err) throw err;
                var Resultado = result.insertId;
                res.send({ retorno: Resultado });
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
            });
    });
});

// ---------------------------- morador 
app.post('/addmorador', function (req, res) {
    console.log('add morador');
    //console.log(req.body.nome);
    console.log('entrando no morador');
    pool.getConnection(function (err, connection) {
        var lComando = '';
        lComando  =  'insert into pessoa (nome,data_nascimento,idade,apelido,genero) values(?,?,?,?,?)';
        connection.query(lComando,
            [req.body.usu_nome, req.body.usu_nascimento, req.body.usu_idade, req.body.usu_apelido, req.body.usu_genero], function (err, result) {
                // And done with the connection.
                if (err) throw err;
                var Resultado = result.insertId;
                res.send({ retorno: Resultado });
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
                console.log(req.body.nome);
            });
    });
});


app.post('/updateuser', function (req, res) {
    console.log('update user');
    console.log(req.body.usu_nome);
    console.log(req.body.usu_senha);
    console.log('-----');
    pool.getConnection(function (err, connection) {
        connection.query('update usuario set usu_nome = ?, usu_email = ? where usu_id = ? ',
            [req.body.usu_nome, req.body.usu_email, req.body.usu_id], function (err, result) {
                if (err) throw err;
                res.send({ retorno: 'ok' });
                connection.release();
            });
    });
});

// ---------------------------- select apenas um registro
app.post('/selectuser', function (req, res) {
    console.log('select user');
    console.log('-----');
    console.log(req.body.usu_id);
    pool.getConnection(function (err, connection) {
        connection.query('select * from usuario where usu_id = ? ',
            [req.body.usu_id], function (err, result) {
                if (err) throw err;
                res.send(result);
                connection.release();
            });
    });
});




// ---------------------------- listar morador
app.post('/listmorador', function (req, res) {
    console.log('list morador');
    console.log('-----');
    pool.getConnection(function (err, connection) {
        connection.query('select * from pessoa where nome is not null order by nome ', function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.send(result);
            console.log(result);
            connection.release();
        });
    });
});

// ---------------------------- list user
app.post('/listuser', function (req, res) {
    console.log('list user');
    console.log('-----');
    pool.getConnection(function (err, connection) {
        connection.query('select * from usuario where usu_nome is not null order by usu_nome ', function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.send(result);
            connection.release();
        });
    });
});



// ---------------------------- pagina��o
app.post('/listproviders', function (req, res) {
    console.log('list provider');
    console.log('-----');
    pool.getConnection(function (err, connection) {
        connection.query('call listaProviders(?, ?, ?)',
            [req.body.numero_pagina, req.body.quantidade, req.body.pesquisa + '%'],
            function (err, result) {
                console.log(result[0][0]);
                if (err) throw err;
                res.send(result);
                connection.release();
            });
    });
});

app.post('/wordpress', function (req, res) {
    console.log('wordpress');
    console.log('-----');
    pool.getConnection(function (err, connection) {
        connection.query("select * from wordpress.wp_posts where post_type='post' and  post_status='publish';", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            connection.release();
        });
    });
});


// ------------------------------------------------------------------------------------------------
// -- 10.02.2015 
// ------------------------------------------------------------------------------------------------
// o servidor ir� ficar escutando na porta 8080
app.listen(8181, function () {
    console.log('listening on http://localhost:8080');
});

