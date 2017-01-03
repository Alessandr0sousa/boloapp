var mysql = require('mysql');

/*
npm install mysql
*/

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'developer',
  password : ''
});

connection.connect();

connection.query('SELECT 1 + 9 AS resultado',
    function (err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].resultado);
});

connection.end();
