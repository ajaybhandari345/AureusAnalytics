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
            "Paramtervalues": { type: $scope.foreCastLevel, range: $scope.range, date: $filter('date')(new Date(date.getFullYear() + 1, date.getMonth(), date.getDay()), 'yyyy-MM-dd') }
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
            $scope.SalesForecast = $scope.SalesForecast.toFixed(2);
            $scope.NewSalesForecast = $scope.LoyalNumForecast * $scope.LoyalAvgForecast;
            $scope.NewSalesForecast = $scope.NewSalesForecast.toFixed(2);
            $scope.totalSale = +$scope.SalesForecast + +$scope.NewSalesForecast;
            
        }, function errorCallback(response) {

        });

        dbResObj = {
            "StoredProcedueName": "GetDashboardSalesForecast",
            "Paramtervalues": { type: $scope.foreCastLevel, range: $scope.range, date: $filter('date')(new Date(date.getFullYear() + 1, date.getMonth(), date.getDay()), 'yyyy-MM-dd') }
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

            //if ($scope.foreCastType == 'q')
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

    $scope.getActionPlannerData = function () {

        //alert("wait_time :" + wait_time + " drink_quality :" + drink_quality + " food_quality : " + food_quality + " service_quality :" + service_quality + " promotions :" + promotions + " cleanliness :" + cleanliness + "external_appearence :" + external_appearence)

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
        }, function errorCallback(response) {

        });
    }
        
    $scope.getReportData();
}])
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