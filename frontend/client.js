let serverUrl = "http://10.29.227.86:5500";

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
        input.value = configsData[key];

        parameterDiv.appendChild(label);
        parameterDiv.appendChild(input);
        configContainer.appendChild(parameterDiv);
      }
    } else {
      console.error("Failed to fetch configuration:", data.status);
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
  }
}

await fetchConfig();

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

function saveConfig() {
  const updatedConfig = {};

  // Collect updated values from the input elements
  for (const key in configsData) {
    const inputElement = document.getElementById(key);
    if (inputElement) {
      updatedConfig[key] = inputElement.value;
    }
  }

  // Send the updated configuration to the server
  updateConfigOnServer(updatedConfig);
}

function modifyParameter(buttonId, paramId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(paramId);

  if (button.textContent === "Modify") {
    input.readOnly = false;
    button.textContent = "Save";
  } else {
    configsData[paramId] = input.value;
    input.readOnly = true;
    button.textContent = "Modify";
    console.log("Configurations updated locally:", configsData);
  }
}

document
  .getElementById("rebootButton")
  .addEventListener("click", async function () {
    await saveConfig();
  });
