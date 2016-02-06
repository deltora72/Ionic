// Ionic Starter App
var oriCityArray = [], oriFinalArray = [], desCityArray = [], desFinalArray = [], originCity, destCity, upDes, oriText, desText;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('resultsModal', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    if ($('#ori-result').text() === 'شهر مبدا را انتخاب کنید' || $('#des-result').text() === 'شهر مقصد را انتخاب کنید') {
        alert('لطفا ابتدا شهر های مبدا و مقصد را انتخاب نمایید');
    } else {
     $scope.modal.show();   
    }
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

});

//----------------------sql lite settings end--------------------------//



$(function() {
    
    
    $('.end > label').click(function() {
        $('.end .city-selector-container').slideToggle(500);  
        var press = $.Event("keyup");
        press.ctrlKey = false;
        press.which = 8;
        $('#des-search').trigger(press);
    });
    $('.begin > label').click(function() {
        $('.begin .city-selector-container').slideToggle(1000); 
    });

    
$.getJSON('js/bus-database.json', function(data) {
    
    
//----------------------Building origin list--------------------------//  

var oriStateArray = [
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "اردبیل",
    "اصفهان",
    "البرز",
    "ایلام",
    "بوشهر",
    "تهران",
    "چهارمحال و بختیاری",
    "خراسان جنوبی",
    "خراسان رضوی",
    "خراسان شمالی",
    "خوزستان",
    "زنجان",
    "سمنان",
    "سیستان و بلوچستان",
    "فارس",
    "قزوین",
    "قم",
    "کردستان",
    "کرمان",
    "کرمانشاه",
    "کهگیلویه و بویراحمد",
    "گلستان",
    "گیلان",
    "لرستان",
    "مازندران",
    "مرکزی",
    "هرمزگان",
    "همدان",
    "یزد"
];


//-----------------------------------Making origination list---------------------------------//
    for (var i = 0; i < data.length; i++) {
        oriCityArray.push(data[i].ori_city);
        for (var j = 0; j < oriStateArray.length; j++) {
            if (data[i].ori_state === oriStateArray[j] && oriFinalArray.indexOf(data[i].ori_city) === -1) { 
                oriFinalArray.push(data[i].ori_city);
                $('.ori .item-divider:contains("'+oriStateArray[j]+'")').after('<a class="item row" href="#">'+data[i].ori_city+'</a>');   
            }
        } 
    } 
 //----------------------Selecting ori list cities---------------------//      
    $('.ori a.item').click(function () {
        oriText = $(this).text();
        var dynDesList = [];
        $('.begin .input-label').hide();
        $('.begin .city-selector-container').hide();
        $('#ori-result').show();
        $('#ori-result').text(oriText); 
//----------------------Making dest list---------------------//
        $('.end .city-selector-container').hide();
        $('.des a.item').remove();
        for (var i = 0; i < data.length; i++) {
            if (data[i].ori_city === oriText) {  
                var x = oriStateArray.indexOf(data[i].des_state);
                $('.des .item-divider:contains("'+oriStateArray[x]+'")').after('<a class="item row" href="#">'+data[i].des_city+'</a>'); 
            }
        }  
        
    $('.des a.item').click(function () {
        console.log('box');
        desText = $(this).text();
        $('.end .input-label').hide();
        $('.end .city-selector-container').hide();
        $('#des-result').show();
        $('#des-result').text(desText);
    });
//----------------------Making dest list dynamic---------------------//          
        
    });   
//----------------------Bus finder function--------------------------//
$('#find-bus').click(function() {  
    
    
    originCity = $('#ori-result').text();
    destCity = $('#des-result').text();
    
$('#ori-search, #des-search').val('');
    
    var press = $.Event("keyup");
    press.ctrlKey = false;
    press.which = 8;
    $('#ori-search').trigger(press);

    $.each(data, function(i, v) {
        if  (v.ori_city === originCity && v.des_city === destCity) { 
            var scaniaFortyFour = v.scania_44;
            var vipThirtyOne = v.vip_31;
            var vipTwentyFive = v.vip_25;
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type">اسکانیا 44 نفره : </span><span class="bus-price">'+scaniaFortyFour+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type">وی آی پی 31 نفره : </span><span class="bus-price">'+vipThirtyOne+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type">وی آی پی 25 نفره : </span><span class="bus-price">'+vipTwentyFive+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type">مسافت به کیلومتر : </span><span class="bus-distance">365 km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type">مدت سفر : </span><span class="bus-price">8 ساعت و 20 دقیقه</span></label></li>');
            
        }
    }); 
    $('#bus-result-container').css('display','inline-block')
    
$('.results-card .item-divider:nth-child(1) #results-header-text').text('  سفر از '+originCity+'  به  '+destCity+'');

    
    
$('#ori-result').text('شهر مبدا را انتخاب کنید');
$('#des-result').text('شهر مقصد را انتخاب کنید');   
});
    
//----------------------Making dest list dynamic---------------------//           
$('#ori-search, #des-search').hideseek({
     nodata: 'شهر مورد نظر یافت نشد',
     headers: '.item-divider'
});     
//----------------------Making dest list dynamic---------------------//   
});      
    
    
    
    
    
    

});



//----------------------Making dest list dynamic---------------------//     

/*    $('.ori a.item').each(function() {
       $(this).attr('data-search-term', $(this).text().toLowerCase());
    });
    var searchTerm;
    $('.begin input').keyup(function() {
        searchTerm = $(this).val().toLowerCase();
        $('.ori a.item').each(function() {
            if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });                   
    });*/
  
//----------------------Making dest list dynamic---------------------//