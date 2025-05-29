import React from "react";
import ReactEcharts from "echarts-for-react";

export default function RequestByTeacherChart() {
  const data = [
    { teacher: "Thầy Nam", total: 15, resolved: 10 },
    { teacher: "Cô Mai", total: 20, resolved: 20 },
    { teacher: "Cô Lan", total: 12, resolved: 5 },
    { teacher: "Thầy Tùng", total: 8, resolved: 8 },
  ];

  const option = {
    title: { text: 'Requests per Teacher', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, data: ['Resolved', 'Unresolved'] },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { type: 'category', data: data.map(item => item.teacher) },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Resolved',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: '#34d399' },
        data: data.map(item => item.resolved)
      },
      {
        name: 'Unresolved',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: '#f87171' },
        data: data.map(item => item.total - item.resolved)
      }
    ]
  };

  return <ReactEcharts option={option} style={{ height: 400, marginTop: 40 }} />
}
