import { Colors } from "./Colors";

export const processData = (data) => {
  const categories = [
    {
      name: Colors[0].name,
      range: [1000, Infinity],
      color: Colors[0].color,
    },
    {
      name: Colors[1].name,
      range: [100, 999.9],
      color: Colors[1].color,
    },
    {
      name: Colors[2].name,
      range: [40, 99],
      color: Colors[2].color,
    },
    {
      name: Colors[3].name,
      range: [21, 39],
      color: Colors[3].color,
    },
    {
      name: Colors[4].name,
      range: [17.1, 20.9],
      color: Colors[4].color,
    },
    {
      name: Colors[5].name,
      range: [0, 17],
      color: Colors[5].color,
    },
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
