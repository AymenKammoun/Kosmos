let serverUrl = "http://10.42.0.1:5000";
// serverUrl = "http://10.29.225.198:5000";
live = false;

async function start() {
  const response = await fetch(serverUrl + "/start");
  const body = await response.json();
  console.log(body);
}

async function stop() {
  const response = await fetch(serverUrl + "/stop");
  const body = await response.json();
  console.log(body);
}

async function getImage() {
  const response = await fetch(serverUrl + "/frame");
  const imageBlob = await response.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);
  const image = document.getElementById("frame");
  image.src = imageObjectURL;
}

function setLive(state) {
  live = state;
  if (live) {
    frameLoop();
  }
}

async function frameLoop() {
  while (live) {
    await getImage();
  }
}
