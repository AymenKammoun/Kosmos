serverUrl="http://10.29.232.99:5000"

async function changeLedState(state){
    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({state:state}),
    }
    const response=await fetch(serverUrl+"/led",options)
    const body=await response.json();
    console.log(body)
    document.getElementById("ledState").innerHTML=body.ledState
}

setInterval(async function(){
    const response=await fetch(serverUrl+"/button")
    const body=await response.json();
    console.log(body.buttonState)
    document.getElementById("buttonState").innerHTML=body.buttonState
    
    },1000)
