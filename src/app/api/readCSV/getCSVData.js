export async function getCSVData() {
  try {
    const response = await fetch("http://localhost:3000/api/readCSV");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch data from csv: ", error);
    // Handle the error appropriately here
  }
}
