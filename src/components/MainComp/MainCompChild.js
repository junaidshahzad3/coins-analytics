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
import InfoCards from "../InfoCards/InfoCards";

const MainCompChild = ({ data, btcData }) => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [selectedMCGruppes, setSelectedMCGruppes] = useState([]);
  const [selectedHauptKategories, setSelectedHauptKategories] = useState([]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full h-full max-w-[1600px] flex flex-col px-6 gap-10">
        <Filters
          data={data}
          selectedCoins={selectedCoins}
          setSelectedCoins={setSelectedCoins}
          selectedMCGruppes={selectedMCGruppes}
          setSelectedMCGruppes={setSelectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          setSelectedHauptKategories={setSelectedHauptKategories}
        />
        <InfoCards data={data} />
        <XAnstiegGrpd
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <XAnstiegCmprdBTC data={data} />
        <PrcntDwnFlGrpd
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <PrcntDwnFlGrpdCmprdBTC
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <XAntiegByCoins
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <TopByCoins
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <PrcntDwnFlScatter
          data={data}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <PrcntDwnFlCombined
          data={data}
          btcData={btcData}
          selectedMCGruppes={selectedMCGruppes}
          selectedHauptKategories={selectedHauptKategories}
          selectedCoins={selectedCoins}
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <MCLowTop
            data={data}
            selectedCoins={selectedCoins}
            selectedMCGruppes={selectedMCGruppes}
            selectedHauptKategories={selectedHauptKategories}
          />
          <RankLowTop
            data={data}
            selectedCoins={selectedCoins}
            selectedMCGruppes={selectedMCGruppes}
            selectedHauptKategories={selectedHauptKategories}
          />
          <MCTopLow
            data={data}
            selectedCoins={selectedCoins}
            selectedMCGruppes={selectedMCGruppes}
            selectedHauptKategories={selectedHauptKategories}
          />
          <RankTopLow
            data={data}
            selectedCoins={selectedCoins}
            selectedMCGruppes={selectedMCGruppes}
            selectedHauptKategories={selectedHauptKategories}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCompChild;
