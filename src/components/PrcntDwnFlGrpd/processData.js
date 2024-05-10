import { ColorsWith10Diff, ColorsWith5Diff } from "./Colors";

export const processData = (data, filter) => {
  const categoriesWith10Diff = [
    {
      name: ColorsWith10Diff[0].name,
      range: [-100, -99.8],
      color: ColorsWith10Diff[0].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[1].name,
      range: [-99.79, -90],
      color: ColorsWith10Diff[1].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[2].name,
      range: [-89.99, -80],
      color: ColorsWith10Diff[2].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[3].name,
      range: [-79.99, -70],
      color: ColorsWith10Diff[3].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[4].name,
      range: [-69.99, -60],
      color: ColorsWith10Diff[4].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[5].name,
      range: [-59.99, -50],
      color: ColorsWith10Diff[5].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[6].name,
      range: [-49.99, -40],
      color: ColorsWith10Diff[6].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[7].name,
      range: [-39.99, -30],
      color: ColorsWith10Diff[7].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[8].name,
      range: [-29.99, -20],
      color: ColorsWith10Diff[8].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[9].name,
      range: [-19.99, -10],
      color: ColorsWith10Diff[9].color,
      value: 0,
    },
    {
      name: ColorsWith10Diff[10].name,
      range: [-9.99, -0.01],
      color: ColorsWith10Diff[10].color,
      value: 0,
    },
  ];

  const categoriesWith5Diff = [
    {
      name: ColorsWith5Diff[0].name,
      range: [-100, -99.8],
      color: ColorsWith5Diff[0].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[1].name,
      range: [-99.79, -95],
      color: ColorsWith5Diff[1].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[2].name,
      range: [-94.99, -90],
      color: ColorsWith5Diff[2].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[3].name,
      range: [-89.99, -85],
      color: ColorsWith5Diff[3].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[4].name,
      range: [-84.99, -80],
      color: ColorsWith5Diff[4].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[5].name,
      range: [-79.99, -75],
      color: ColorsWith5Diff[5].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[6].name,
      range: [-74.99, -70],
      color: ColorsWith5Diff[6].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[7].name,
      range: [-69.99, -65],
      color: ColorsWith5Diff[7].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[8].name,
      range: [-64.99, -60],
      color: ColorsWith5Diff[8].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[9].name,
      range: [-59.99, -55],
      color: ColorsWith5Diff[9].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[10].name,
      range: [-54.99, -50],
      color: ColorsWith5Diff[10].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[11].name,
      range: [-49.99, -45],
      color: ColorsWith5Diff[11].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[12].name,
      range: [-44.99, -40],
      color: ColorsWith5Diff[12].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[13].name,
      range: [-39.99, -35],
      color: ColorsWith5Diff[13].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[14].name,
      range: [-34.99, -30],
      color: ColorsWith5Diff[14].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[15].name,
      range: [-29.99, -25],
      color: ColorsWith5Diff[15].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[16].name,
      range: [-24.99, -20],
      color: ColorsWith5Diff[16].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[17].name,
      range: [-19.99, -15],
      color: ColorsWith5Diff[17].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[18].name,
      range: [-14.99, -10],
      color: ColorsWith5Diff[18].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[19].name,
      range: [-9.99, -5],
      color: ColorsWith5Diff[19].color,
      value: 0,
    },
    {
      name: ColorsWith5Diff[20].name,
      range: [-4.99, -0.01],
      color: ColorsWith5Diff[20].color,
      value: 0,
    },
  ];

  const categories =
    filter === "5" ? categoriesWith5Diff : categoriesWith10Diff;

  for (const item of data) {
    const downfall = Number(item["Percentage of Downfall_1"].slice(0, -1));
    const category = categories.find(
      (cat) => downfall >= cat.range[0] && downfall <= cat.range[1]
    );
    if (category) category.value++;
  }

  return categories.filter((cat) => cat.value > 0);
};
