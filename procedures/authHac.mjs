const { token } = require("./testToken.json")
async function getData(user, pass)
{

    /*
    const encodedPass = encodeURI(pass)
    
    let loginData
    try{
        await fetch(`https://nodejsfriscoisdhacapi.onrender.com/all?username=${user}&password=${encodedPass}`, {headers:{"Access-Control-Allow-Origin": "*"}}).then(async (data) => loginData = data)
        loginData = await loginData.json()
    }catch(e){loginData = {
        "message":"error processing"
    }}

     */
    let loginData = token
    return loginData

}




module.exports = { getData }
