import { getExcelData } from "./api/readExcel/getExcelData";
import ColmnXAnstiegGrpdPieIndex from "./components/ColmnXAnstiegGrpdPie";

const Home = async () => {
  const data = await getExcelData();

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <ColmnXAnstiegGrpdPieIndex data={data} />
    </main>
  );
};

export default Home;
