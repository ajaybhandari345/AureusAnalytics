$(document).ready(function () {
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("current").show();
    $(".tab_content:first").show();
    $(".tab3div1").addClass("shadow");
    $(".tab3div6").addClass("shadow");
    //$(".tab3div5").hide();
    $("ul.tabsli_kd li:first").addClass("current1").show();
    $("ul.tabsli_kd li").click(function () {
        $("ul.tabsli_kd li").removeClass("current1");
        $(this).addClass("current1");
    })
    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("current");
        $(this).addClass("current");

        //$(this).find("a").addClass("selected");
        loadCustVisitFrequecyGuage(storeId);
        loadCustVisitFrequecyByStore(storeId);
        loadCustVisitFrequecyByStore1(storeId);
        loadCustVisitFrequecyByStore2(storeId);
        loadCustVisitFrequecyByStore3(storeId);
        loadCustVisitFrequecyByStore4(storeId);
        loadCustVisitFrequecyByStore5(storeId);
        loadCustVisitFrequecyByStore6(storeId);
        loadCustVisitFrequecyByStore7(storeId);
        loadFinalCustVisitFrequecyGuage(storeId);
        loadwaittimemeterGuage(storeId);
        loaddrinkqualityGuage(storeId);
        loadfoodqualityGuage(storeId);
        loadservicequalityGauge(storeId);
        loadclean_li_nessGauge(storeId);
        loadpromo1Gauge(storeId);
        loadexternal_appearanceGauge(storeId);
        loadWaitingGauge(storeId);
        getOtherFactorsData(storeId)
        loadOtherFactorsData();
        setRangeSliders(storeId)
        loadOrderAccuracyGauge(storeId)
        loadteamfGauge(storeId)
        loadMenuVarietyGauge(storeId)
        loadOrderSampleGauge(storeId)
        loadContainer2(storeId)
        loadExperienceGraphByStage();
        

        $(".tab_content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });
});
var tempMin;
var tempMax;
var storeId = 1;
var storeCVFBucket;
var storeWTBucket;
var storeOSBucket;
var storeOABucket;
var storeTFBucket;
var storeMVBucket;
var CVFStoreCnt = [];
var otherFactors = [];
var custVisitFreq = 0;
var hdnfinalCustVisitFreq;
var hdnSales;
var targetsArr = { WT: '', OA: '', MV: '', TF: '', OS: '' };

var resultData = data.filter(getValues);
targetsArr.WT = (resultData[0].WT).toFixed(2);
targetsArr.MV = (resultData[0].MV).toFixed(2);
targetsArr.TF = (resultData[0].TF).toFixed(2);
targetsArr.OS = (resultData[0].OS).toFixed(2);
targetsArr.OA = (resultData[0].OA).toFixed(2);

$("#wTime").html(parseFloat(resultData[0].WT).toFixed(1))
$("#cvFreq").html(parseFloat(resultData[0].CVF).toFixed(1) * 25 + "%")
$("#oAccuracy").html(parseFloat(resultData[0].OA).toFixed(1) * 100 + "%")
$("#mVariety").html(parseFloat(resultData[0].MV).toFixed(1) * 100 + "%")
$("#tFriendliness").html(parseFloat(resultData[0].TF).toFixed(1) * 100 + "%")
$("#offeredSample").html(parseFloat(resultData[0].OS).toFixed(1) * 100 + "%")

//Highlights the key factors divs

//$("#key"+resultData[0].Act_1).addClass("highlight");
//$("#key"+resultData[0].Act_2).addClass("highlight");

$("targetOA").html(targetsArr.OA);
$("targetMV").html(targetsArr.MV);
$("targetTF").html(targetsArr.TF);
$("targetOS").html(targetsArr.OS);
$("targetWT").html(targetsArr.WT);

function getCVFStoreCnt(sId) {
    var WT_buckets = [{ ID: 1, Min: 0, Max: 1 },
                    { ID: 2, Min: 1, Max: 2 },
                    { ID: 3, Min: 2, Max: 3 },
                    { ID: 4, Min: 3, Max: 4 },
                    { ID: 5, Min: 4, Max: 5 },
                    { ID: 6, Min: 5, Max: 6 },
    ];
    tempMin = 0;
    tempMax = 0;
    var Objdata = data.filter(function (obj) {
        return obj.LOC == sId;
    });
    var cvf = Objdata[0].CVF;
    for (var i = 0; i < WT_buckets.length; i++) {

        tempMin = WT_buckets[i].Min;
        tempMax = WT_buckets[i].Max;

        var filtered = data.filter(filterByFreq);
        var label = tempMin + ' - ' + tempMax
        CVFStoreCnt.push({ label: label, value: filtered.length, Freq: data[i].CVF });

        if (cvf >= tempMin && cvf < tempMax)
            storeCVFBucket = label;
    }


}
function filterByFreq(obj) {
    return obj.CVF >= tempMin && obj.CVF < tempMax;
}

function getOtherFactorsData(sId) {
    var Objdata = data.filter(function (obj) {
        return obj.LOC == sId;
    });
    otherFactors.push({ name: 'Offered Sample', value: Objdata[0].OS });
    otherFactors.push({ name: 'Team Friendliness', value: Objdata[0].TF });
    otherFactors.push({ name: 'Menu Variety', value: Objdata[0].MV });
    otherFactors.push({ name: 'Order Accuracy', value: Objdata[0].OA })
}

var WT_StoreCounts = [];
var OA_StoreCounts = [];
var MV_StoreCounts = [];
var OS_StoreCounts = [];
var TF_StoreCounts = [];
function cleanWaitTimeData() {
    var WT_buckets = [{ ID: 1, Min: 0, Max: 30 },
{ ID: 2, Min: 30, Max: 60 },
{ ID: 3, Min: 60, Max: 90 },
{ ID: 4, Min: 90, Max: 120 },
{ ID: 5, Min: 120, Max: 150 },
{ ID: 6, Min: 150, Max: 180 },
{ ID: 7, Min: 180, Max: 210 },
{ ID: 8, Min: 210, Max: 240 },
{ ID: 9, Min: 240, Max: 270 },
{ ID: 10, Min: 270, Max: 300 },
{ ID: 11, Min: 300, Max: 330 },
{ ID: 12, Min: 330, Max: 360 }]
    var OA_buckets =
[{ ID: 1, Min: 0, Max: 10 },
{ ID: 2, Min: 10, Max: 20 },
{ ID: 3, Min: 20, Max: 30 },
{ ID: 4, Min: 30, Max: 40 },
{ ID: 5, Min: 40, Max: 50 },
{ ID: 6, Min: 50, Max: 60 },
{ ID: 7, Min: 60, Max: 70 },
{ ID: 9, Min: 70, Max: 80 },
{ ID: 10, Min: 80, Max: 90 },
{ ID: 11, Min: 90, Max: 100 }]

    var OS_buckets =
   [{ ID: 1, Min: 0, Max: 5 },
   { ID: 2, Min: 5, Max: 10 },
   { ID: 3, Min: 10, Max: 15 },
   { ID: 4, Min: 15, Max: 20 },
   { ID: 5, Min: 20, Max: 25 },
   { ID: 6, Min: 25, Max: 30 },
   { ID: 7, Min: 30, Max: 35 },
   { ID: 9, Min: 35, Max: 40 },
   ]
    tempMin = 0;
    tempMax = 0;
    var Objdata = data.filter(function (obj) {
        return obj.LOC == storeId;
    });
    for (var i = 0; i < WT_buckets.length; i++) {

        tempMin = WT_buckets[i].Min;
        tempMax = WT_buckets[i].Max;


        var filtered = data.filter(isWTInRange);
        var filtered1 = data.filter(isOAInRange);
        var label = tempMin + ' - ' + tempMax
        WT_StoreCounts.push({ label: label, value: filtered.length });

        var wt = Objdata[0].WT;
        if (wt >= tempMin && wt < tempMax) {
            storeWTBucket = label;
        }
    }
    for (var i = 0; i < OA_buckets.length; i++) {
        tempMin = 0;
        tempMax = 0;
        tempMin = OA_buckets[i].Min;
        tempMax = OA_buckets[i].Max;

        var OAfiltered = data.filter(isOAInRange);
        var MVfiltered = data.filter(isMVInRange);
        var TFfiltered = data.filter(isTFInRange);
        var label = tempMin + ' - ' + tempMax


        OA_StoreCounts.push({ label: label, value: OAfiltered.length });
        MV_StoreCounts.push({ label: label, value: MVfiltered.length });
        TF_StoreCounts.push({ label: label, value: TFfiltered.length });

        var oa = Objdata[0].OA * 100;
        if (oa >= tempMin && oa < tempMax) {
            storeOABucket = label;
        }
        var mv = Objdata[0].MV * 100;
        if (mv >= tempMin && mv < tempMax) {
            storeMVBucket = label;
        }
        var tf = Objdata[0].TF * 100;
        if (tf >= tempMin && tf < tempMax) {
            storeTFBucket = label;
        }

    }
    for (var i = 0; i < OS_buckets.length; i++) {
        tempMinOS = 0;
        tempMaxOS = 0;
        tempMinOS = OS_buckets[i].Min;
        tempMaxOS = OS_buckets[i].Max;

        var OSfiltered = data.filter(isOSInRange);
        var label = tempMinOS + ' - ' + tempMaxOS
        OS_StoreCounts.push({ label: label, value: OSfiltered.length });

        var os = Objdata[0].OS * 100;
        if (os >= tempMinOS && os < tempMaxOS) {
            storeOSBucket = label;
        }
    }


}
function isWTInRange(obj) {
    return obj.WT >= tempMin && obj.WT < tempMax;
}
function isOAInRange(obj) {
    return obj.OA * 100 >= tempMin && obj.OA * 100 < tempMax;
}
function isMVInRange(obj) {
    return obj.MV * 100 >= tempMin && obj.MV * 100 < tempMax;
}
function isTFInRange(obj) {
    return obj.TF * 100 >= tempMin && obj.TF * 100 < tempMax;
}
function isOSInRange(obj) {
    return obj.OS * 100 >= tempMinOS && obj.OS * 100 < tempMaxOS;
}
function laodSliders() {
    storeId = $("#storeSelector2").val();
    var resultData = data.filter(getValues);
    setRangeSliders(storeId);
    $("#key1").removeClass("highlight");
    $("#key2").removeClass("highlight");
    $("#key3").removeClass("highlight");
    $("#key4").removeClass("highlight");
    $("#key5").removeClass("highlight");

    $("#key" + resultData[0].Act_1).addClass("highlight");
    $("#key" + resultData[0].Act_2).addClass("highlight");
}
function buildChartForStore() {

    storeId = $("#storeSelector").val();
    var resultData = data.filter(getValues);

    $("#cvFreq").html(parseFloat(resultData[0].CVF).toFixed(2))
    $("#wTime").html(parseFloat(resultData[0].WT).toFixed(2))
    $("#oAccuracy").html(parseFloat(resultData[0].OA).toFixed(2))
    $("#mVariety").html(parseFloat(resultData[0].MV).toFixed(2))
    $("#tFriendliness").html(parseFloat(resultData[0].TF).toFixed(2))
    $("#offeredSample").html(parseFloat(resultData[0].OS).toFixed(2))

    targetsArr.WT = parseFloat(resultData[0].WT).toFixed(2);
    targetsArr.MV = parseFloat(resultData[0].MV).toFixed(2);
    targetsArr.TF = parseFloat(resultData[0].TF).toFixed(2);
    targetsArr.OS = parseFloat(resultData[0].OS).toFixed(2);
    targetsArr.OA = parseFloat(resultData[0].OA).toFixed(2);

    // $("targetCVF").html(targetsArr.WT);
    //$("#targetOA").html(targetsArr.OA);
    //$("#targetMV").html(targetsArr.MV);
    //$("#targetTF").html(targetsArr.TF);
    //$("#targetOS").html(targetsArr.OS);



    loadCustVisitFrequecyGuage(storeId);
    getCVFStoreCnt(storeId);
    loadCustVisitFrequecyByStore();
    loadCustVisitFrequecyByStore1();
    loadCustVisitFrequecyByStore2();
    loadCustVisitFrequecyByStore3();
    loadCustVisitFrequecyByStore4();
    loadCustVisitFrequecyByStore5();
    loadCustVisitFrequecyByStore6();
    loadCustVisitFrequecyByStore7();
    loadWaitingGauge(storeId);
    getOtherFactorsData(storeId);
    loadOtherFactorsData();

}
function loadKeyFactorsGauges() {
    var sId = $("#storeSelector1").val();
    storeId = sId;
    cleanWaitTimeData()
    loadOrderAccuracyGauge(sId)

    loadteamfGauge(sId)
    loadMenuVarietyGauge(sId)
    loadOrderSampleGauge(sId)
    loadWaitingGauge(sId)
    loadContainer2(sId)

}

function getValues(obj) {
    return obj.LOC == storeId;
}
cleanWaitTimeData();
getCVFStoreCnt(storeId);


function loadCustVisitFrequecyGuage(storeId) {
    $('#custVisitFreqContainer').dxCircularGauge({
        //geometry: {
        //    startAngle: 0,
        //    endAngle: 360
        //},
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
                },
                font: { size: 10, weight: 100, color: 'white' }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'white'
        },
        rangeContainer: {
            width: 4,
            ranges: [
                { startValue: 0, endValue: 100, color: '#FFF' }]
            //    { startValue: 40, endValue: 70, color: '#FFD700' },
            //    { startValue: 70, endValue: 100, color: '#228B22' }
            //]
        },
        title: {
            text: 'NPS: 84.1%',
            horizontalAlignment: 'center',
            verticalAlignment: 'bottom',
            font: {
                size: 30,
                color: '#CFB53B',
                weight: 'bold'
            }

        },
        theme: 'generic.dark',
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: '#CFB53B',
            format: 'percent'
        }
    });
}
function loadCustVisitFrequecyByStore(dataSource,type) {

    var dataSource = dataSource;
    if (type == 'q'){
        var argmntField = "month";
        var minV=50000
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
            title: 'Net Promoter Score',
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
    function loadCustVisitFrequecyByStore1(dataSource, type) {

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
                text: "Wait Time by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer1").dxChart(chartOptions).dxChart("instance");
    }

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore2(dataSource, type) {

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
                text: "Wait Time by Day-Part", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer2").dxChart(chartOptions).dxChart("instance");
    }

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore3(dataSource, type) {

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
                text: "Drink Quality by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer3").dxChart(chartOptions).dxChart("instance");
    }

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore4(dataSource, type) {

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
                text: "Food Quality by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer4").dxChart(chartOptions).dxChart("instance");
    }

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore5(dataSource, type) {

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
                text: "Service Quality by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer5").dxChart(chartOptions).dxChart("instance");
    }


//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore6(dataSource, type) {

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
                text: "Cleanliness Rating by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer6").dxChart(chartOptions).dxChart("instance");
    }

//----------------------------------------------------------------------------wait-time-graph--------------------------------------------------------------------------------
    function loadCustVisitFrequecyByStore7(dataSource, type) {

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
                text: "External Appearance Rating by Day", font: {
                    size: 30,
                    color: '#355066',
                    weight: 'bold'
                }
            },
            valueAxis: {
                min: minV,
                max: maxV,
                title: 'Net Promoter Score',
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
        var chart = $("#freqByStoreContainer7").dxChart(chartOptions).dxChart("instance");
    }
function loadContainer2(storeId) {
    var CRT_Data = [{ Name: 'Insurance Claim Discrepency', Days: 5 },
                            { Name: 'Delivery issues', Days: 2 },
                            { Name: 'Prescription Refill issues', Days: 3 },
                            { Name: 'Billing issues', Days: 1 },
                            { Name: 'other', Days: 2.5 }
    ];

    $("#container2").dxChart({

        dataSource: CRT_Data,
        series: {
            argumentField: "Name",
            valueField: "Days",
            type: "bar",
            color: '#355066',
            name: 'Resolution Days'

        },
        rotated: true,
        //title: {
        //    text: 'Complaint Resolution Times By Type',
        //    font: { size: 28 }
        //},
        title: {
            text: "Complaint Resolution Times By Type", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        tooltip: {
            enabled: true,
            font: {
                color: 'black',
                opacity: 1
            }
        },
        //customizePoint: function (obj) {
        //        if (obj.argument == storeWTBucket)
        //            return { color: 'darkorange' }
        //        else
        //            return { color: '#355066' }
        //    },
        //    customizeLabel: function(obj) {
        //    if (obj.argument == storeWTBucket) {
        //        return {
        //            visible: true,
        //            backgroundColor: 'darkorange',
        //            customizeText: function () {
        //                return 'Curr. Store'
        //            }
        //        }
        //    }
        //},
        legend: {
            visible: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center'
        }
    }).dxChart("instance");
    $("#orderAccuracyByStore").dxChart({
        dataSource: OA_StoreCounts,
        series: {
            argumentField: "label",
            valueField: "value",
            type: "bar",
            color: '#355066'
        },
        title: {
            text: 'Delivery Accuracy',
            font: { size: 28 }
        },
        tooltip: {
            enabled: true,
            font: {
                color: 'black',
                opacity: 1
            }
        },
        customizePoint: function (obj) {
            if (obj.argument == storeOABucket)
                return { color: 'darkorange' }
            else
                return { color: '#355066' }
        },
        customizeLabel: function (obj) {
            if (obj.argument == storeOABucket) {
                return {
                    visible: true,
                    backgroundColor: 'darkorange',
                    customizeText: function () {
                        return 'Curr. Store'
                    }
                }
            }
        },
        legend: { visible: false }
    });
    $("#osByStore").dxChart({
        dataSource: OS_StoreCounts,
        series: {
            argumentField: "label",
            valueField: "value",
            type: "bar",
            color: '#355066'
        },
        title: {
            text: 'Store Count By Offered Sample',
            font: { size: 28 }
        },
        tooltip: {
            enabled: true,
            font: {
                color: 'black',
                opacity: 1
            }
        },
        customizePoint: function (obj) {
            if (obj.argument == storeOSBucket)
                return { color: 'darkorange' }
            else
                return { color: '#355066' }
        },
        customizeLabel: function (obj) {
            if (obj.argument == storeOSBucket) {
                return {
                    visible: true,
                    backgroundColor: 'darkorange',
                    customizeText: function () {
                        return 'Curr. Store'
                    }
                }
            }
        },
        legend: { visible: false }
    });
    $("#tfByStore").dxChart({
        dataSource: TF_StoreCounts,
        series: {
            argumentField: "label",
            valueField: "value",
            type: "bar",
            color: '#355066'
        },
        title: {
            text: 'Store Count By Team Friendliness',
            font: { size: 28 }
        },
        tooltip: {
            enabled: true,
            font: {
                color: 'black',
                opacity: 1
            }
        },
        customizePoint: function (obj) {
            if (obj.argument == storeTFBucket)
                return { color: 'darkorange' }
            else
                return { color: '#355066' }
        },
        customizeLabel: function (obj) {
            if (obj.argument == storeTFBucket) {
                return {
                    visible: true,
                    backgroundColor: 'darkorange',
                    customizeText: function () {
                        return 'Curr. Store'
                    }
                }
            }
        },
        legend: { visible: false }
    });
    $("#mvByStore").dxChart({
        dataSource: MV_StoreCounts,
        series: {
            argumentField: "label",
            valueField: "value",
            type: "bar",
            color: '#355066'
        },
        title: {
            text: 'Customer Rep Experience',
            font: { size: 28 }
        },
        tooltip: {
            enabled: true,
            font: {
                color: 'black',
                opacity: 1
            }
        },
        customizePoint: function (obj) {
            if (obj.argument == storeMVBucket)
                return { color: 'darkorange' }
            else
                return { color: '#355066' }
        },
        customizeLabel: function (obj) {
            if (obj.argument == storeMVBucket) {
                return {
                    visible: true,
                    backgroundColor: 'darkorange',
                    customizeText: function () {
                        return 'Curr. Store'
                    }
                }
            }
        },
        legend: { visible: false }
    });
}
function loadWaitingGauge(storeId) {
    var dataSource = [{
        ComplaintType: "Insurance Claim Discrepency",
        area: 34
    }, {
        ComplaintType: "Delivery Issues",
        area: 22
    }, {
        ComplaintType: "Presciption Refill Issues",
        area: 15
    }, {
        ComplaintType: "Billing Issues",
        area: 9
    }, {
        ComplaintType: "Other",
        area: 20
    }];

    $("#waitingTimeContainer").dxPieChart({

        dataSource: dataSource,
        series: [
            {
                argumentField: "ComplaintType",
                valueField: "area",
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1
                    },
                    customizeText: function (arg) {
                        return arg.percentText;
                    }
                }
            }
        ],
        //title: "Area of Countries",
        title: {
            text: "Complaints By Type", font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            var point = e.target;

            toggleVisibility(point);
        },
        legend: {
            horizontalAlignment: 'right',
            verticalAlignment: 'middle'
        },
        onLegendClick: function (e) {
            var arg = e.target;

            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        }
    });
}
function toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
}

function loadOtherFactorsData() {
    $('#factorsContainer').dxChart({
        rotated: true,
        dataSource: otherFactors,
        series: {
            argumentField: "name",
            valueField: "value",
            name: "Factors",
            type: "bar",
            color: '#4169e1'
        },
        title: {
            text: 'Other Key Factors',
            font: { size: 28 }
        },
        valueAxis: {
            label: {
                format: 'percentage'

            }
        },
        tooltip: {
            enabled: true,
            format: 'percentage',
            font: {
                color: 'black',
                opacity: 1
            }
        },
        legend: { visible: false }
    });
}
var target_wt = '';
var target_oa = '';
var target_mv = '';
var target_tf = '';
var target_os = '';
function setRangeSliders(sId) {
    var Objdata = data.filter(function (obj) {
        return obj.LOC == sId;
    });
    var waitTime = 2.5;
    var teamF = Objdata[0].TF;
    var menuV = 0.684;
    var OrderA = 0.937;
    var OrderS = Objdata[0].OS;
    var CustVF = Objdata[0].CVF;
    var rrg = Objdata[0].RRG; //ratio of regular customers


    var nwt = waitTime;
    var ntf = teamF;
    var newmv = menuV;
    var newoa = OrderA;
    var newos = OrderS;
    var newcvf = CustVF;


    //------------------------------------------------------------------dx-slider-1-------------------------------------------------------------------------------------------
    hdnMV = $("#serviceQuality").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(menuV * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            menuV = data.value / 100;
            target_mv = menuV * 100;

            hdnMV.option("value", parseFloat(menuV * 100).toFixed(1))
            //var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;

            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");
            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");

    //------------------------------------------------------------------dx-slider-2-------------------------------------------------------------------------------------------
    hdnMV = $("#promotions").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(menuV * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            menuV = data.value / 100;
            target_mv = menuV * 100;

            hdnMV.option("value", parseFloat(menuV * 100).toFixed(1))
            //var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;

            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");
            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");

    //------------------------------------------------------------------dx-slider-3-------------------------------------------------------------------------------------------
    hdnMV = $("#cleanliness").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(menuV * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            menuV = data.value / 100;
            target_mv = menuV * 100;

            hdnMV.option("value", parseFloat(menuV * 100).toFixed(1))
            //var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;

            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");
            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");

    //------------------------------------------------------------------dx-slider-4-------------------------------------------------------------------------------------------
    hdnMV = $("#extApperance").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(menuV * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            menuV = data.value / 100;
            target_mv = menuV * 100;

            hdnMV.option("value", parseFloat(menuV * 100).toFixed(1))
            //var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;

            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");
            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");


    //------------------------------------------------------------------dx-slider-------------------------------------------------------------------------------------------

    hdnWT = $("#waitTime").dxSlider({
        min: 0,
        max: 10,
        step: 0.1,
        value: waitTime,//parseFloat(data.filter( function(obj){ return obj.LOC==storeId })[0].WT/100).toFixed(0),
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
            target_wt = waitTime;


            hdnWT.option("value", waitTime);

            //1.31266 -  0.45*(Complaint Resolution Time) + 0.34*(Delivery Accuracy) + 0.49*(Rep Satisfaction).
            //var predictedDV= ((nwt-waitTime)*(-0.0106))+((ntf-teamF) * 0.9489)+((newmv-menuV) * 1.0030)+((newoa - OrderA) * 1.6089)+((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            //hdnSales.option("value",liftInSales);
            //hdnSales.option("subvalues",liftInSales);
            $("#liftInSales").html("+" + LiftInDV + "%");
        }
    }).dxSlider("instance");
    $("#teamFriendliness").dxSlider({
        min: 0,
        max: 100,
        step: 5,
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].TF * 100).toFixed(2),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            ntf = data.value / 100;
            target_tf = ntf;

            var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF
            console.log("predictedDV :" + predictedDV + " CustVF :" + CustVF);
            var LiftInDV = predictedDV - CustVF;
            console.log("LiftInDV :" + LiftInDV);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            //console.log("liftInSales :" +liftInSales);
            //hdnSales.option("value",liftInSales);
            //hdnSales.option("subvalues",liftInSales);
            $("#liftInSales").html("+" + liftInSales + "%");
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");
    hdnMV = $("#menuVariety").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(menuV * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            menuV = data.value / 100;
            target_mv = menuV * 100;

            hdnMV.option("value", parseFloat(menuV * 100).toFixed(1))
            //var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;

            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");
            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }

    }).dxSlider("instance");
    hdnOA = $("#orderAccuracy").dxSlider({
        min: 0,
        max: 100,
        step: 1,
        value: parseFloat(OrderA * 100).toFixed(1),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            OrderA = data.value / 100;
            target_oa = OrderA * 100;

            hdnOA.option("value", parseFloat(OrderA * 100).toFixed(1))
            //var predictedDV = ((nwt-waitTime)*(-0.0106))+((ntf-teamF) * 0.9489)+((newmv-menuV) * 1.0030)+((newoa - OrderA) * 1.6089)+((newos - OrderS) * 0.6488) + CustVF
            //var predictedDV = 1.31266 - (0.45 * (waitTime)) + (0.34 * (OrderA)) + (0.49 * (menuV));
            var predictedDV = (0.61266 - 0.17 * (waitTime) + 0.34 * (OrderA) + 0.49 * (menuV)) * 100;
            var LiftInDV = parseFloat(predictedDV - 84.1).toFixed(1);
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + LiftInDV + "%");

            // hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }
    }).dxSlider("instance");
    $("#orderSample").dxSlider({
        min: 0,
        max: 100,
        step: 5,
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].OS * 100).toFixed(2),
        tooltip: {
            enabled: true,
            format: function (value) {
                return value + "%";
            },
            //format:'percentage',
            showMode: "always",
            position: "bottom"
        },
        label: {
            visible: true,
            format: function (value) {
                return value + "%";
            },
            position: "top"
        },
        onValueChanged: function (data) {
            newos = data.value / 100;
            target_os = newos;

            var predictedDV = ((nwt - waitTime) * (-0.0106)) + ((ntf - teamF) * 0.9489) + ((newmv - menuV) * 1.0030) + ((newoa - OrderA) * 1.6089) + ((newos - OrderS) * 0.6488) + CustVF;

            var LiftInDV = predictedDV - CustVF;
            var liftInSales = parseFloat((LiftInDV / CustVF) * rrg * 100).toFixed(1);
            $("#liftInSales").html("+" + liftInSales + "%");
            //hdnSales.option("value",liftInSales);
            // hdnSales.option("subvalues",liftInSales);
            hdnfinalCustVisitFreq.option("value", predictedDV);
            hdnfinalCustVisitFreq.option("subvalues", predictedDV);
        }
    }).dxSlider("instance");
}

//----------------------------------------------------loadFinalCustVisitFrequecyGuage----------------------------------------------------------
function loadFinalCustVisitFrequecyGuage(storeId) {



    hdnfinalCustVisitFreq = $('#finalCustVisitFreq').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}

//----------------------------------------------------loadwaittimemeterGuage----------------------------------------------------------

function loadwaittimemeterGuage(storeId) {
    hdnwaittimemeter = $('#waittimemeter').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}

//----------------------------------------------------loaddrinkqualityGuage----------------------------------------------------------
function loaddrinkqualityGuage(storeId) {
    hdnwaittimemeter = $('#drinkquality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadfoodqualityGuage----------------------------------------------------------
function loadfoodqualityGuage(storeId) {
    hdnwaittimemeter = $('#foodquality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadservicequalityGuage----------------------------------------------------------
function loadservicequalityGauge(storeId) {
    hdnwaittimemeter = $('#servicequality').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}


//----------------------------------------------------loadcleanlinessGuage----------------------------------------------------------
function loadpromo1Gauge(storeId) {
    hdnwaittimemeter = $('#promo1').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}

//----------------------------------------------------loadcleanlinessGuage----------------------------------------------------------
function loadclean_li_nessGauge(storeId) {
    hdnwaittimemeter = $('#clean_li_ness').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}

//----------------------------------------------------external appearance----------------------------------------------------------
function loadexternal_appearanceGauge(storeId) {
    hdnexternalappearance = $('#external_appearance1').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + '%';
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
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            //text: 'Predicted NPS',
            //font: { size: 28 }
        },
        value: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalues: data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].CVF * 25,
        subvalueIndicator: {
            type: 'textCloud',
            color: 'royalblue'
        }
    }).dxCircularGauge("instance");
}


loadCustVisitFrequecyGuage(storeId);
loadCustVisitFrequecyByStore(storeId);
loadFinalCustVisitFrequecyGuage(storeId);
loadWaitingGauge(storeId);
getOtherFactorsData(storeId)
loadOtherFactorsData();
setRangeSliders(storeId)

function initMap() {
    var myLatLng = { lat: 39.596401, lng: -104.840012 };
    //39.608116, -104.891127
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        //title: 'Hello World!'
    });
}
function loadOrderAccuracyGauge(storeId) {

    $('#waitingTimeContainer1').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 10,
            tickInterval: 2,
            label: {
                customizeText: function (arg) {
                    return arg.valueText;
                },
                font: { size: 12, weight: 200, color: 'black' }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 5,
            ranges: [
                { startValue: 0, endValue: 3, color: '#228B22' },
                { startValue: 3, endValue: 6, color: '#FFD700' },
                { startValue: 6, endValue: 10, color: '#CE2029' }
            ]
        },
        title: {
            text: '2.5 Days',
            horizontalAlignment: 'center',
            verticalAlignment: 'bottom',
            font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }

        },
        value: 2.5
        //subvalues: parseFloat(data.filter( function(obj){
        //return obj.LOC==storeId
        //})[0].OA*100).toFixed(2),
        //subvalueIndicator: {
        //    type: 'textCloud',
        //    color: '#f05b41'
        //}
    });
    $('#orderAccuracyGauge').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + "%";
                },
                font: { size: 12, weight: 200, color: 'black' }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 5,
            ranges: [
                { startValue: 0, endValue: 100, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            text: '93.7 %',
            horizontalAlignment: 'center',
            verticalAlignment: 'bottom',
            font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }

        },
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].OA * 100).toFixed(2)
        //subvalues: parseFloat(data.filter( function(obj){
        //return obj.LOC==storeId
        //})[0].OA*100).toFixed(2),
        //subvalueIndicator: {
        //    type: 'textCloud',
        //    color: '#f05b41'
        //}
    });
}
function loadMenuVarietyGauge(storeId) {
    $('#menuVarietyGauge').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 20,
            label: {
                customizeText: function (arg) {
                    return arg.valueText + "%";
                },
                font: { size: 12, weight: 200, color: 'black' }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 5,
            ranges: [
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        title: {
            text: '68.4 %',
            horizontalAlignment: 'center',
            verticalAlignment: 'bottom',
            font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }

        },
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].MV * 100).toFixed(2),
        //subvalues: parseFloat(data.filter( function(obj){
        //return obj.LOC==storeId
        //})[0].MV*100).toFixed(2),
        //subvalueIndicator: {
        //    type: 'textCloud',
        //    color: '#f05b41'
        //}
    });
}
function loadteamfGauge(storeId) {
    $('#teamFriendlinessGauge').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 10,
            label: {
                //            customizeText: function (arg) {
                //                return arg.valueText;
                //            },
                font: { size: 18, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 7,
            ranges: [
                { startValue: 0, endValue: 30, color: '#CE2029' },
                { startValue: 30, endValue: 60, color: '#FFD700' },
                { startValue: 60, endValue: 100, color: '#228B22' }
            ]
        },
        //    title: {
        //        text: 'Team Friendliness',
        //        font: { size: 28 }
        //    },
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].TF * 100).toFixed(2),
        subvalues: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].TF * 100).toFixed(2),
        subvalueIndicator: {
            type: 'textCloud',
            color: '#f05b41'
        }
    });
}
function loadOrderSampleGauge(storeId) {
    $('#offeredSampleGauge').dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 40,
            tickInterval: 5,
            label: {
                //            customizeText: function (arg) {
                //                return arg.valueText;
                //            },
                font: { size: 18, weight: 700 }
            }
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: 'black'
        },
        rangeContainer: {
            width: 7,
            ranges: [
                { startValue: 0, endValue: 10, color: '#CE2029' },
                { startValue: 10, endValue: 20, color: '#FFD700' },
                { startValue: 20, endValue: 40, color: '#228B22' }
            ]
        },

        //    title: {
        //        text: 'Offered Sample',
        //        font: { size: 28 , weight:600, color:'yellow'},
        //    },
        value: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].OS * 100).toFixed(2),
        subvalues: parseFloat(data.filter(function (obj) {
            return obj.LOC == storeId
        })[0].OS * 100).toFixed(2),
        subvalueIndicator: {
            type: 'textCloud',
            color: '#f05b41'
        }
    });
}
function lockTargets() {

    if (target_wt != '')
        targetsArr.WT = target_wt;
    if (target_mv != '')
        targetsArr.MV = target_mv;
    if (target_tf != '')
        targetsArr.TF = target_tf;
    if (target_os != '')
        targetsArr.OS = target_os;
    if (target_oa != '')
        targetsArr.OA = target_oa;
    alert("Targets Locked!")
    $("#targetWT").html(parseFloat(target_wt).toFixed(1) + " Days");
    $("#targetOA").html(parseFloat(target_oa).toFixed(1) + "%");
    $("#targetMV").html(parseFloat(target_mv).toFixed(1) + "%");
    $("#targetTF").html(parseFloat(target_mv).toFixed(1) + "%");
    $("#targetOS").html(parseFloat(targetsArr.OS).toFixed(1) * 100 + "%");
    $("#targetCVF").html(parseFloat(hdnfinalCustVisitFreq.option('value')).toFixed(1) + '%');
}

function showGraph(id) {
    $(".contentDiv").removeClass("shadow");
    if (id == 'container2') {
        document.getElementById("orderAccuracyByStore").style.display = "none";
        document.getElementById("tfByStore").style.display = "none";
        document.getElementById("mvByStore").style.display = "none";
        document.getElementById("osByStore").style.display = "none";
        document.getElementById("container2").style.display = "block";
        $(".tab3div1").addClass("shadow");
        $(".tab3div6").addClass("shadow");

    }
    if (id == 'orderAccuracyByStore') {
        document.getElementById("orderAccuracyByStore").style.display = "block";
        document.getElementById("tfByStore").style.display = "none";
        document.getElementById("mvByStore").style.display = "none";
        document.getElementById("osByStore").style.display = "none";
        document.getElementById("container2").style.display = "none";
        $(".tab3div2").addClass("shadow");
        $(".tab3div6").addClass("shadow");
    }
    if (id == 'tfByStore') {
        document.getElementById("orderAccuracyByStore").style.display = "none";
        document.getElementById("tfByStore").style.display = "block";
        document.getElementById("mvByStore").style.display = "none";
        document.getElementById("osByStore").style.display = "none";
        document.getElementById("container2").style.display = "none";
        $(".tab3div3").addClass("shadow");
        $(".tab3div6").addClass("shadow");
    }
    if (id == 'mvByStore') {
        document.getElementById("orderAccuracyByStore").style.display = "none";
        document.getElementById("tfByStore").style.display = "none";
        document.getElementById("mvByStore").style.display = "block";
        document.getElementById("osByStore").style.display = "none";
        document.getElementById("container2").style.display = "none";
        $(".tab3div4").addClass("shadow");
        $(".tab3div6").addClass("shadow");
    }
    if (id == 'osByStore') {
        document.getElementById("orderAccuracyByStore").style.display = "none";
        document.getElementById("tfByStore").style.display = "none";
        document.getElementById("mvByStore").style.display = "none";
        document.getElementById("osByStore").style.display = "block";
        document.getElementById("container2").style.display = "none";
        $(".tab3div5").addClass("shadow");
        $(".tab3div6").addClass("shadow");
    }

    if (id == 'firstContainer') {
        document.getElementById("firstContainer").style.display = "block";
        document.getElementById("secondContainer").style.display = "none";
        document.getElementById("thirdContainer").style.display = "none";

        //$(".tab3div5").addClass("shadow");
        //$(".tab3div6").addClass("shadow");
    }
    if (id == 'secondContainer') {
        document.getElementById("firstContainer").style.display = "none";
        document.getElementById("secondContainer").style.display = "block";
        document.getElementById("thirdContainer").style.display = "none";

        //$(".tab3div5").addClass("shadow");
        //$(".tab3div6").addClass("shadow");
    }
    if (id == 'thirdContainer') {
        document.getElementById("firstContainer").style.display = "none";
        document.getElementById("secondContainer").style.display = "none";
        document.getElementById("thirdContainer").style.display = "block";

        //$(".tab3div5").addClass("shadow");
        //$(".tab3div6").addClass("shadow");
    }
}
var options = {
    scale: {
        startValue: 0, endValue: 20,
        tickInterval: 5,
        label: {
            customizeText: function (arg) {
                return arg.valueText + ' %';
            }
        }
    }
};
hdnSales = $("#salesGauge").dxLinearGauge($.extend(true, {}, options, {
    value: 0,
    subvalues: [0],
    subvalueIndicator: {
        type: 'textCloud',
        text: {
            // format: 'percent',
            // precision: 1,

            customizeText: function (arg) {
                if (arg.valueText != 0) {
                    return arg.valueText + ' %';
                }
                else
                    return '';
            }
        },
        color: '#734F96',
    },
    geometry: {
        orientation: 'vertical'
    },
    title: {
        text: 'Lift In Sales (%)',
        font: {
            size: 24
        },
    },
    rangeContainer: { backgroundColor: '#CACACA' },
    valueIndicator: { type: 'circle', color: '#E3A857' },
})).dxLinearGauge("instance");

function loadExperienceGraphByStage() {
    var dataSource = [{
        stage: 'PRESCRIPTION',
        rating: 81.4,
    }, {
        stage: 'CONFIRMATION',
        rating: 79.1,
    }, {
        stage: 'PAYMENT',
        rating: 82.5,

    }, {
        stage: 'DELIVERY',
        rating: 81.8,

    }, {
        stage: 'COMPLAINT',
        rating: 83.6,

    }, {
        stage: 'USE OF PRO',
        rating: 84.4,

    }, {
        stage: 'PRESCRIPTION.',
        rating: 84.1,

    }];

    var chartOptions = {
        dataSource: dataSource,
        commonSeriesSettings: {
            type: 'line',
            argumentField: "stage"
        },
        commonAxisSettings: {
            grid: {
                visible: false
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "rating", name: "rating" },

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
            enabled: false
        },
        title: {
            font: {
                size: 30,
                color: '#355066',
                weight: 'bold'
            }
        },
        valueAxis: {
            min: 76,
            max: 86,

            label: {
                customizeText: function (arg) {
                    return '';
                }
            }
        },
        argumentAxis: {
            label: {
                customizeText: function (arg) {
                    return '';
                }
            }
        }

    };
    var chart = $("#experienceGraph").dxChart(chartOptions).dxChart("instance");

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
    $('#cleanlin_ess').css('display', 'none');
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



