// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
    //controller: 'AppCtrl'
  })

  .state('app.consultas', {
    url: '/consultas',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultas.html'
      }
    }
  })

  .state('app.clientes', {
      url: '/clientes',
      views: {
        'menuContent': {
          templateUrl: 'templates/clientes.html',
          controller: 'ListCtrl'

        }
      }
    })
    .state('app.vendas', {
      url: '/vendas',
      views: {
        'menuContent': {
          templateUrl: 'templates/vendas.html',
          controller: 'ListCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        //controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
