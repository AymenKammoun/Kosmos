let serverUrl = "http://10.29.225.198:5000";

setInterval(async function () {
  const response = await fetch(serverUrl + "/state");
  const body = await response.json();
  document.getElementById("etat").innerHTML = body.state;
}, 1000);
