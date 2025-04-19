
// src/components/SummaryCards.tsx
interface SummaryProps {
    data: { roof_size: string; roof_type: string }[];
  }
  
  export default function SummaryCards({ data }: SummaryProps) {
    const total = data.length;
    const avgSize = (data.reduce((acc, d) => acc + parseFloat(d.roof_size), 0) / total || 0).toFixed(1);
    const typeCount: Record<string, number> = {};
    data.forEach((d) => {
      typeCount[d.roof_type] = (typeCount[d.roof_type] || 0) + 1;
    });
    const mostCommon = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const totalEnergy = data
      .reduce(
        (acc, d) =>
          acc +
          (parseFloat(d.roof_size) / 1000) *
            ({ TPO: 1.2, Metal: 1.0, Foam: 1.5 }[d.roof_type as keyof typeof typeCount] || 1),
        0
      )
      .toFixed(2);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Projects" value={total} />
        <Card title="Avg Roof Size" value={avgSize} />
        <Card title="Most Common Roof Type" value={mostCommon} />
        <Card title="Total Energy Saved (MWh)" value={totalEnergy} />
      </div>
    );
  }
  
  function Card({ title, value }: { title: string; value: string | number }) {
    return (
      <div className="bg-white shadow rounded p-4 text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
    );
  }
  