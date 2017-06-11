
$.getJSON("https://freegeoip.net/json/", function(data) {
    var country_code = data.country_code;
    var region = data.region_code
    var city = data.city
    var zip_code = data.zip_code
    var metro_code = data.metro_code
    var lat = data.latitude
    var long = data.longitude

    userLocation = {
        "country" : country_code,
        "region"  : region,
        "city" : city,
        "zipcode" : zip_code,
        "metrocode": metro_code,
        "lat" : lat,
        "long": long
    };

    changeLocationDefault.init(data)
});



var changeLocationDefault = {
    init : function(){
        if(userLocation["country"] === "US"){
            $("#getUserRegion").text(userLocation["region"])
            $("#getUserCity").text(userLocation["city"])
            $("#getUserZipcode").text(userLocation["zipcode"])
        }else{

        }        
    }
}