
var region_name; //"Taipei City"
var country_name;//"Taiwan"
var latitude;//25.0478 (緯度)
var longitude;	//121.5318 (經度)
var ip;//192.168.1.1
var UserName;
var UserID;
var UserFlag = 0;
var isUserCorrect;

 
function getPosition(){//新增內容for cookie testing-2018.09.10 17:15

	UserID = Cookies.get('UserID');
	UserName = Cookies.get('UserName');
	isUserCorrect = confirm('請問工號以及姓名是否正確?\n\nS' + UserID + '\n' + UserName);
	if(isUserCorrect){
		alert('歡迎使用!\n' + UserID+ '\n' + UserName);
	}else{
		Cookies.remove('UserID');
		Cookies.remove('UserName');
	}
	
	if(Cookies.get('UserID')== null){
		UserID = prompt('===使用者認證===\n\n請輸入工號(不需英文)');
		Cookies.set('UserID', UserID, {expires: 888});
		UserFlag = 1;
	}else{
		UserID = Cookies.get('UserID');
	}
	
	if(Cookies.get('UserName')== null){
		UserName = prompt('===使用者認證===\n\n請輸入中文全名');
		Cookies.set('UserName', UserName, {expires: 888});		
		UserFlag = 1;
	}else{
		UserName = Cookies.get('UserName');
	}
	
	if (UserFlag == 1 ){
	alert('===歡迎使用===\n ' + "S" + UserID + '\n' + UserName);
	}
			
	

}//KEEP THIS FUNCTION FOR HTML PAGE USE



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
			var data = [[Today,title,UserEnter.toUpperCase(),region_name,country_name,latitude,longitude,ip,UserID,UserName]];
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
