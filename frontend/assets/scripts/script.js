serverUrl="http://10.16.153.2:5000"

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