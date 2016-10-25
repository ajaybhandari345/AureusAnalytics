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