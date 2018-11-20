const myConfig =
    [
        "Mailing Address",
        [
            { type: ["input"], label: "Company", placeholder: "Company name", validate: false, field: "name" },
            { type: ["input"], label: "Address", placeholder: "Line 1", validate: false, field: "line1" },
            { type: ["input"], label: "", placeholder: "Line 2", validate: false, field: "line2" },
            { type: ["input"], label: "City", placeholder: "City", validate: false, field: "city" },
            { type: ["input"], label: "ZIP", placeholder: "Postal Code", validate: false, field: "postCode" },
            { type: ["select", [["AZ","code"], ["CA","code"], ["CO","code"]]], label: "State", placeholder: "state", validate: false, field: "state" },
            {type:["hidden"], label:"key",placeholder:"", validate:false,field:"key"},
            { type: ["select", [["UNITED STATES","code"], ["UNITED KINGDOM","ukcode"]]], label: "Country", placeholder: "country", validate: false, field: "country" }            
        ]
    ];

export default myConfig