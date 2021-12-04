let table = base.getTable("TABLE NAME"); //Replace "Table Name" with your Table name. 
let result = await table.selectRecordsAsync();
let config = input.config();
let view = table.getView("Grid view"); //This is in grid view right now but you can change it if you only want to ID records in a certain view.
let query = await view.selectRecordsAsync({
    fields: ["FIELD NAME", "ID"]}); //Replace "FIELD NAME" with the field that you want to take the first 2 digits from. The "ID" field is a field you need in your table, this is where the unique id will be generated.

var current_ids=[]; //This will be all the ID in the table already. It's needed to check against the generated ID and make sure it doesn't exist already.
var id = config.ID; //You will need to setup a variable for the Airtable ID of the record that fires this script. 
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndInt = randomIntFromInterval(1000, 9999)
var initials = query.getRecord(id).getCellValueAsString("FIELD NAME").substring(0, 2).toLowerCase()+rndInt; //Replace "FIELD NAME" with the same value you replace "FIELD NAME" on line 6

for (let record of query.records) {
    if (record.getCellValueAsString("ID") !== ""){
        current_ids.push(record.getCellValueAsString("ID"));
    }
  
}
async function update(){
await table.updateRecordAsync(id, {
    "ID": initials,
})
console.log("Updated")
}
function idid(){
if(current_ids.includes(initials)){
console.log("CONTAINS")
console.log("Switching")
initials = query.getRecord(id).getCellValueAsString("FIELD NAME").substring(0, 2).toLowerCase()+rndInt; //Replace "FIELD NAME" with the same value you replace "FIELD NAME" on line 6
idid();
} 
else {
console.log("DOESN'T CONTAINS")
update();
}
}
idid();
