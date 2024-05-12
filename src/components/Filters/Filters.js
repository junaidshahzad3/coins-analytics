"use client";
import { getUniqueCategories } from "@/utils/getUniqueCategories";
import { getUniqueCoins } from "@/utils/getUniqueCoins";
import { getUniqueMCGruppes } from "@/utils/getUniqueMCGruppes";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import studyData from "../../data/Study.json";

const Filters = ({
  selectedCoins,
  setSelectedCoins,
  selectedMCGruppes,
  setSelectedMCGruppes,
  selectedHauptKategories,
  setSelectedHauptKategories,
}) => {
  const [hauptKategorieOptions, setHauptKategorieOptions] = useState(
    async () => {
      const temp = await getUniqueCategories(studyData);
      return temp || [];
    }
  );
  const [MCGruppesOptions, setMCGruppesOptions] = useState(async () => {
    const temp = await getUniqueMCGruppes(studyData);
    return temp || [];
  });
  const [coinsOptions, setCoinsOptions] = useState(async () => {
    const temp = await getUniqueCoins(studyData);
    return temp || [];
  });

  //set the unique categories to the HauptKategorieOptions and MC Gruppe state
  useEffect(() => {
    const fetchHauptKategorieData = async () => {
      const temp = await getUniqueCategories(studyData);
      setHauptKategorieOptions(temp); // Set unique Select options
    };
    fetchHauptKategorieData(); // Fetch the data when the component mounts

    const fetchMCGruppeData = async () => {
      const temp = await getUniqueMCGruppes(studyData);
      setMCGruppesOptions(temp); // Set unique Select options
    };
    fetchMCGruppeData(); // Fetch the data when the component mounts

    const fetchCoinsData = async () => {
      const temp = await getUniqueCoins(studyData);
      setCoinsOptions(temp); // Set unique Select options
    };
    fetchCoinsData(); // Fetch the data when the component mounts
  }, []);

  return (
    <div className="input-group w-full flex gap-5 sticky top-0 bg-white h-20 items-center">
      <div className="input-container w-full">
        <label htmlFor="hauptkategories" className="text-black">
          Haupt Kategories
        </label>
        <Select
          id="hauptkategories"
          closeMenuOnSelect={false}
          isMulti
          options={hauptKategorieOptions || []}
          value={selectedHauptKategories}
          className="text-black"
          onChange={(e) => setSelectedHauptKategories(e)}
        />
      </div>
      <div className="input-container w-full">
        <label htmlFor="mcgruppe" className="text-black">
          MC Gruppe
        </label>
        <Select
          id="mcgruppe"
          closeMenuOnSelect={false}
          isMulti
          options={MCGruppesOptions || []}
          value={selectedMCGruppes}
          className="text-black"
          onChange={(e) => setSelectedMCGruppes(e)}
        />
      </div>
      <div className="input-container w-full">
        <label htmlFor="coins" className="text-black">
          Coins
        </label>
        <Select
          id="coins"
          closeMenuOnSelect={false}
          isMulti
          options={coinsOptions || []}
          value={selectedCoins}
          className="text-black"
          onChange={(e) => setSelectedCoins(e)}
        />
      </div>
    </div>
  );
};

export default Filters;