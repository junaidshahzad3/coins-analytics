export const applyHauptFilter = (
  originalData,
  setData,
  selectedHauptKategories
) => {
  if (selectedHauptKategories?.length > 0) {
    const hauptKategoriesValues = selectedHauptKategories.map(
      (option) => option.value
    );

    const tempFilteredData = originalData.filter((item) => {
      const matchesHauptKategorie =
        hauptKategoriesValues.length === 0 ||
        hauptKategoriesValues.includes(item["Haupt-Kategorie"]);

      return matchesHauptKategorie;
    });

    setData(tempFilteredData);
  } else {
    setData(originalData);
  }
};
