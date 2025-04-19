// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import HeatmapView from '../components/HeatmapView';
import SummaryCards from '../components/SummaryCards';
import ChartsSection from '../components/ChartsSection';
import statesWithCities from '../assets/statesWithCities.json';
import { FiFilter } from 'react-icons/fi';
import {  FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Project {
  contractor: string;
  company: string;
  roof_size: string;
  roof_type: string;
  state: string;
  city: string;
  date: string;
}

interface FilterState {
  state: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showHeatmap,setShowHeatmap] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    dateRange: { start: '', end: '' }
  });
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [filteredData, setFilteredData] = useState<Project[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  useEffect(() => {
    if (!filters.state) return;

    const url = `${import.meta.env.VITE_BASE_URL}/contracts?state=${filters.state}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProjectData(data);
      });
  }, [filters.state]);

  useEffect(() => {
    const data = projectData.filter((item) => {
      const matchesStartDate = !filters.dateRange.start || item.date >= filters.dateRange.start;
      const matchesEndDate = !filters.dateRange.end || item.date <= filters.dateRange.end;
      return matchesStartDate && matchesEndDate;
    });
    setFilteredData(data);
  }, [filters.dateRange, projectData]);

  return (
    <div className="w-[95%] ml-auto mr-auto mt-4">
      <div className='h-14 flex flex-row w-full justify-between'>
        <div className={`p-2 flex flex-row w-2/3 md:w-1/3 gap-[-2px]`}>
        <button 
          onClick={() => navigate("/")}
          className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 hover:scale-120 hover:cursor-pointer"
          aria-label="Go back"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
          <div 
            onClick={() => setShowHeatmap((prev) => !prev)}
            className={`rounded-2xl w-1/2 place-items-center place-content-center hover:cursor-pointer transition-all duration-400 ease-in-out ${showHeatmap ? "bg-blue-200 z-20" : "bg-gray-200"}`}>
              <p className='font-semibold text-gray-800 text-center'>Heat Map</p>
          </div>
          <div
            onClick={() => setShowHeatmap((prev) => !prev)}
            className={`ml-[-24px] rounded-2xl w-1/2 place-items-center place-content-center hover:cursor-pointer transition-all duration-400 ease-in-out ${!showHeatmap ? "bg-blue-200 z-20" : "bg-gray-200"}`}>
              <p className='font-semibold text-gray-800 text-center'>Summary</p>
          </div>
        </div>

        
        <div className="hidden lg:flex gap-4 items-center justify-end w-2/3">
          <label className="text-sm font-medium">State:</label>
          <select
            className="bg-white border border-gray-300 rounded px-4 py-2 shadow-sm hover:cursor-pointer"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            <option value="" disabled>Select a state</option>
            {Object.keys(statesWithCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <label className="text-sm font-medium">Start Date:</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-4 py-2 shadow-sm"
            value={filters.dateRange.start}
            onChange={(e) => setFilters({
              ...filters,
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
          />

          <label className="text-sm font-medium">End Date:</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-4 py-2 shadow-sm"
            value={filters.dateRange.end}
            onChange={(e) => setFilters({
              ...filters,
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
          />
        </div>

        <button 
          className="lg:hidden flex items-center gap-2 bg-blue-500 text-white px-2 rounded-lg"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FiFilter />
          <span>Filters</span>
        </button>
      </div>
      
      {showMobileFilters && (
        <div className="md:hidden bg-white p-4 rounded-lg shadow-md mt-2 mb-4 transition-all duration-400 ease-in-out">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">State:</label>
              <select
                className="w-full bg-white border border-gray-300 rounded px-4 py-2 shadow-sm"
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              >
                <option value="" disabled>Select a state</option>
                {Object.keys(statesWithCities).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date:</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
                value={filters.dateRange.start}
                onChange={(e) => setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date:</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
                value={filters.dateRange.end}
                onChange={(e) => setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
              />
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="pt-4">
        {showHeatmap ? (
          <HeatmapView />
        ) : (
          <SummaryCards data={filteredData} />
        )}
        <ChartsSection data={filteredData} />
      </div>
    </div>
  );
}
