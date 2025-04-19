// src/components/ChartsSection.tsx
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChartsProps {
  data: { state: string; roof_type: string; roof_size: string; date: string }[];
}

export default function ChartsSection({ data }: ChartsProps) {
  const stateData: Record<string, number> = {};
  const sizeData: Record<string, number> = {};
  const countData: Record<string, number> = {};
  const energyData: Record<string, number> = {};
  const monthlyData: Record<string, number> = {};

  data.forEach((d) => {

    stateData[d.state] = (stateData[d.state] || 0) + 1;


    sizeData[d.roof_type] = (sizeData[d.roof_type] || 0) + parseFloat(d.roof_size);
    countData[d.roof_type] = (countData[d.roof_type] || 0) + 1;


    const coeff = { TPO: 1.2, Metal: 1.0, Foam: 1.5 }[d.roof_type] || 1;
    energyData[d.roof_type] =
      (energyData[d.roof_type] || 0) + (parseFloat(d.roof_size) / 1000) * coeff;

    const month = d.date.slice(0, 7); 
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const roofTypes = Object.keys(sizeData);
  const avgSizes = roofTypes.map((rt) => (sizeData[rt] / countData[rt]).toFixed(1));

  return (
  <div className="flex flex-col md:flex-row gap-4 justify-around mt-4">

  <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 flex flex-col" style={{ height: '400px' }}>
    <p className="font-semibold mb-2">Avg Roof Size by Type</p>
    <div className="flex-1 min-h-0"> 
      <Bar
        data={{
          labels: roofTypes,
          datasets: [{ label: 'Avg Size', data: avgSizes }],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }}
      />
    </div>
  </div>

  <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 flex flex-col" style={{ height: '400px' }}>
    <p className="font-semibold mb-2">Energy Saved by Roof Type</p>
    <div className="flex-1 min-h-0">
      <Pie
        data={{
          labels: Object.keys(energyData),
          datasets: [{ label: 'Energy Saved', data: Object.values(energyData) }],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            colors: {
              forceOverride: true, 
              enabled: true
            }
          },
        }}
      />
    </div>
  </div>

  <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 flex flex-col" style={{ height: '400px' }}>
    <p className="font-semibold mb-2">Monthly Project Trend</p>
    <div className="flex-1 min-h-0">
      <Line
        data={{
          labels: Object.keys(monthlyData).sort(),
          datasets: [
            {
              label: 'Projects per Month',
              data: Object.entries(monthlyData)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([, count]) => count),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.3,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  </div>
</div>
);


}
