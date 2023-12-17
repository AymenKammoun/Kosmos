let serverUrl = "http://10.29.225.198:5000";
let live = false;

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

async function setLive(state) {
  try {
    const response = await fetch(serverUrl + "/state");
    const body = await response.json();

    if (state) {
      if (body.state === "KState.STANDBY") {
        live = true;
        frameLoop();
      } else {
        alert(
          "Cannot start live video while the camera is not in STANDBY state."
        );
      }
    } else {
      live = false;
    }
  } catch (error) {
    console.error("Error fetching camera state:", error);
  }
}

async function frameLoop() {
  while (live) {
    await getImage();
  }
}
