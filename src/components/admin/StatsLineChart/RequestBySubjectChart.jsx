import React from "react";
import ReactEcharts from "echarts-for-react";

export default function RequestBySubjectChart() {
  const subjectData = [
    { value: 45, name: "Toán" },
    { value: 30, name: "Văn" },
    { value: 25, name: "Tiếng Anh" },
    { value: 20, name: "Hóa" },
    { value: 15, name: "Lý" },
  ];

  const option = {
    title: {
      text: "Requests by Subject",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} requests ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Subject",
        type: "pie",
        radius: "60%",
        data: subjectData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: 400, marginTop: 50 }} />;
}
