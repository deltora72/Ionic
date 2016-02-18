var oriCityArray = [], oriFinalArray = [], desCityArray = [], desFinalArray = [], originCity, destCity, upDes, oriText, desText, dynDesList, distance, duration, durationPlus;
var trainOriCityArray = [], trainOriFinalArray = [], trainDesCityArray = [], trainDesFinalArray = [], trainOriginCity, trainDestCity, trainUpDes, trainOriText, trainDesText, trainDynDesList, trainDistance, trainDuration, trainDurationPlus, trainType;
//-----------------------------------BTrain controller----------------------------------------// 


angular.module('starter.controllers', [])


.controller('resultsModal', function($scope, $ionicModal, $ionicPopup, $timeout) {

// An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'توجه!',
     template: 'لطفا ابتدا شهر های مبدا و مقصد را انتخاب نمایید',
     buttons: [{ text: 'بستن' , type: 'button-positive' }]
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
    
  $ionicModal.fromTemplateUrl('bus-results.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    if ($('#ori-result').text() === 'شهر مبدا را انتخاب کنید' || $('#des-result').text() === 'شهر مقصد را انتخاب کنید' || $('#ori-result').text() === '' || $('#des-result').text() === '') {
       $scope.showAlert();
    } else {
     $scope.modal.show();   
    }
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $('.des a.item').remove();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
    $('.des a.item').remove();
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})

//-----------------------------------Train results modal----------------------------------------//
.controller('trainResultsModal', function($scope, $ionicModal, $ionicPopup, $timeout) {

// An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'توجه!',
     template: 'لطفا ابتدا شهر های مبدا و مقصد و نوع قطار را انتخاب نمایید',
     buttons: [{ text: 'بستن' , type: 'button-positive' }]
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
    
  $ionicModal.fromTemplateUrl('train-results.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    if ($('#train-ori-result').text() === 'شهر مبدا را انتخاب کنید' || $('#train-des-result').text() === 'شهر مقصد را انتخاب کنید' || $('#train-ori-result').text() === '' || $('#train-des-result').text() === '' || $('#train-type-result').text() === 'لطفا نوع قطار مورد نظر خود را انتخاب کنید' || $('#train-type-result').text() === '') {
       $scope.showAlert();
    } else {
     $scope.modal.show();   
    }
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
/*    $('.train-des a.item').remove();*/
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
/*    $('.train-des a.item').remove();*/
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})
//-----------------------------------Train controller----------------------------------------//  
.controller('TrainController', function($scope) {

    
    
    
    
    
//  $scope.stopScroll = function() {
//      alert('paaaayyiiiin!');
//  };    
    
    
    
    
    
    
    

$(function() {
    
    
    $('.train-begin > label').click(function() {
        $('.train-begin .train-city-selector-container').slideToggle(function() {
            $("#train-ori-search").focus();
        });  
    }); 
    $('.train-end > label').click(function() {
        $('.train-end .train-city-selector-container').slideToggle(function() {
            $("#train-des-search").focus();
        });  
        var press = $.Event("keyup");
        press.ctrlKey = false;
        press.which = 8;
        $('#train-des-search').trigger(press);
    });

    
$.getJSON('js/train-database.json', function(trainData) {
    


//-----------------------------------Making origination list---------------------------------//
    trainOriFinalArray = [];
    for (var i = 0; i < trainData.length; i++) { 
        console.log('boz');
        if (trainOriFinalArray.indexOf(trainData[i].train_ori_city) === -1) { 
            trainOriFinalArray.push(trainData[i].train_ori_city);
            $('.train-ori').append('<a class="item row" href="#">'+trainData[i].train_ori_city+'</a>'); 
        }
    } 
 //----------------------Selecting ori list cities---------------------//      
    $('.train-ori a.item').click(function () {
        trainOriText = $(this).text();
        $('#train-des-result').text('شهر مقصد را انتخاب کنید');
        trainDesFinalArray = [];
        $('.train-begin .input-label').hide();
        $('.train-begin .train-city-selector-container').hide();
        $('#train-ori-result').show();
        $('#train-ori-result').text(trainOriText); 
//----------------------Making dest list---------------------//
        $('.train-end .train-city-selector-container').hide();
        $('.train-des a.item').remove();

        for (var i = 0; i < trainData.length; i++) {
            if (trainData[i].train_ori_city === trainOriText && trainDesFinalArray.indexOf(trainData[i].train_des_city) === -1) {  
                trainDesFinalArray.push(trainData[i].train_des_city);
                $('.train-des').append('<a class="item row" href="#">'+trainData[i].train_des_city+'</a>'); 
            }
        } 

        
    $('.train-des a.item').click(function () {
        $('#train-type-selection-container > ul').empty();
        $('#train-type-result').text('لطفا نوع قطار مورد نظر خود را انتخاب کنید');
        trainDesText = $(this).text();
        $('.train-end .input-label').hide();
        $('.train-end .train-city-selector-container').hide();
        $('#train-des-result').show();
        $('#train-des-result').text(trainDesText);
        $.each(trainData, function(i, v) {
            if  (v.train_ori_city === $('#train-ori-result').text() && v.train_des_city === $('#train-des-result').text()) { 
                $('#train-type-selection-container > ul').append('<li class="item">'+v.train_type+'</li>');
            }
        });
        $('#train-type-selection-container .item').click(function () {
            $('#train-type-selection-container ul').show('fast');
        });
        $('#train-type-selection-container ul li.item').click(function () {
            $('#train-type-selection-container .train-input').hide();
            $('#train-type-result').show();
            $('#train-type-result').text($(this).text());
            $('#train-type-selection-container ul').hide('fast');
        });
    });

        
//----------------------Making dest list dynamic---------------------//          
        
    });   
//----------------------Bus finder function--------------------------//
$('#find-train').click(function() {  
    
    var press = $.Event("keyup");
    press.ctrlKey = false;
    press.which = 8;
    $('#train-ori-search').trigger(press);
    
    trainOriginCity = $('#train-ori-result').text();
    trainDestCity = $('#train-des-result').text();
    trainType = $('#train-type-result').text();
    
    $.each(trainData, function(i, v) {
        
            TrainPrice = v.train_price;
            TrainWayDistance = v.train_distance;
            TrainMovingDays = v.moving_days;
            TrainMovingHour = v.moving_hour;
            TrainArrivingHour = v.arriving_hour;
        
        if  (v.train_ori_city === trainOriginCity && v.train_des_city === trainDestCity && v.train_type === trainType) { 

            console.log(trainOriginCity);
            
            $('#train-result-container').html(
             '<li class="train-type-item"><label class="train-type-label"><i class="icon ion-android-train"></i><span class="train-result-answer-label"> : قیمت بلیط</span><span class="train-result-answer">'+TrainPrice+' تومان</span></label></li>\
              <li class="train-type-item"><label class="train-type-label"><i class="icon ion-map"></i><span class="train-result-answer-label"> : مسافت</span><span class="train-result-answer">'+TrainWayDistance+' کیلومتر</span></label></li>\
              <li class="train-type-item"><label class="train-type-label"><i class="icon ion-ios-calendar-outline"></i><span class="train-result-answer-label"> : روزهای حرکت</span><span class="train-result-answer">'+TrainMovingDays+'</span></label></li>\
              <li class="train-type-item"><label class="train-type-label"><i class="icon ion-ios-time-outline"></i><span class="train-result-answer-label"> : ساعت حرکت از مبدا</span><span class="train-result-answer">'+TrainMovingHour+'</span></label></li>\
              <li class="train-type-item"><label class="train-type-label"><i class="icon ion-ios-time-outline"></i><span class="train-result-answer-label"> : ساعت ورود به مقصد</span><span class="train-result-answer">'+TrainArrivingHour+'</span></label></li>');
            
        }       
    
    });
    
    $('.train-results-card #train-results-header-text').text('  سفر از '+trainOriginCity+'  به  '+trainDestCity+'');
    
});
    
//----------------------Making dest list dynamic---------------------//           
$('#train-ori-search, #train-des-search').hideseek({
     nodata: 'شهر مورد نظر یافت نشد'
});     
//----------------------Making dest list dynamic---------------------//   
});      
    
    
    
    

});//------ for the jquery ready function --------------------//   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})

.controller('HelpController', function($scope, questions) {
  $scope.questionList = questions.all();  
})

.controller('QuestionController', function($scope, $stateParams, questions) {
    $scope.question = questions.get($stateParams.questionId);
})

.controller('BusController', function($scope) {
   
    
$(function() {
    
   
    $('.end > label').click(function() {
        $('.end .city-selector-container').slideToggle(function() {
            $("#des-search").focus();
        });  
        var press = $.Event("keyup");
        press.ctrlKey = false;
        press.which = 8;
        $('#des-search').trigger(press);
    });
    $('.begin > label').click(function() {
        $('.begin .city-selector-container').slideToggle(function() {
            $("#ori-search").focus();
        });  
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
    oriFinalArray = [];
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
        $('#des-result').text('شهر مقصد را انتخاب کنید');
        dynDesList = [];
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
    
    var scaniaFortyFour, vipThirtyOne, vipTwentyFive;
    
    originCity = $('#ori-result').text();
    destCity = $('#des-result').text();
    
$('#ori-search, #des-search').val('');
    
    var press = $.Event("keyup");
    press.ctrlKey = false;
    press.which = 8;
    $('#ori-search').trigger(press);

    $.each(data, function(i, v) {
        
        if  (v.ori_city === originCity && v.des_city === destCity) { 
            scaniaFortyFour = v.scania_44;
            vipThirtyOne = v.vip_31;
            vipTwentyFive = v.vip_25;
            distance = v.distance;
            duration = v.duration;
            durationPlus = (duration.length > 9) ? 'دقیقه':'';
            
            if (v.scania_44 !== "0" && v.vip_31 !== "0" && v.vip_25 !== "0") {

            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : اسکانیا 44 نفره</span><span class="bus-price">'+scaniaFortyFour+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 31 نفره</span><span class="bus-price">'+vipThirtyOne+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 25 نفره</span><span class="bus-price">'+vipTwentyFive+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
            } else if (v.scania_44 === "0" && v.vip_31 !== "0" && v.vip_25 !== "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 31 نفره</span><span class="bus-price">'+vipThirtyOne+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 25 نفره</span><span class="bus-price">'+vipTwentyFive+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            } else if (v.scania_44 === "0" && v.vip_31 === "0" && v.vip_25 !== "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 25 نفره</span><span class="bus-price">'+vipTwentyFive+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            } else if (v.scania_44 === "0" && v.vip_31 !== "0" && v.vip_25 === "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 31 نفره</span><span class="bus-price">'+vipThirtyOne+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            } else if (v.scania_44 !== "0" && v.vip_31 === "0" && v.vip_25 !== "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : اسکانیا 44 نفره</span><span class="bus-price">'+scaniaFortyFour+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 25 نفره</span><span class="bus-price">'+vipTwentyFive+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            } else if (v.scania_44 !== "0" && v.vip_31 === "0" && v.vip_25 === "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : اسکانیا 44 نفره</span><span class="bus-price">'+scaniaFortyFour+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            } else if (v.scania_44 !== "0" && v.vip_31 !== "0" && v.vip_25 === "0") {
                
            $('#bus-result-container').html(
'<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : اسکانیا 44 نفره</span><span class="bus-price">'+scaniaFortyFour+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-android-bus"></i><span class="bus-type"> : وی آی پی 31 نفره</span><span class="bus-price">'+vipThirtyOne+' تومان</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-map"></i><span class="bus-type"> : مسافت به کیلومتر</span><span class="bus-distance">'+distance+' km</span></label></li>\
<li class="bus-type-item"><label class="bus-type-label"><i class="icon ion-clock"></i><span class="bus-type"> : زمان سفر</span><span class="bus-price">'+duration+' '+durationPlus+'</span></label></li>');
                
            }   


      }  
        
    }); 
    
    
    $('#bus-result-container').css('display','inline-block')
    
$('.results-card .item-divider:nth-child(1) #results-header-text').text('  سفر از '+originCity+'  به  '+destCity+'');

    
if ($('#ori-result').text() !== 'شهر مبدا را انتخاب کنید' && $('#des-result').text() !== 'شهر مقصد را انتخاب کنید') {
    $('#ori-result').text('شهر مبدا را انتخاب کنید');
    $('#des-result').text('شهر مقصد را انتخاب کنید'); 
} 

    
});
    
//----------------------Making dest list dynamic---------------------//           
$('#ori-search, #des-search').hideseek({
     nodata: 'شهر مورد نظر یافت نشد',
     headers: '.item-divider'
});     
//----------------------Making dest list dynamic---------------------//   
});      
    
    
    
    

});//------ for the jquery ready function --------------------//


  
    
});//------ for the of the bus controller  --------------------//
