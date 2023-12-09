let serverUrl = "http://10.42.0.1:5000";

let configsData;

async function fetchConfig() {
  try {
    const response = await fetch(serverUrl + "/getConfig");
    const data = await response.json();

    // Assuming the response structure is { data: { ... }, status: "ok" }
    if (data.status === "ok") {
      const configContainer = document.getElementById("parametersContainer");
      configsData = data.data;

      for (const key in configsData) {
        const parameterDiv = document.createElement("div");
        parameterDiv.classList.add("parameter");

        const label = document.createElement("label");
        label.textContent = key;

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", key);
        input.setAttribute("readonly", "");
        input.value = configsData[key];

        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("id", "button" + key);
        button.textContent = "Modify";
        button.addEventListener("click", () =>
          modifyParameter("button" + key, key)
        );

        parameterDiv.appendChild(label);
        parameterDiv.appendChild(input);
        parameterDiv.appendChild(button);
        configContainer.appendChild(parameterDiv);
      }
    } else {
      console.error("Failed to fetch configuration:", data.status);
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
  }
}

fetchConfig();

async function updateConfigOnServer(updatedConfig) {
  try {
    const response = await fetch(serverUrl + "/changeConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedConfig),
    });

    const data = await response.json();

    // Assuming the response structure is { status: "ok" }
    if (data.status === "ok") {
      console.log("Configuration updated on the server");
    } else {
      console.error(
        "Failed to update configuration on the server:",
        data.status
      );
    }
  } catch (error) {
    console.error("Error updating configuration on the server:", error);
  }
}

function modifyParameter(buttonId, paramId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(paramId);

  if (button.textContent === "Modify") {
    input.readOnly = false;
    button.textContent = "Save";
  } else {
    // Check if the new value is a number
    const newValue = input.value;
    if (!isNaN(newValue)) {
      // Update only if the new value is of the same type
      configsData[paramId] = newValue;
      input.readOnly = true;
      button.textContent = "Modify";
      console.log("Configurations updated locally:", configsData);
    } else {
      // Display an error if the new value is not a number
      alert("Error: Please enter a valid number.");
    }
  }
}

document
  .getElementById("rebootButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    updateConfigOnServer(configsData);
  });
