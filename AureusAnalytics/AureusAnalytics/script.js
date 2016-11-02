$(document).ready(function () {
    $(".tab_content").hide(); //Hide all content
   
    $(".tab_content:first").show();
   
   
    $("ul.tabsli_kd li:first").addClass("current1").show();
    $("ul.tabsli_kd li").click(function () {
        $("ul.tabsli_kd li").removeClass("current1");
        $(this).addClass("current1");
    })
    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("current");
        $(this).addClass("current");

        
        waitTimeGraph_week(storeId);
        waitTimeGraph_day(storeId);
        drinkQualityGraph(storeId);
        foodQualityGraph(storeId);
        serviceQualityGraph(storeId);
        promotionGraph(storeId);
        cleanlinessGraph(storeId);
        appearanceGraph(storeId);
        
        $(".tab_content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });
});

var storeId = 0;
var waitTime = 0;
var drinkQuality = 0;
var foodQuality = 0;
var serviceQuality = 0;
var promotion = 0;
var cleanliness = 0;
var extAppearance = 0;

function setRangeSliders(WT, DQ, FQ, SQ, PR, CL, EA) {
    waitTime = WT;
    drinkQuality = DQ;
    foodQuality = FQ;
    serviceQuality = SQ;
    promotion = PR;
    cleanliness = CL;
    extAppearance = EA;

    //------------------------------------------------------------------dx-slider-waitTime------------------------------------------------------------------------------------------

    hdnWT = $("#waitTimeSlider").dxSlider({
        min: 0,
        max: 10,
        step: 0.1,
        value: waitTime,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        background: {
            color: 'red'
        },
        onValueChanged: function (data) {
            waitTime = data.value;
        }
    }).dxSlider("instance");
    //------------------------------------------------------------------dx-slider-drinkQuality------------------------------------------------------------------------------------------  
    hdnDQ = $("#drinkQualitySlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: drinkQuality,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        background: {
            color: 'red'
        },
        onValueChanged: function (data) {
            drinkQuality = data.value;
        }
    }).dxSlider("instance");
    //------------------------------------------------------------------dx-slider-foodQuality------------------------------------------------------------------------------------------
    hdnFQ = $("#foodQualitySlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: foodQuality,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        onValueChanged: function (data) {
            foodQuality = data.value;
        }

    }).dxSlider("instance");
    //------------------------------------------------------------------dx-slider-serviceQuality-------------------------------------------------------------------------------------------
    hdnSQ = $("#serviceQualitySlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: serviceQuality,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        onValueChanged: function (data) {
            serviceQuality = data.value;
        }

    }).dxSlider("instance");




    //------------------------------------------------------------------dx-slider-promotions-------------------------------------------------------------------------------------------
    hdnPR = $("#promotionsSlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: promotion,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        onValueChanged: function (data) {
            promotion = data.value;
        }

    }).dxSlider("instance");

    //------------------------------------------------------------------dx-slider-cleanliness-------------------------------------------------------------------------------------------
    hdnCL = $("#cleanlinessSlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: cleanliness,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        onValueChanged: function (data) {
            cleanliness = data.value;
        }

    }).dxSlider("instance");



    //------------------------------------------------------------------dx-slider-ExternalAppearance-------------------------------------------------------------------------------------------
    hdnEA = $("#extApperanceSlider").dxSlider({
        min: 0,
        max: 5,
        step: 0.1,
        value: extAppearance,
        tooltip: {
            enabled: true,
            format: function (value) {
                return value;
            },

            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value;
            },
            position: "top"
        },
        onValueChanged: function (data) {
            extAppearance = data.value;
        }

    }).dxSlider("instance");
}

//----------------------------------------------------------------------------CustomerFrequency-graph--------------------------------------------------------------------------------
function loadCustVisitFrequecyByStore(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "month";
        var minV = 50000
        var maxV = 600000

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    if (type == 'm') {
        var argmntField = "time";
        var minV = 3000
        var maxV = 8000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "SalesForecast", name: "Sales" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Total Sales Forecast", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Sales',
            label: {
                customizeText: function (arg) {
                    if (type == 'q') {
                        return arg.valueText / 1000 + "k";
                    }
                    else {
                        return arg.valueText
                    }
                }
            }
        }
    };
    var chart = $("#freqByStoreContainer").dxChart(chartOptions).dxChart("instance");


}

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
function waitTimeGraph_week(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 5

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "waittime", name: "Time" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Wait Time by Week Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Time (in Minutes)',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#waitTimeGraph_week").dxChart(chartOptions).dxChart("instance");
}

//----------------------------------------------------------------------------wait-time-graph2--------------------------------------------------------------------------------
function waitTimeGraph_day(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "daypart";
        var minV = 0
        var maxV = 3

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "waittime", name: "Sales" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Wait Time by Day-Part", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Time (in seconds)',
            label: {
                customizeText: function (arg) {

                    return arg.valueText
                }
            }
        }
    };
    var chart = $("#waitTimeGraph_day").dxChart(chartOptions).dxChart("instance");
}

//----------------------------------------------------------------------------drink-qual-graph--------------------------------------------------------------------------------
function drinkQualityGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 5

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newdrinkqual", name: "Time" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Drink Quality by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Drink Quality Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#drinkQualityGraph").dxChart(chartOptions).dxChart("instance");
}

//----------------------------------------------------------------------------food-qual-graph--------------------------------------------------------------------------------
function foodQualityGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 5

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newfoodqual", name: "Sales" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Food Quality by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Food Quality Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#foodQualityGraph").dxChart(chartOptions).dxChart("instance");
}

//----------------------------------------------------------------------------service-qual-graph--------------------------------------------------------------------------------
function serviceQualityGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 5

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newservicequal", name: "Sales" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Service Quality by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Service Quality Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#serviceQualityGraph").dxChart(chartOptions).dxChart("instance");
}


//----------------------------------------------------------------------------promotion-graph--------------------------------------------------------------------------------
function promotionGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 4

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newpromo", name: "Time" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Avg Promotions Discount by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. First Promotion Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#promotionGraph").dxChart(chartOptions).dxChart("instance");
}


//----------------------------------------------------------------------------Cleanliness-graph--------------------------------------------------------------------------------
function cleanlinessGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 4

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newclean", name: "Time" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Cleanliness Rating by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Cleanliness Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#cleanlinessGraph").dxChart(chartOptions).dxChart("instance");
}

//----------------------------------------------------------------------------Appearance-graph--------------------------------------------------------------------------------
function appearanceGraph(dataSource, type) {

    var dataSource = dataSource;
    if (type == 'q') {
        var argmntField = "dayofweek";
        var minV = 0
        var maxV = 5

    }
    if (type == 'd') {
        var argmntField = "daypart";
        var minV = 500
        var maxV = 3000
    }
    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: argmntField
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "newapearance", name: "Time" },

        ],
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false,
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "External Appearance Rating by Day", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: minV,
            max: maxV,
            title: 'Avg. Appearance Rating',
            label: {
                customizeText: function (arg) {

                    return arg.valueText

                }
            }
        }
    };
    var chart = $("#appearanceGraph").dxChart(chartOptions).dxChart("instance");
}




//----------------------------------------------------wait-time-meter-Guage----------------------------------------------------------

function loadwaittimemeterGuage(GaugeValue) {
    hdnwaittimemeter = $('#waittimemeter').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 3,
            tickInterval: .5,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
                { startValue: 0, endValue: .25, color: '#CE2029' },
                { startValue: .25, endValue: .5, color: '#FFD700' },
                { startValue: .5, endValue: .75, color: '#228B22' },
                { startValue: .75, endValue: 1, color: 'blue' },
                { startValue: 1, endValue: 1.25, color: '#CE2029' },
                { startValue: 1.25, endValue: 1.5, color: '#FFD700' },
                { startValue: 1.5, endValue: 1.75, color: '#228B22' },
                { startValue: 1.75, endValue: 2, color: 'blue' }
            ]
        },

        title: {
            text: 'Avg. Wait Time: ' + GaugeValue,
            font: { size: 25 }
        },
        value: GaugeValue


    }).dxCircularGauge("instance");
}

//----------------------------------------------------loaddrinkqualityGuage----------------------------------------------------------
function loaddrinkqualityGuage(GaugeValue) {
    hdndrinkquality = $('#drinkquality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
                { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },

            ]
        },
        title: {
            text: 'Avg. Drink Quality Rating: ' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadfoodqualityGuage----------------------------------------------------------
function loadfoodqualityGuage(GaugeValue) {
    hdnfoodquality = $('#foodquality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
               { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },
            ]
        },
        title: {
            text: 'Avg. Food Quality Rating: ' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadservicequalityGuage----------------------------------------------------------
function loadservicequalityGauge(GaugeValue) {
    hdnservicequality = $('#servicequality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
                { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },
            ]
        },
        title: {
            text: 'Avg. Service Quality Rating: ' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadpromolinessGuage----------------------------------------------------------
function loadpromo1Gauge(GaugeValue) {
    hdnpromo1 = $('#promo1').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
               { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },
            ]
        },
        title: {
            text: 'Avg. Promotion Per Ticket: $' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}

//----------------------------------------------------loadcleanlinessGuage----------------------------------------------------------
function loadclean_li_nessGauge(GaugeValue) {
    hdncleanliness = $('#clean_li_ness').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
               { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },
            ]
        },
        title: {
            text: 'Avg. Cleanliness Rating: ' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}

//----------------------------------------------------external appearance----------------------------------------------------------
function loadexternal_appearanceGauge(GaugeValue) {
    hdnexternalappearance = $('#external_appearance1').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 5,
            tickInterval: 1,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 10, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 4,
            ranges: [
               { startValue: 0, endValue: 1, color: '#CE2029' },
                { startValue: 1, endValue: 2, color: '#FFD700' },
                { startValue: 2, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 4, color: 'blue' },
                { startValue: 4, endValue: 5, color: '#CE2029' },
            ]
        },
        title: {
            text: 'Avg. Appearance Rating: ' + GaugeValue,
            font: { size: 20 }
        },
        value: GaugeValue
    }).dxCircularGauge("instance");
}

$('#slider1').click(function () {
    $('#wait_time').css('display', 'block');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#slider2').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'block');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#slider3').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'block');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#slider4').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'block');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#slider5').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'block');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#slider6').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'block');
    $('#external_appearance').css('display', 'none');
});

$('#slider7').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'none');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'block');
});

$('#act_plnr').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'block');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

$('#btnLock').click(function () {
    $('#wait_time').css('display', 'none');
    $('#circle1').css('display', 'block');
    $('#drink_quality').css('display', 'none');
    $('#food_quality').css('display', 'none');
    $('#service_quality').css('display', 'none');
    $('#promo_tions').css('display', 'none');
    $('#cleanli_ness').css('display', 'none');
    $('#external_appearance').css('display', 'none');
});

