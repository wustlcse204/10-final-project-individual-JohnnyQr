UV_baseUrl = 'https://api.openuv.io/api/v1/uv'
zip_baseUrl = 'https://redline-redline-zipcode.p.rapidapi.com/rest/multi-info.json'

function testUV(){
    var latitude = document.getElementById('lat');
    var longitude = document.getElementById('lng');
    var lati = latitude.value;
    var lngi = longitude.value;

    if (lati == ''|| lngi == ''){
        
        var zipCode = document.getElementById('zip');
        var zip = zipCode.value;

        if(zip == ''){
            alert('Fields cannot be blank');
            return;
        }

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var locationInfo = JSON.parse(this.responseText);
                console.log(locationInfo);

                lati = locationInfo[zip].lat;
                lngi = locationInfo[zip].lng;

                console.log(lati);

                var city = document.getElementById('city');
                var name = document.createElement('p');
                var latInfo = document.createElement('p');
                var lngInfo = document.createElement('p');

                name.innerHTML = 'City: ' + locationInfo[zip].city;
                latInfo.innerHTML = 'Latitude: ' + lati;
                lngInfo.innerHTML = 'Longitude: ' + lngi;

                city.appendChild(name);
                city.appendChild(latInfo);
                city.appendChild(lngInfo);



            }
        }

        zip_newUrl = zip_baseUrl + '/' + zip + '/degrees';
        xhttp.open("GET", zip_newUrl, true);
        xhttp.setRequestHeader("x-rapidapi-host", "redline-redline-zipcode.p.rapidapi.com");
        xhttp.setRequestHeader("x-rapidapi-key", "00dc5c0888mshaaa59cc3f35462dp1e58a5jsn7e51c3272842");
        xhttp.send();
    } else {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var UVInfo = JSON.parse(this.responseText);
                console.log(UVInfo);

                var result = document.getElementById('result');
                result.innerHTML = '';
                var uv = document.createElement('p');
                var maxUV = document.createElement('p');
                var sunrise = document.createElement('p');
                var sunset = document.createElement('p');
                var ok = document.createElement('button');
                ok.setAttribute("id", "ok");
                ok.innerHTML = 'Acknowledged';


                var sunriseTime = String(UVInfo.result.sun_info.sun_times.sunrise);
                var NewSunriseTime = sunriseTime.replace('T', '  ');
                NewSunriseTime = NewSunriseTime.replace('Z', ' ');

                var sunsetTime = String(UVInfo.result.sun_info.sun_times.sunset);
                var NewSunsetTime = sunsetTime.replace('T', '  ');
                NewSunsetTime = NewSunsetTime.replace('Z', ' ');


                uv.innerHTML = 'UV level: ' + UVInfo.result.uv;
                maxUV.innerHTML = 'Max UV tody: ' + UVInfo.result.uv_max;
                sunrise.innerHTML = 'Sunrise time: ' + NewSunriseTime;
                sunset.innerHTML = 'Sunset time: ' + NewSunsetTime;

                result.appendChild(uv);
                result.appendChild(maxUV);
                result.appendChild(sunrise);
                result.appendChild(sunset);
                result.appendChild(ok);

                latitude.value = '';
                longitude.value = '';
                
                document.getElementById("ok").addEventListener("click", reset, false);

            }
        }

        var UV_newUrl = UV_baseUrl + '?lat=' + lati + '&' + 'lng=' + lngi;
        xhttp.open("GET", UV_newUrl, true);
        xhttp.setRequestHeader("x-access-token", "f9300f4a53fa53db6d3a193b503bb2cc");
        xhttp.send();

    }
}

function reset(){
    var result = document.getElementById('result');
    result.innerHTML = '';

}


document.getElementById("btn").addEventListener("click", testUV, false);
