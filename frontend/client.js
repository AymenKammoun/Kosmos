serverUrl = "http://10.29.227.86:5000";

let configs;

fetch(serverUrl + "/getConfig")
  .then((response) => response.json())
  .then((data) => {
    // Use the data to update your frontend as needed
    configs = data.data;
  })
  .catch((error) => {
    console.error("Error fetching configs:", error);
  });

// Assuming you have a container element with the id "parametersContainer" in your HTML
const parametersContainer = document.getElementById("parametersContainer");

// Loop through the keys in the configs object
for (const key in configs) {
  if (configs.hasOwnProperty(key)) {
    // Create a div element for each parameter
    const parameterDiv = document.createElement("div");
    parameterDiv.classList.add("parameter");

    // Create a label element for the parameter
    const label = document.createElement("label");
    label.setAttribute("for", key);
    label.textContent = key;

    // Create an input element for the parameter
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", key);
    input.setAttribute("readonly", true);
    input.value = configs[key];

    // Create a button element for modifying the parameter
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", `but_${key}`);
    button.setAttribute("onclick", `modifyParameter('but_${key}','${key}')`);
    button.textContent = "Modify";

    // Append label, input, and button to the parameter div
    parameterDiv.appendChild(label);
    parameterDiv.appendChild(input);
    parameterDiv.appendChild(button);

    // Append the parameter div to the container
    parametersContainer.appendChild(parameterDiv);
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

document.getElementById("rebootButton").addEventListener("click", function () {
  console.log("Reboot KOSMOS...");
});

function modifyParameter(buttonId, paramId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(paramId);

  if (button.textContent === "Modify") {
    input.readOnly = false;
    button.textContent = "Save";
  } else {
    configs[paramId] = input.value;
    input.readOnly = true;
    button.textContent = "Modify";
  }
}
