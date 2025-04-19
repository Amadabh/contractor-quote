

// src/components/Filters.tsx
interface FiltersProps {
    showHeatmap: boolean;
    setShowHeatmap: (val: boolean) => void;
    filters: { roofType: string; state: string };
    setFilters: (val: { roofType: string; state: string }) => void;
  }
  
  export default function Filters({ showHeatmap, setShowHeatmap, filters, setFilters }: FiltersProps) {
    return (
      <div className="bg-white p-4 rounded shadow flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">View:</span>
          <button
            className={`px-4 py-2 rounded ${showHeatmap ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowHeatmap(true)}
          >
            Heatmap
          </button>
          <button
            className={`px-4 py-2 rounded ${!showHeatmap ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowHeatmap(false)}
          >
            Summary
          </button>
        </div>
        <div className="flex gap-4 flex-wrap">
          <select
            className="border rounded p-2"
            value={filters.roofType}
            onChange={(e) => setFilters({ ...filters, roofType: e.target.value })}
          >
            <option value="">All Roof Types</option>
            <option value="TPO">TPO</option>
            <option value="Metal">Metal</option>
            <option value="Foam">Foam</option>
          </select>
          <select
            className="border rounded p-2"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            <option value="">All States</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
          </select>
        </div>
      </div>
    );
  }