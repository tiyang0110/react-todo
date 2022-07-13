import console from "console";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({coinId}:ChartProps){
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 10000});
  const isDark = useRecoilValue(isDarkAtom);

  return <div>{isLoading ? "Loading Chart..." : ( 
    <ApexChart
      type="line"
      series={[
        {
          name: "Price",
          data: data?.map((price) => price.close) ?? [],
        }
      ]} 
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          height: 500,
          width: 300,
          toolbar: {
            show: false,
          },
          background: "transparent"
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
          categories: data?.map((price) => price.time_close),
          type: "datetime",
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#0be881"],
            stops: [0, 100],
          },
          colors: ["#0fbcf9"],
        },
        tooltip:{
          y: {
            formatter: (value) => `$ ${value.toFixed(3)}`,
          }
        }
      }}
    />
  )}</div>;
}

export default Chart;