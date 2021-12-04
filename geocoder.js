

let table = base.getTable('HostLocations')
let result = await table.selectRecordsAsync({
    sorts: [
        { field: 'Lat', direction: 'desc' },
        { field: 'Address', direction: 'desc' },
        { field: 'Lng', direction: 'desc' }
    ]
})

const GOOGLE_MAPS_API_KEY = 'API_KEY';

await Promise.all(
    result.records.map(async record => {
        let address = record.getCellValue('Address')
        let lats = record.getCellValue('Lat')
        let lngs = record.getCellValue('Lng')

        if (!address) {
            return
        }

        if (lats) {
            console.log(`Skipping, location already exists: ${address}`)
        
        }

        console.log(`Geocoding: ${address}`)

        let geo = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(
                ' ',
                '+'
            )}&key=${GOOGLE_MAPS_API_KEY}`
        ).then(r => r.json())

        if (!geo.results || geo.results.length === 0) {
            console.log(`No geocode results found for: ${address}`)
            return
        }

        let {
            geometry: {
                location: { lat, lng }
            }
        } = geo.results[0]

        

        
console.log(lat,lng)
        return await table.updateRecordAsync(record, {
            Lat: lat,
            Lng: lng
        })
    })
)


console.log(`# Done!`)
