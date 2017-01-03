angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {
	$scope.playlists = [
	{ title: '', id: 1 },
	{ title: '', id: 2 }
	];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ListCtrl', function($scope, $http) {
	$scope.titulo  = "Lista de Clientes";


var carregarClientes = function () {
	 $http.get("http://localhost:8088/getclientes").success(function (data, status){
	 	console.log(data);
		$scope.clientes = data;
	}).error(function (data, status) {
		$scope.message = "Erro ao carregar lista " + status;
		alert($scope.message);
	});
};

//produtos
$scope.produtos = [
{nome: "Brigadeiro", valor: "4", tipo:"Bolos", data: new Date()},
{nome: "Morango", valor: "4", tipo:"Bolos", data: new Date()},
{nome: "Maracujá", valor: "5", tipo:"Bolos", data: new Date()},
{nome: "Abacaxi", valor: "6", tipo:"Bolos", data: new Date()},
{nome: "Prestígio", valor: "6", tipo:"Bolos", data: new Date()},
{nome: "Brigadeiro c/ Morango", valor: "5", tipo:"Bolos", data: new Date()},
{nome: "Brigadeiro c/ Ninho", valor: "6", tipo:"Bolos", data: new Date()},
{nome: "Maracujá c/ Ninho", valor: "6", tipo:"Bolos", data: new Date()},
{nome: "Morango c/ Ninho", valor: "6", tipo:"Bolos", data: new Date()},
{nome: "Torta de Frango", valor: "7", tipo:"Torta", data: new Date()},
{nome: "Arroz c/ Galinha", valor: "7", tipo:"Arroz", data: new Date()}

];

//inserir dados na tabela
$scope.cadastrar = function (cli) {

	$http.post("http://localhost:8088/addclientes", cli).success(function (data) {
		delete $scope.cli;	
		carregarClientes();
		$scope.error
	}).error(function (data, status) {
		$scope.message = "Erro ao inserir cliente " + status;
		alert($scope.message);
	});

	//$scope.clientes.push(angular.copy(cli));
//Limpar dados dos forms
  	//delete $scope.cli;
  	// $scope.msgForm.$setPristine();
 /* var nm = document.getElementById('nome').value = null;
  var tel = document.getElementById('telefone').value = null;

  if (nm !="") {
  	document.getElementById('nome').value=null;
  	document.getElementById('telefone').value=null;
  };*/

};

carregarClientes();

});