"use client";
import React, { useState } from "react";
import Filters from "../Filters/Filters";
import XAnstiegGrpd from "../XAnstiegGrpd/XAnstiegGrpd";
import XAnstiegCmprdBTC from "../XAnstiegCmprdBTC/XAnstiegCmprdBTC";
import PrcntDwnFlGrpd from "../PrcntDwnFlGrpd/PrcntDwnFlGrpd";
import PrcntDwnFlGrpdCmprdBTC from "../PrcntDwnFlCmprdBTC/PrcntDwnFlGrpdCmprdBTC";
import XAntiegByCoins from "../XAntiegByCoins/XAntiegByCoins";
import TopByCoins from "../TopByCoins/TopByCoins";
import PrcntDwnFlScatter from "../PrcntDwnFlScatter/PrcntDwnFlScatter";
import MCLowTop from "../MCLowTop/MCLowTop";
import MCTopLow from "../MCTopLow/MCTopLow";
import RankTopLow from "../RankTopLow/RankTopLow";
import RankLowTop from "../RankLowTop/RankLowTop";
import PrcntDwnFlCombined from "../PrcntDwnFlCombined/PrcntDwnFlCombined";

const MainCompChild = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [selectedMCGruppes, setSelectedMCGruppes] = useState([]);
  const [selectedHauptKategories, setSelectedHauptKategories] = useState([]);

  return (
    <div className="w-full h-full flex flex-col px-6">
      <Filters
        selectedCoins={selectedCoins}
        setSelectedCoins={setSelectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        setSelectedMCGruppes={setSelectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
        setSelectedHauptKategories={setSelectedHauptKategories}
      />
      <XAnstiegGrpd
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <XAnstiegCmprdBTC />
      <PrcntDwnFlGrpd
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <PrcntDwnFlGrpdCmprdBTC />
      <XAntiegByCoins
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <TopByCoins
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <PrcntDwnFlScatter
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <PrcntDwnFlCombined
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <MCLowTop
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <RankLowTop
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <MCTopLow
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
      <RankTopLow
        selectedCoins={selectedCoins}
        selectedMCGruppes={selectedMCGruppes}
        selectedHauptKategories={selectedHauptKategories}
      />
    </div>
  );
};

export default MainCompChild;
