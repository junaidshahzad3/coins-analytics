// pages/api/readExcel.js
import fs from "fs";
import path from "path";
import { read, utils } from "xlsx";
import { NextResponse } from "next/server";

function excelSerialDateToJSDate(serial) {
  const dateOffset = new Date(1899, 11, 30).getTime();
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  return new Date(dateOffset + serial * oneDay);
}

export async function GET(req, res) {
  try {
    // Construct the path to the Excel file from the project root
    const filePath = path.join(process.cwd(), "public", "Study.xlsx");

    // Read the Excel file
    const file = fs.readFileSync(filePath);

    // Parse the file using xlsx
    const workbook = read(file, { type: "buffer" });

    // Access the specific sheet named "Data Studie"
    const sheetName = "Data Studie";
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      return NextResponse.json({ message: `Sheet ${sheetName} not found` });
    }

    // Convert sheet data to JSON
    const data = utils.sheet_to_json(worksheet, {
      raw: false, // Ensures that dates are treated as text rather than Excel serial numbers
    });

    // Fix dates in the data
    const fixedData = data?.map((row, index) => {
      const newRow = { ...row };

      Object.keys(newRow).forEach((key) => {
        if (
          typeof newRow[key] === "number" &&
          newRow[key] > 40000 &&
          newRow[key] < 50000
        ) {
          newRow[key] = excelSerialDateToJSDate(newRow[key]).toISOString();
        }
      });
      return { ...newRow, index: index };
    });

    // // Path for the output JSON file
    // const jsonFilePath = path.join(process.cwd(), "src", "data", "Study.json");

    // // Check if the JSON file exists and delete it (optional, if you're certain `fs.writeFileSync` will overwrite)
    // if (fs.existsSync(jsonFilePath)) {
    //   fs.unlinkSync(jsonFilePath);
    // }

    // // Write the new JSON data to the file
    // fs.writeFileSync(jsonFilePath, JSON.stringify(fixedData, null, 2));

    // Send data back to client
    return NextResponse.json(fixedData);
  } catch (error) {
    return NextResponse.json({
      message: `Failed to read the Excel file`,
      error: error.toString(),
    });
  }
}
