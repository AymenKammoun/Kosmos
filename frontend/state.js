setInterval(async function () {
  const response = await fetch(serverUrl + "/state");
  const body = await response.json();
  document.getElementById("etat").innerHTML = body.state;
}, 1000);
