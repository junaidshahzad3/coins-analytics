import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Legend from "./Legend";

const XAnstiegGrpd = ({ filteredData }) => {
  return (
    <div>
      <div className="text-3xl text-center">X Anstieg grouped</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <PieChart filteredData={filteredData} />
          <BarChart filteredData={filteredData} />
        </div>
        <Legend />
      </div>
    </div>
  );
};

export default XAnstiegGrpd;
