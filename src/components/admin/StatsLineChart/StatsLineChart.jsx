import ReactEcharts from "echarts-for-react";

const option = {
  title: { text: 'Monthly Growth', left: 'center', top: 'top' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['Students', 'Teachers', 'Classes'], bottom: 0 },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Students', type: 'line', data: [20, 12, 34, 14, 50] },
    { name: 'Teachers', type: 'line', data: [20, 22, 24, 26, 28] },
    { name: 'Classes', type: 'line', data: [5, 6, 8, 10, 12] },
  ],
};

export default function EChartLine() {
  return <div style={{ marginTop: '50px' }}>
          <ReactEcharts option={option} style={{ height: 400 }} />
        </div>
}
