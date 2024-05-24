import MainPage from '@/components/MainPage';
import SampleChart3 from '@/components/SampleChart3';

function Home() {
  // const initialData: AreaData[] = [
  //   { time: '2018-12-22', value: 32.51 },
  //   { time: '2018-12-23', value: 31.11 },
  //   { time: '2018-12-24', value: 27.02 },
  //   { time: '2018-12-25', value: 27.32 },
  //   { time: '2018-12-26', value: 25.17 },
  //   { time: '2018-12-27', value: 28.89 },
  //   { time: '2018-12-28', value: 25.46 },
  //   { time: '2018-12-29', value: 23.92 },
  //   { time: '2018-12-30', value: 22.68 },
  //   { time: '2018-12-31', value: 22.67 },
  // ];

  // const initialData1: AreaData[] = [
  //   { time: '2018-10-11', value: 52.89 },
  //   { time: '2018-10-12', value: 51.65 },
  //   { time: '2018-10-13', value: 51.56 },
  //   { time: '2018-10-14', value: 50.19 },
  //   { time: '2018-10-15', value: 51.86 },
  //   { time: '2018-10-16', value: 51.25 },
  // ];

  // const initialData2: AreaData[] = [
  //   { time: '2018-10-11', value: 42.89 },
  //   { time: '2018-10-12', value: 41.65 },
  //   { time: '2018-10-13', value: 41.56 },
  //   { time: '2018-10-14', value: 40.19 },
  //   { time: '2018-10-15', value: 41.86 },
  //   { time: '2018-10-16', value: 41.25 },
  // ];

  return (
    <main>
      <MainPage />
      {/* <SampleChart data={initialData} /> */}
      <SampleChart3 />
    </main>
  );
}

export default Home;
