let serverUrl = "http://10.29.225.198:5000";

async function fetchData() {
  try {
    const response = await fetch(serverUrl + "/getRecords");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to populate the table with data
async function populateTable() {
  const fileTable = document.getElementById("fileTable");

  // Fetch data from the API
  const records = await fetchData();

  // Iterate over records and create table rows
  records.forEach((record) => {
    const row = fileTable.insertRow();
    row.insertCell().textContent = record.fileName;
    row.insertCell().textContent = record.size;
    row.insertCell().textContent = record.time;
    row.insertCell().textContent = record.day;
    row.insertCell().textContent = record.month;
  });
}

// Call the function to populate the table when the page loads
populateTable();
