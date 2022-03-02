const GOOGLE_MAPS_API_KEY = 'GOOGLE_API_KEY';
var config = input.config()
const address = config.address; 
let geo = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=`+address.replace(
                ' ',
                '+'
            )+`&key=${GOOGLE_MAPS_API_KEY}`
        ).then(r => r.json())

output.set('corrected_address', geo.results[0].formatted_address)
