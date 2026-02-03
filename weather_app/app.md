#call
http://api.weatherapi.com/v1/current.json?key=0194917af2834c43a0674246263001&q=pune&aqi=no


#response code
200

#response headers
{
  "Transfer-Encoding": "chunked",
  "Connection": "keep-alive",
  "Vary": "Accept-Encoding",
  "CDN-PullZone": "93447",
  "CDN-RequestCountryCode": "GB",
  "Age": "0",
  "x-weatherapi-qpm-left": "5000001",
  "x-varnish": "104999432",
  "CDN-ProxyVer": "1.43",
  "CDN-RequestPullSuccess": "True",
  "CDN-RequestPullCode": "200",
  "CDN-CachedAt": "01/30/2026 07:43:06",
  "CDN-EdgeStorageId": "1053",
  "CDN-RequestId": "c6cf3152b779bd1fbd228ce1f185f89d",
  "CDN-Cache": "MISS",
  "CDN-Status": "200",
  "CDN-RequestTime": "0",
  "Cache-Control": "public, max-age=180",
  "Content-Type": "application/json",
  "Date": "Fri, 30 Jan 2026 07:43:06 GMT",
  "Server": "BunnyCDN-DE1-1082",
  "Via": "1.1 varnish (Varnish/7.1)"
}

#response body
{
    "location": {
        "name": "Pune",
        "region": "Maharashtra",
        "country": "India",
        "lat": 18.5333,
        "lon": 73.8667,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1769758987,
        "localtime": "2026-01-30 13:13"
    },
    "current": {
        "last_updated_epoch": 1769758200,
        "last_updated": "2026-01-30 13:00",
        "temp_c": 31.1,
        "temp_f": 87.9,
        "is_day": 1,
        "condition": {
            "text": "Partly Cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1003
        },
        "wind_mph": 8.1,
        "wind_kph": 13.0,
        "wind_degree": 164,
        "wind_dir": "SSE",
        "pressure_mb": 1012.0,
        "pressure_in": 29.89,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 26,
        "cloud": 33,
        "feelslike_c": 29.6,
        "feelslike_f": 85.3,
        "windchill_c": 31.1,
        "windchill_f": 87.9,
        "heatindex_c": 29.6,
        "heatindex_f": 85.3,
        "dewpoint_c": 9.6,
        "dewpoint_f": 49.2,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 7.0,
        "gust_mph": 9.3,
        "gust_kph": 14.9,
        "short_rad": 704.61,
        "diff_rad": 97.1,
        "dni": 947.03,
        "gti": 461.26
    }
}