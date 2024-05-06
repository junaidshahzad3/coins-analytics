import { getExcelData } from "./api/readExcel/getExcelData";
import ColmnXAnstiegGrpd from "./components/ColmnXAnstiegGrpd";

const Home = async () => {
  const data = await getExcelData();

  // const getCategory = (x) => {
  //   if (x >= 1000) {
  //     return 1;
  //   } else if (x >= 100 && x < 1000) {
  //     return 2;
  //   } else if (x >= 40 && x < 100) {
  //     return 3;
  //   } else if (x >= 21 && x < 40) {
  //     return 4;
  //   } else if (x >= 17.1 && x < 21) {
  //     return 5;
  //   } else {
  //     return 6;
  //   }
  // };

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      {data.length > 0 && <ColmnXAnstiegGrpd data={data} />}
    </main>
  );
};

export default Home;
