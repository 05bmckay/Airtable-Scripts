let record_ids = input.config().record_ids;// You will need to set a variable for this, make its value the output of your "Find Record" action.
let table = base.getTable("TABLE_NAME"); // Replace with your table name.
for (let record of records_ids) {
    await table.updateRecordAsync(record, {
    "FIELD_NAME":"VALUE", //Replace "FIELD_NAME" with the field for the found records you want to update, and replace "VALUE" with the value you want populated.
    })
}
//This is a pretty simple script but it does good work.
