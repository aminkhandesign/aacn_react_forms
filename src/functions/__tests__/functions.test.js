import  {extractFields,objectConvert} from '../extractingFieldsFromJSON.js'


test('convert json object to fields', () => {
    expect(extractFields({one:1,two:2})).toEqual(["one","two"]);
  });

  test('convert json object to fields', () => {
    expect(extractFields({one:1,two:{a:2,b:3}})).toEqual(["one",{"two":["a","b"]}]);
  });


