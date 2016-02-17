// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $ionicHistory, $state) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
        
        // then override any default you want
        window.plugins.nativepagetransitions.globalOptions.duration = 500;
        window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
        window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
        window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
        window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
        // these are used for slide left/right only currently
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
        
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      

        
      
  });
    

 

    
$ionicPlatform.registerBackButtonAction(function(event) {
    if ($state.current.name === 'app.home') { // your check here
      $ionicPopup.confirm({
        title: 'هشدار!',
        template: 'آیا مطمئن هستید که می خواهید از برنامه خارج شوید؟',
        cancelText: 'خیر', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-positive', // String (default: 'button-default'). The type of the Cancel button.
        cssClass: 'exit-alert',
        okText: 'بله', // String (default: 'OK'). The text of the OK button.
        okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    } else if ($state.current.name === 'app.bus') {
        $state.go('app.home');
        $('.main-bar .buttons-right .button').css('display','block');
        $('.main-bar button.back-button').css('display','none');
        $('.main-bar > h1').css('text-align','center');
    } else if ($state.current.name === 'app.train') {
        $state.go('app.home');
        $('.main-bar .buttons-right .button').css('display','block');
        $('.main-bar button.back-button').css('display','none');
        $('.main-bar > h1').css('text-align','center');
    } else if ($state.current.name === 'app.help') {
        $state.go('app.home');
        $('.main-bar .buttons-right .button').css('display','block');
        $('.main-bar button.back-button').css('display','none');
        $('.main-bar > h1').css('text-align','center');
    }
}, 101); 
    


})



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
$ionicConfigProvider.views.transition('none'); 
$ionicConfigProvider.scrolling.jsScrolling(false);
    
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  
  .state('app.bus', {
    url: '/bus',
    views: {
      'menuContent': {
        templateUrl: 'templates/bus.html',
        controller: 'BusController'
      }
    }
  })

  .state('app.train', {
      url: '/train',
      views: {
        'menuContent': {
          templateUrl: 'templates/train.html',
          controller: 'TrainController'
        }
      }
    })
  
    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'HelpController'
        }
      }
    })

    .state('app.question', {
      url: '/help/:questionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/question.html',
          controller: 'QuestionController'
        }
      }
    }); 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});


