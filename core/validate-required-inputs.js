module.exports = function validateInputs (dataArray, requiredInputsWithTypesList) {

  for(const field of requiredInputsWithTypesList) {
       const fieldName = field.split(":")[0]
       const fieldType = field.split(":")[1]

    if (dataArray[fieldName] === null || dataArray[fieldName] === undefined) {
      throw new Error(`${field} param is required`);
    }

    const dataType = typeof dataArray[fieldName]

    if(dataType !== fieldType){
      throw new Error(`${fieldName} has the wrong type ` + dataType + " should be " + fieldType );
    }

  }
};

