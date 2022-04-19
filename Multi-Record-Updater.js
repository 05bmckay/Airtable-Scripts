let config = input.config()
let record_ids = config.record_ids;// You will need to set a variable for this, make its value the output of your "Find Record" action.
let table = base.getTable("TABLE"); // Replace with your table name.

for (let i = 0; i < record_ids.length; i++) {
  await table.updateRecordAsync(record_ids[i], {
    "FIELD_NAME":"VALUE", //Replace "FIELD_NAME" with the field for the found records you want to update, and replace "VALUE" with the value you want populated.
    })
}

//This is a pretty simple script but it does good work.
