export async function getExcelData() {
  try {
    const response = await fetch("http://localhost:3000/api/readExcel");
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      console.error("Failed to fetch data from Excel");
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
