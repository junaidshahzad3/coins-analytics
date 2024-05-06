// pages/api/readExcel.js

import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { read, utils } from "xlsx";

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
    const data = utils.sheet_to_json(worksheet);

    // Send data back to client
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: `Failed to read the Excel file`,
      error: error.toString(),
    });
  }
}
