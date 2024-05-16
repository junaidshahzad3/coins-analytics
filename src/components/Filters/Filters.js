"use client";
import { getUniqueCategories } from "@/utils/getUniqueCategories";
import { getUniqueCoins } from "@/utils/getUniqueCoins";
import { getUniqueMCGruppes } from "@/utils/getUniqueMCGruppes";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const Filters = ({
  data,
  selectedCoins,
  setSelectedCoins,
  selectedMCGruppes,
  setSelectedMCGruppes,
  selectedHauptKategories,
  setSelectedHauptKategories,
}) => {
  const [hauptKategorieOptions, setHauptKategorieOptions] = useState(
    async () => {
      const temp = await getUniqueCategories(data);
      return temp || [];
    }
  );
  const [MCGruppesOptions, setMCGruppesOptions] = useState(async () => {
    const temp = await getUniqueMCGruppes(data);
    return temp || [];
  });
  const [coinsOptions, setCoinsOptions] = useState(async () => {
    const temp = await getUniqueCoins(data);
    return temp || [];
  });

  //set the unique categories to the HauptKategorieOptions and MC Gruppe state
  useEffect(() => {
    const fetchHauptKategorieData = async () => {
      const temp = await getUniqueCategories(data);
      setHauptKategorieOptions(temp); // Set unique Select options
    };
    fetchHauptKategorieData(); // Fetch the data when the component mounts

    const fetchMCGruppeData = async () => {
      const temp = await getUniqueMCGruppes(data);
      setMCGruppesOptions(temp); // Set unique Select options
    };
    fetchMCGruppeData(); // Fetch the data when the component mounts

    const fetchCoinsData = async () => {
      const temp = await getUniqueCoins(data);
      setCoinsOptions(temp); // Set unique Select options
    };
    fetchCoinsData(); // Fetch the data when the component mounts
  }, []);

  return (
    <div className="z-20 input-group w-full flex gap-5 sticky top-0 bg-white h-20 items-center">
      <div className="input-container w-full">
        <label htmlFor="hauptkategories" className="text-black">
          Haupt Kategories
        </label>
        <Select
          id="hauptkategories"
          closeMenuOnSelect
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
          closeMenuOnSelect
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
          closeMenuOnSelect
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
