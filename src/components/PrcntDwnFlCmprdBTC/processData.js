import { Colors } from "./Colors";

export const processData = (data) => {
  // Find Bitcoin's "X Anstieg"
  const btcData = data.find((coin) => coin.Symbol === "BTC");
  const btcPrcntDownfall = Number(
    btcData["Percentage of Downfall_1"].slice(0, -1)
  );

  // Count how many coins have a larger "X Anstieg" than Bitcoin
  const countBiggerThanBTC = data.filter((coin) => {
    const temp = Number(coin["Percentage of Downfall_1"].slice(0, -1));
    return temp > btcPrcntDownfall;
  }).length;

  // Total number of coins
  const totalCoins = data.length;

  // Create an array of categories for the pie chart
  const categories = [
    {
      name: Colors[0].name, // This is the "Bigger than BTC" category
      value: countBiggerThanBTC,
      color: Colors[0].color, // Corresponding color
    },
    {
      name: Colors[1].name, // This is the "Smaller or equal to BTC" category
      value: totalCoins - countBiggerThanBTC,
      color: Colors[1].color, // Corresponding color
    },
  ];

  return categories; // Return the formatted data
};
