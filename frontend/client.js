configs = {
  SETT_RECORD_TIME: "1800",
  SETT_MOTOR_STOP_TIME: "20",
  SETT_CSV_STEP_TIME: "5",
  SETT_MODE: "1",
  SETT_CSV_FILE_NAME: "Kosmos_CSV",
  SETT_VIDEO_FILE_NAME: "kosmos",
  SETT_VIDEO_RESOLUTION_X: "1920",
  SETT_VIDEO_RESOLUTION_Y: "1080",
  SETT_VIDEO_PREVIEW: "0",
  SETT_SHUTDOWN: "1",
  SETT_FRAMERATE: "24",
  SETT_ESC_MOTOR_GPIO: "22",
  SETT_RECORD_BUTTON_GPIO: "17",
  SETT_STOP_BUTTON_GPIO: "23",
  SETT_POWER_MOTOR_GPIO: "27",
  SETT_MOTOR_BUTTON_GPIO: "21",
  SETT_LED_B: "4",
  SETT_LED_R: "18",
  SETT_ESC_MOTOR_MAX_VAL: "2000",
  SETT_ESC_MOTOR_MIN_VAL: "900",
  SETT_ESC_MOTOR_FAVORITE_VAL: "1250",
  SETT_MOTOR_RUN_TIME: "10",
};

function modifyParameter(buttonId, paramId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(paramId);

  if (button.textContent === "Modify") {
    input.readOnly = false;
    button.textContent = "Save";
  } else {
    input.readOnly = true;
    button.textContent = "Modify";
  }
}
function updateInputValuesFromObject(data) {
  // Loop through the keys in the data object
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Find the input element by its id
      const inputElement = document.getElementById(key);

      // If the input element exists, update its value
      if (inputElement) {
        inputElement.value = data[key];
      }
    }
  }
}

// fetch("/api/configs")
//   .then((response) => response.json())
//   .then((data) => {
//     // Use the data to update your frontend as needed
//     updateInputValuesFromObject(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching configs:", error);
//   });

updateInputValuesFromObject(configs);
document.getElementById("rebootButton").addEventListener("click", function () {
  console.log("Reboot KOSMOS...");
});
