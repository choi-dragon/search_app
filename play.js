const request = require('request')
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=150.520928608,-34.118344992,151.343020992,-33.578140996&access_token=pk.eyJ1IjoidG1kZHlkY2hsIiwiYSI6ImNrNW4xajJtczE1cnYzbXF5dTJ5eGp5OHYifQ.g84Puk_JuhS_iKSKBdXXLw&limit=10'

request({url:url,json:true},(error,response)=>{
    if(error){
        console.log('No internet Connection')
    }else{
        const callback=()=>{
            for(i=0;i<response.body.features.length;i++){
                console.log(response.body.features[i].place_name)
        }}
        callback()
    }
})