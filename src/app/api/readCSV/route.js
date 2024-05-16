// // pages/api/readCSV.js
// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse";
// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   try {
//     // Construct the path to the CSV file from the project root
//     const csvFilePath = path.join(process.cwd(), "public", "BTC-USD.csv");

//     // Create an empty array to store CSV data
//     const data = [];

//     // Flag to check if headers have been processed
//     let headersProcessed = false;

//     // Read CSV file
//     fs.createReadStream(csvFilePath)
//       .pipe(parse({ delimiter: "," }))
//       .on("data", (row) => {
//         if (!headersProcessed) {
//           // Process column headers
//           data.push(row);
//           headersProcessed = true;
//         } else {
//           // Process data rows
//           const rowData = {};
//           row.forEach((value, index) => {
//             rowData[data[0][index]] = value;
//           });
//           data.push(rowData);
//         }
//       })
//       .on("end", () => {
//         // Remove column headers from data array
//         data.shift();
//         // Send data back to client
//         return NextResponse.json(data);
//       });

//     return NextResponse.json({
//       message: `Failed to read the CSV file`,
//       error: "Something went wrong",
//     });
//   } catch (error) {
//     return NextResponse.json({
//       message: `Failed to read the CSV file`,
//       error: error.toString(),
//     });
//   }
// }

// pages/api/readCSV.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { NextResponse } from "next/server";

const csvFilePath = path.join(process.cwd(), "public", "BTC-USD.csv");

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const data = [];
    let headersProcessed = false;

    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) => {
        if (!headersProcessed) {
          data.push(row); // Save header row
          headersProcessed = true;
        } else {
          const rowData = {};
          row.forEach((value, index) => {
            rowData[data[0][index]] = value; // Use header row as keys
          });
          data.push(rowData);
        }
      })
      .on("end", () => {
        data.shift(); // Remove header row from data
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export async function GET(req, res) {
  try {
    const data = await readCSV(csvFilePath);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: "Failed to read the CSV file",
      error: error.toString(),
    });
  }
}
