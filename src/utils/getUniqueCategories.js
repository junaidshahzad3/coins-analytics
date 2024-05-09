export async function getUniqueCategories(data) {
  const categorySet = new Set();
  await data.forEach((item) => {
    const category = item["Haupt-Kategorie"];
    if (category) {
      categorySet.add(category); // Add to the set to ensure uniqueness
    }
  });

  // Convert set to an array of Select options
  const uniqueCategories = Array.from(categorySet).map((category) => ({
    value: category,
    label: category,
  }));

  return uniqueCategories;
}
