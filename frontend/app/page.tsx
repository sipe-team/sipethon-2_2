import MainPage from '@/components/MainPage';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

function Home({ searchParams }: Props) {
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
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
      <div className="flex flex-col justify-center gap-3">
        <h1 className="flex justify-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">껄무새</h1>
        <h2 className="flex justify-center max-w-[600px] text-gray-500 md:text-xl lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-4">이렇게 샀으면 이만큼 벌었을껄...</h2>
      </div>
      <MainPage
        asset={searchParams?.asset}
        currency={searchParams?.currency}
        strategy={searchParams?.strategy}
      />
    </main>
  );
}

export default Home;
