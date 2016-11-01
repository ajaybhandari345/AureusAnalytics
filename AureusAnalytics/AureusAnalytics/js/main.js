var app = angular.module("app", [])
app.controller("mainController", ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
    var date = new Date();
    $("#dateBox").dxDateBox({
        min: new Date(2000, 0, 1),
        max: new Date(2029, 11, 31),
        value: date,
        onValueChanged: function (e) {
            date = $("#dateBox").dxDateBox("instance").option('value');
            $scope.foreCastType = 'd';

        }
    });
    $scope.foreCastType = 'q';
    $scope.weekrange = {
        value: date
    };
    $scope.foreCastLevel = '4';
    $scope.range = "Q1"

    $scope.setRange = function (val, type) {
        $scope.foreCastType = type;
        if (type == 'w')
            $scope.range = $filter('date')(val, 'ww');
        if (type == 'q')
            $scope.range = val;
        if (type == 'm')
            $scope.range = val;
    }

    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    var daypart = ["6:00 - 9:00", "9:00 - 12:00", "12:00 - 3:00", "3:00 - 6:00", "6:00 - Close"];

    var weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];



    $scope.getReportData = function () {
        var dbResObj = {
            "StoredProcedueName": "GetDashboardSales",
            "Paramtervalues": { type: $scope.foreCastLevel, range: $scope.range, date: $filter('date')(new Date(date.getFullYear(), date.getMonth(), date.getDay()), 'yyyy-MM-dd') }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            $scope.LoyalAvgForecast = response.data.OutPutResults[0].LoyalAvgForecast;
            $scope.LoyalAvgForecast = $scope.LoyalAvgForecast.toFixed(2);
            $scope.NewAvgForecast = response.data.OutPutResults[0].NewAvgForecast;
            $scope.NewAvgForecast = $scope.NewAvgForecast.toFixed(2);

            $scope.LoyalNumForecast = response.data.OutPutResults[0].LoyalNumForecast;
            $scope.NewNumForecast = response.data.OutPutResults[0].NewNumForecast;

            $scope.SalesForecast = $scope.NewNumForecast * $scope.NewAvgForecast;          
            $scope.NewSalesForecast = $scope.LoyalNumForecast * $scope.LoyalAvgForecast;
          
            $scope.totalSale = +$scope.SalesForecast + +$scope.NewSalesForecast;
            
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetDashboardSalesForecast",
            "Paramtervalues": { type: $scope.foreCastLevel, range: $scope.range, date: $filter('date')(new Date(date.getFullYear(), date.getMonth(), date.getDay()), 'yyyy-MM-dd') }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            if ($scope.foreCastType == 'q')
                angular.forEach(response.data.OutPutResults, function (v, k) {
                    v.month = monthNames[v.month - 1]
                })
            if ($scope.foreCastType == 'd')
                angular.forEach(response.data.OutPutResults, function (v, k) {
                    v.daypart = daypart[v.daypart - 1]
                })
            if ($scope.foreCastType == 'm')
                angular.forEach(response.data.OutPutResults, function (v, k) {
                    v.time = k
                })
            loadCustVisitFrequecyByStore(response.data.OutPutResults, $scope.foreCastType)

        }, function errorCallback(response) {

        });
    }


    //----------------------------------------------------------Wait Time servic calling--------------------------------------------------------------------------
    $scope.getWaitTime = function () {

        dbResObj = {
            "StoredProcedueName": "GetWaitTimeGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].waittime = response.data.OutPutResults[0].waittime.toFixed(2);
            loadwaittimemeterGuage(response.data.OutPutResults[0].waittime)
            
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetWaitTime",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            waitTimeGraph_week(response.data.OutPutResults, 'q')
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetWaitTime_daypart",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.daypart = daypart[v.daypart - 1]
            })
            waitTimeGraph_day(response.data.OutPutResults, 'q')
        }, function errorCallback(response) {

        });
    }

    //----------------------------------------------------------Drink Quality service calling--------------------------------------------------------------------------
    $scope.getDrinkQuality = function () {

        dbResObj = {
            "StoredProcedueName": "GetDrinkQualityGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newdrinkqual = response.data.OutPutResults[0].newdrinkqual.toFixed(2);
            loaddrinkqualityGuage(response.data.OutPutResults[0].newdrinkqual)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetDrinkQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            drinkQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }

    //----------------------------------------------------------Food Quality service calling--------------------------------------------------------------------------
    $scope.getFoodQuality = function () {

        dbResObj = {
            "StoredProcedueName": "GetFoodQualityGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newfoodqual = response.data.OutPutResults[0].newfoodqual.toFixed(2);
            loadfoodqualityGuage(response.data.OutPutResults[0].newfoodqual)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetFoodQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            foodQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }


    //----------------------------------------------------------Service Quality service calling--------------------------------------------------------------------------
    $scope.getServiceQuality = function () {

        dbResObj = {
            "StoredProcedueName": "GetServiceQualityGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newservicequal = response.data.OutPutResults[0].newservicequal.toFixed(2);
            loadservicequalityGauge(response.data.OutPutResults[0].newservicequal)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetServiceQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            serviceQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }


    //----------------------------------------------------------Promotion service calling--------------------------------------------------------------------------
    $scope.getPromotion = function () {

        dbResObj = {
            "StoredProcedueName": "GetPromotionGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newpromo = response.data.OutPutResults[0].newpromo.toFixed(2);
            loadpromo1Gauge(response.data.OutPutResults[0].newpromo)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetPromotion",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            promotionGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }


    //----------------------------------------------------------Cleanliness service calling--------------------------------------------------------------------------
    $scope.getCleanliness = function () {

        dbResObj = {
            "StoredProcedueName": "GetCleanlinessGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newclean = response.data.OutPutResults[0].newclean.toFixed(2);
            loadclean_li_nessGauge(response.data.OutPutResults[0].newclean)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetCleanliness",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {

            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            cleanlinessGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }


    //----------------------------------------------------------Appearance service calling--------------------------------------------------------------------------
    $scope.getAppearance = function () {

        dbResObj = {
            "StoredProcedueName": "GetAppearanceGuage",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            response.data.OutPutResults[0].newapperance = response.data.OutPutResults[0].newapperance.toFixed(2);
            loadexternal_appearanceGauge(response.data.OutPutResults[0].newapperance)
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetAppearance",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            appearanceGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {

        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    $scope.getSliderValue = function () {

        dbResObj = {
            "StoredProcedueName": "GetSliderValue",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            $scope.WT = response.data.OutPutResults[0].waittime;
            $scope.WT = $scope.WT.toFixed(2);
            $scope.DQ = response.data.OutPutResults[0].newdrinkqual;
            $scope.DQ = $scope.DQ.toFixed(2);
            $scope.FQ = response.data.OutPutResults[0].newfoodqual;
            $scope.FQ = $scope.FQ.toFixed(2);
            $scope.SQ = response.data.OutPutResults[0].newservicequal;
            $scope.SQ = $scope.SQ.toFixed(2);
            $scope.PR = response.data.OutPutResults[0].newpromo;
            $scope.PR = $scope.PR.toFixed(2);
            $scope.CL = response.data.OutPutResults[0].newclean;
            $scope.CL = $scope.CL.toFixed(2);
            $scope.EA = response.data.OutPutResults[0].newapperance;
            $scope.EA = $scope.EA.toFixed(2);
            setRangeSliders($scope.WT, $scope.DQ, $scope.FQ, $scope.SQ, $scope.PR, $scope.CL, $scope.EA);
        }, function errorCallback(response) {

        });
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
    $scope.getActionPlannerData = function () {

        $scope.getTicketsizeData();
        $scope.getCustomercountData();
        $scope.WTT = waitTime;
        $scope.DQT = drinkQuality;
        $scope.FQT = foodQuality;
        $scope.SQT = serviceQuality;
        $scope.PRT = promotion;
        $scope.CLT = cleanliness;
        $scope.EAT = extAppearance;
        
        $scope.ex = waitTime;
        dbResObj = {
            "MethodName": "QSalesForecast",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "1"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.salesfromrepeat = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
            $scope.salesfromrepeat1 = $scope.salesfromrepeat;
        }, function errorCallback(response) {

        });

        dbResObj = {
            "MethodName": "QSalesForecast",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "0"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.salesfromnew = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
            $scope.salesfromnew1 = $scope.salesfromnew;

        }, function errorCallback(response) {

        });

        dbResObj = {
            "MethodName": "QSalesForecast",
            "Paramtervalues": ["2017", "12", "0", "1"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.defaultsalesfromrepeat = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
            $scope.defaultsalesfromrepeat1 = $scope.defaultsalesfromrepeat;
        }, function errorCallback(response) {

        });

        dbResObj = {
            "MethodName": "QSalesForecast",
            "Paramtervalues": ["2017", "12", "0", "1"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.defaultsalesfromnew = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
            $scope.defaultsalesfromnew1 = $scope.defaultsalesfromnew;
        }, function errorCallback(response) {

        });

     



    }

    
    //----------------------------------------------------------------------------------------------------------------------------------------------
    $scope.getTicketsizeData = function () {
        dbResObj = {
            "MethodName": "QTicketSize",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "1"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.ticketsizedataRepeat = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
        }, function errorCallback(response) {

        });

        dbResObj = {
            "MethodName": "QTicketSize",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "0"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.ticketsizedataNew = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
        }, function errorCallback(response) {

        });
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
    $scope.getCustomercountData = function () {
        dbResObj = {
            "MethodName": "QCustomerCount",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "1"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)

            $scope.customercountRepeat = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
          
        }, function errorCallback(response) {

        });

        dbResObj = {
            "MethodName": "QCustomerCount",
            "Paramtervalues": ["2017", waitTime, drinkQuality, foodQuality, serviceQuality, promotion, cleanliness, extAppearance, "12", "0", "0"]
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/Api/pete/serviceclass',
            data: dbResObj
        }).then(function successCallback(response) {
            var obj = JSON.parse(response.data.OutPutResults)
            $scope.customercountNew = JSON.parse(response.data.OutPutResults).Results.output1.value.Values[0][0];
       

        }, function errorCallback(response) {

        });


    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
    $scope.getGraphValue = function () {

        dbResObj = {
            "StoredProcedueName": "GetGraphValue",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            $scope.NWT = response.data.OutPutResults[0].waittime;           
            $scope.NDQ = response.data.OutPutResults[0].newdrinkqual;
            $scope.NFQ = response.data.OutPutResults[0].newfoodqual;
            $scope.NSQ = response.data.OutPutResults[0].newservicequal;
            $scope.NPR = response.data.OutPutResults[0].newpromo;
            $scope.NCL = response.data.OutPutResults[0].newclean;
            $scope.NEA = response.data.OutPutResults[0].newapperance;
            $scope.LDQ = response.data.OutPutResults[0].newdrinkqual;
            $scope.LFQ = response.data.OutPutResults[0].newfoodqual;
            $scope.LSQ = response.data.OutPutResults[0].newservicequal;
            $scope.LPR = response.data.OutPutResults[0].newpromo;
            $scope.LCL = response.data.OutPutResults[0].newclean;
            $scope.LEA = response.data.OutPutResults[0].newapperance;

        }, function errorCallback(response) {

        });
    }
    $scope.getReportData();
    $scope.getGraphValue();
   
}])

//----------------------------------------------------------------------------------------------------------------------------------------------
$("#panel2").hide();
function switchTab(id) {
    if (id == 1) {
        $("#panel1").show();
        $("#panel2").hide();
    }
    if (id == "2") {
        $("#panel1").hide();
        $("#panel2").show();
    }
} 