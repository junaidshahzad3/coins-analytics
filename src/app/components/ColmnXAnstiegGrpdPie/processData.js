export const processData = (data) => {
  const categories = [
    { name: "< 1000X", range: [1000, Infinity], color: "yellow" },
    { name: "100X - 999.9X", range: [100, 999.9], color: "lightgreen" },
    { name: "40X - 99X", range: [40, 99], color: "darkgreen" },
    { name: "21X - 39X", range: [21, 39], color: "blue" },
    { name: "17.1X - 20.9X", range: [17.1, 20.9], color: "pink" },
    { name: "0X - 17X", range: [0, 17], color: "darkred" },
  ];

  const counts = categories.map((cat) => ({ ...cat, value: 0 }));

  for (const item of data) {
    const xAnstieg = item["X Anstieg"];
    const category = counts.find(
      (cat) => xAnstieg >= cat.range[0] && xAnstieg <= cat.range[1]
    );
    if (category) category.value++;
  }

  return counts.filter((cat) => cat.value > 0);
};
