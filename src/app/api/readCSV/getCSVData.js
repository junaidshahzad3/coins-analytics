export async function getCSVData() {
  try {
    const response = await fetch("http://localhost:3000/api/readCSV");
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      console.log("Failed to fetch data from csv");
      return {
        message: "Failed to fetch data from csv",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to fetch data from csv",
    };
  }
}
