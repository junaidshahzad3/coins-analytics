// pages/api/readCSV.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Construct the path to the CSV file from the project root
    const csvFilePath = path.join(process.cwd(), "public", "BTC-USD.csv");

    // Create an empty array to store CSV data
    const data = [];

    // Flag to check if headers have been processed
    let headersProcessed = false;

    // Read CSV file
    fs.createReadStream(csvFilePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) => {
        if (!headersProcessed) {
          // Process column headers
          data.push(row);
          headersProcessed = true;
        } else {
          // Process data rows
          const rowData = {};
          row.forEach((value, index) => {
            rowData[data[0][index]] = value;
          });
          data.push(rowData);
        }
      })
      .on("end", () => {
        // Remove column headers from data array
        data.shift();

        // Path for the output JSON file
        const jsonFilePath = path.join(
          process.cwd(),
          "src",
          "data",
          "BTC-USD.json"
        );

        // Write the CSV data to the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

        // Send data back to client
        return NextResponse.json(data);
      });

    return NextResponse.json({
      message: `Failed to read the CSV file`,
      error: "Something went wrong",
    });
  } catch (error) {
    return NextResponse.json({
      message: `Failed to read the CSV file`,
      error: error.toString(),
    });
  }
}
