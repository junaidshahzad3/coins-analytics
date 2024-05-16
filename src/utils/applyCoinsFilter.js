export const applyCoinsFilter = (originalData, setData, selectedCoins) => {
  if (selectedCoins?.length > 0) {
    const coinsValues = selectedCoins.map((option) => option.value);

    const tempFilteredData = originalData.filter((item) => {
      const matchesCoins =
        coinsValues.length === 0 || coinsValues.includes(item["Coin"]);
      return matchesCoins; // Both conditions must be true
    });

    setData(tempFilteredData);
  } else {
    setData(originalData);
  }
};
