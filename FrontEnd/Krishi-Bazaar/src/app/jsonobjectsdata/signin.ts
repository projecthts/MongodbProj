export let logindata = [
    {
        "placeholder": "Enter Email",
        "formname": "email",
        "type": "email",
        "error": false,
        "errormsg": "Email is invalid"
    },
    {
        "placeholder": "Enter Password",
        "formname": "password",
        "type": "password",
        "error": false,
        "errormsg": ""
    }
]

export let regdata = [

    {
        "placeholder": "Enter Name",
        "formname": "name",
        "type": "text",
        "error": false,
        "patternerror": ""
    },

    {
        "placeholder": "Enter Email",
        "formname": "email",
        "type": "email",
        "error": false,
        "patternerror": "Email is invalid"
    },

    {
        "placeholder": "Enter Phone Number",
        "formname": "phone",
        "type": "number",
        "error": false,
        "patternerror": "Phone is invalid. Please provide a 10 digit phone number."
    },

    {
        "placeholder": "Enter Password",
        "formname": "password",
        "type": "password",
        "error": false,
        "patternerror": "Password should contain [a-z],[A-Z],[0-9],a special character"
    },

    {
        "placeholder": "Confirm Password",
        "formname": "confirmpassword",
        "type": "password",
        "error": false,
        "patternerror": "Passwords don't match!"
    },

    {
        "placeholder": "Select Role",
        "value": null,
        "type": "dropdown",
        "error": false,
        "patternerror": "",
        "options": [{
            "value": "farmer",
            "placeholder": "Farmer + Consumer"
        },
        {
            "value": "consumer",
            "placeholder": "Consumer"
        }]
        

    },

    {
        "placeholder": "Enter Address",
        "formname": "address",
        "type": "text",
        "error": false,
        "patternerror": ""
    },

    {
        "placeholder": "Enter Pincode",
        "formname": "pincode",
        "type": "number",
        "error": false,
        "patternerror": "Enter your pin code."
    },

    {
        "placeholder": "Select State",
        "value": null,
        "type": "dropdown",
        "error": false,
        "patternerror": "",
        "options": [],
        "click": null


    },
    {
        "placeholder": "Select District",
        "value": null,
        "type": "dropdown",
        "error": false,
        "patternerror": "",
        "options": []


    }
]

// {
//     "placeholder": "",
//     "formname": "",
//     "type": "",
//     "error": "",
//     "errormsg": ""
// }