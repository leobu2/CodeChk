
var region_name; //"Taipei City"
var country_name;//"Taiwan"
var latitude;//25.0478 (緯度)
var longitude;	//121.5318 (經度)
var ip;//192.168.1.1

function getPosition(){}//KEEP THIS FUNCTION FOR HTML PAGE USE

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
}
