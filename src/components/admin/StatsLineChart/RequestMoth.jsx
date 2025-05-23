import React from "react";
import ReactEcharts from "echarts-for-react";

export default function RequestByMonthTeacherChart() {
  const data = [
    { month: "Tháng 1", Nam: 10, Mai: 5, Lan: 3 },
    { month: "Tháng 2", Nam: 7, Mai: 6, Lan: 8 },
    { month: "Tháng 3", Nam: 12, Mai: 15, Lan: 5 },
    { month: "Tháng 4", Nam: 4, Mai: 7, Lan: 9 },
  ];

  const option = {
    title: { text: "Monthly Requests per Teacher", left: "center" },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { bottom: 0 },
    xAxis: { type: "category", data: data.map((d) => d.month) },
    yAxis: { type: "value" },
    series: [
      { name: "Nam", type: "bar", data: data.map((d) => d.Nam) },
      { name: "Mai", type: "bar", data: data.map((d) => d.Mai) },
      { name: "Lan", type: "bar", data: data.map((d) => d.Lan) },
    ],
  };

  return <ReactEcharts option={option} style={{ height: 400, marginTop: 50 }} />;
}
