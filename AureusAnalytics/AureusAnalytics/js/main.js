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
    $scope.foreCastType = 'd';
    $scope.weekrange = {
        value: date
    };
    $scope.foreCastLevel = '1';
    $scope.range = $filter('date')(date, 'ww');

    $scope.setRange = function (val, type) {
        $scope.foreCastType = type;
        if (type=='w')
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

    var weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sun"];
  
    $scope.getReportData = function () {
        var dbResObj = {
            "StoredProcedueName": "GetDashboardSales",
            "Paramtervalues": { type: $scope.foreCastLevel, range: $scope.range, date: $filter('date')(new Date(date.getFullYear()+1,date.getMonth(),date.getDay()), 'yyyy-MM-dd') }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            $scope.loyalSalesForecast = response.data.OutPutResults[0].LoyalSalesForecast;
            $scope.NewSalesForecast = response.data.OutPutResults[0].NewSalesForecast;
            $scope.SalesForecast = response.data.OutPutResults[0].SalesForecast;
            $scope.LoyalAvgForecast = response.data.OutPutResults[0].LoyalAvgForecast;
            $scope.NewAvgForecast = response.data.OutPutResults[0].NewAvgForecast;
            $scope.LoyalNumForecast = response.data.OutPutResults[0].LoyalNumForecast;
            $scope.NewNumForecast = response.data.OutPutResults[0].NewNumForecast;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
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
            console.log(response)
            if ($scope.foreCastType == 'q')
                angular.forEach(response.data.OutPutResults, function (v,k) {
                    v.month = monthNames[v.month-1]
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
            console.log(response)
        });
    }



    $scope.getWaitTime = function () {
        dbResObj = {
            "StoredProcedueName": "GetWaitTime",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
                angular.forEach(response.data.OutPutResults, function (v, k) {
                    v.dayofweek = weekNames[v.dayofweek - 1]
                })
            waitTimeGraph_week(response.data.OutPutResults, 'q')
        }, function errorCallback(response) {
            console.log(response)
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
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.daypart = daypart[v.daypart - 1]
            })
            waitTimeGraph_day(response.data.OutPutResults, 'q')
        }, function errorCallback(response) {
            console.log(response)
        });
    }


    $scope.getDrinkQuality = function () {
        dbResObj = {
            "StoredProcedueName": "GetDrinkQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            drinkQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.getFoodQuality = function () {
        dbResObj = {
            "StoredProcedueName": "GetFoodQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            foodQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.getServiceQuality = function () {
        dbResObj = {
            "StoredProcedueName": "GetServiceQuality",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            serviceQualityGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.getPromotion = function () {
        dbResObj = {
            "StoredProcedueName": "GetPromotion",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            promotionGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.getCleanliness = function () {
        dbResObj = {
            "StoredProcedueName": "GetCleanliness",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            cleanlinessGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.getAppearance = function () {
        dbResObj = {
            "StoredProcedueName": "GetAppearance",
            "Paramtervalues": { range: "Q1" }
        };
        $http({
            method: 'POST',
            url: 'http://petesdemoapi.azurewebsites.net/API/petes/SQLClass',
            data: dbResObj
        }).then(function successCallback(response) {
            console.log(response)
            //if ($scope.foreCastType == 'q')
            angular.forEach(response.data.OutPutResults, function (v, k) {
                v.dayofweek = weekNames[v.dayofweek - 1]
            })
            appearanceGraph(response.data.OutPutResults, 'q')

        }, function errorCallback(response) {
            console.log(response)
        });
    }
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