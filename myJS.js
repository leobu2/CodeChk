
var region_name; //"Taipei City"
var country_name;//"Taiwan"
var latitude;//25.0478 (緯度)
var longitude;	//121.5318 (經度)
var ip;//192.168.1.1

function getPosition(){}//KEEP THIS FUNCTION FOR HTML PAGE USE

function detectBrowser(){
    var isIE = navigator.userAgent.search("MSIE") > -1;
    var isIE7 = navigator.userAgent.search("MSIE 7") > -1;
    var isFirefox = navigator.userAgent.search("Firefox") > -1;
    var isOpera = navigator.userAgent.search("Opera") > -1;
    var isSafari = navigator.userAgent.search("Safari") > -1;//Google瀏覽器是用這核心
    
    if (isIE7) {
        browser = 'IE7';
    }
    if (isIE) {
        browser = 'IE';
    }
    if (isFirefox) {
        browser = 'Firefox';
    }
    if (isOpera) {
        browser = 'Opera';
    }
    if (isSafari) {
        browser = 'Safari/Chrome';
    }
    return browser;
}


function myFunInput(UserEnter,title){
		
	appUrl = "https://script.google.com/macros/s/AKfycbxzZTtlQrGpENBGfgF50cwMwq3jgf67XBsFmNz5jQTSn8TTw15V/exec";
	var Today = new Date();
	
	$.getJSON("https://ip-api.io/json/",	
    		function(result) {
			console.log(result);
			region_name = result.region_name;		
			country_name = result.country_name;
			latitude = result.latitude;
			longitude = result.longitude;
			ip = result.ip;
			var data = [[Today,title,UserEnter.toUpperCase(),region_name,country_name,latitude,longitude,ip]];
			var parameter = {
				url: "https://docs.google.com/spreadsheets/d/1trX7v1VnJi15k_oRFX4s2fCjVDKUqHCH3mXw5WnSv-A/edit?usp=sharing",
				name: "工作表1",
				data: data.toString(),
				row: data.length,
				column: data[0].length,
				insertType:"bottom",
			};
			$.get(appUrl, parameter);
    	});	
 detectBrowser();
}
