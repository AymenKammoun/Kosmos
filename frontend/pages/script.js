//Function to make a parameter value editable
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

document.getElementById("param1Value").value = "test44";
document.getElementById("param2Value").value = getExternalValue();

function getExternalValue() {
  return "test2";
}
// Function to handle the "Reboot" button (dummy function)
document.getElementById("rebootButton").addEventListener("click", function () {
  console.log("Reboot KOSMOS...");
});
