


// Helper function that converts passed json string into valid JS object 

export function objectConvert(jsonObj){

// Validate that string object passed in is indeed JSON

let nativeObject;
    try {
        nativeObject = JSON.parse(jsonObj);
    } catch (err) {
        console.log("Object passed in is not correct JSON : ", err)
        return false;
    }
    return nativeObject
}



// Funtion that takes object and extracts correct fields.


export function extractFields (convertedJSON){
    let myObj = {...convertedJSON}
    let fields = [];
    for (let i in myObj){
        fields.push([i].toString())
        if(i.match(/address/gi)){
            fields.push((Object.keys(myObj[i])).map(el=>el))
        }
    }
 return fields
}



function parseAddressField(fieldName){
    if(typeof fieldName != "string"){
        throw ("field name has to be a string")
    }


}