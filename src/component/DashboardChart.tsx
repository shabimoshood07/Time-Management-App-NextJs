"use client";
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Tasks = {
  _id: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: number;
  day?: string;
  user: string;
};

const DashboardChart = ({ tasks }: { tasks: Tasks[] }) => {
  const getBarData = (): number[] => {
    const days = tasks.map((task) => task.day) as (string | undefined)[];
    const uniqueDays = Array.from(new Set(days));
    let dataArray = [];
    for (let index = 0; index < uniqueDays.length; index++) {
      let totalDuration = 0;
      tasks.map((task) => {
        if (task.day === uniqueDays[index]) {
          totalDuration += task.duration;
        }
      });
      dataArray.push(totalDuration);
    }

    return dataArray;
  };

  const getBarLabels = (): (string | undefined)[] => {
    const days = tasks.map((task) => task.day);
    const uniqueDays = Array.from(new Set(days));
    return uniqueDays;
  };

  const [data, setData] = useState<any>({
    labels: tasks.map((task) => task.date.slice(5).split("-").join("/")),
    datasets: [
      {
        label: "Duration",
        data: tasks.map((task) => task.duration),
        backgroundColor: ["rgba(2,6,3,1"],
      },
    ],
  });

  const [pieData, setPieData] = useState<any>({
    labels: getBarLabels(),
    datasets: [
      {
        label: "Total Duration for each day(Hr)",
        data: getBarData(),
        backgroundColor: [
          "rgba(2, 6, 23,1)",
          " #eab308",
          "rgb(37 ,99, 235)",
          "rgb(20, 184, 166)",
          "rgb(240, 253, 244)",
          "rgb(250, 245, 255)",
          "rgb(120, 53, 15)",
        ],
      },
    ],
  });

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Duration against Date",
      },
    },
    scales: {
      y: {
        max: 30,
        min: 0,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total work duration for each day(Hr)",
      },
    },
  };

  if (tasks.length === 0) return null;

  return (
    <div className="my-10  grid grid-cols-2 gap-4">
      <div className=" col-span-2 my-4 border border-yellow-500 rounded-xl  h-[200px] md:h-[400px] flex flex-col justify-between items-center">
        <Line options={lineOptions} data={data} />
      </div>
      <div className="col-span-2  my-4 border border-slate-950 rounded-xl h-[500px] flex flex-col justify-center items-center">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default DashboardChart;
