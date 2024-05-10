import studyData from "../data/Study.json";

export const applyMCGruppeFilter = (setData, selectedMCGruppes) => {
  if (selectedMCGruppes?.length > 0) {
    const mcGruppesValues = selectedMCGruppes.map((option) => option.value);

    const tempFilteredData = studyData.filter((item) => {
      const matchesMCGruppe =
        mcGruppesValues.length === 0 ||
        mcGruppesValues.includes(item["MC Gruppe"]);

      return matchesMCGruppe;
    });

    setData(tempFilteredData);
  } else {
    setData(studyData);
  }
};
