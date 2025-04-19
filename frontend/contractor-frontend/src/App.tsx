import React, { useState } from 'react'
import statesWithCities from './assets/statesWithCities.json';
import './App.css'
import { FiArrowUpRight } from 'react-icons/fi';

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setCityInput("");
    setSuggestions([]);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCityInput(input);

    if (selectedState && input.length > 0) {
      const matches = statesWithCities[selectedState as keyof typeof statesWithCities].filter((city) =>
        city.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  interface PostData {
    contractor: string;
    company: string;
    roof_size: number;
    roof_type: string;
    state: string;
    city: string;
    date: Date;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      contractor: { value: string },
      company: { value: string },
      roof_size: { value: number },
      roof_type: { value: string },
      state: { value: string },
      city: { value: string },
      date: { value: Date }
    }

    const postData: PostData = {
      contractor: target.contractor.value,
      company: target.company.value,
      roof_size: target.roof_size.value,
      roof_type: target.roof_type.value,
      state: target.state.value,
      city: target.city.value,
      date: target.date.value
    };

    try {
      const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      });
      const jsonResp = await resp.json();
      console.log("Response:", jsonResp);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Contractor Quote</h1>
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span className="font-medium">Dashboard</span>
            <FiArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form className="bg-white rounded-lg shadow-sm p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contractor Name
              </label>
              <input
                id="contractor"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Company
              </label>
              <input
                id="company"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                placeholder="Company Name"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Roof Size (sqft)
              </label>
              <input
                id="roof_size"
                type="number"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="1000"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Roof Type
              </label>
              <select
                id="roof_type"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                defaultValue=""
                required
              >
                <option value="" disabled>Select a roof type</option>
                <option value="Metal">Metal</option>
                <option value="TPO">TPO</option>
                <option value="Foam">Foam</option>
                <option value="Asphalt Shingles">Asphalt Shingles</option>
                <option value="Clay Tiles">Clay Tiles</option>
                <option value="Slate">Slate</option>
                <option value="Wood Shingles">Wood Shingles</option>
                <option value="Concrete">Concrete</option>
                <option value="Green Roof">Green Roof</option>
              </select>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 relative">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Project Location
              </label>
              
              <select
                id="state"
                onChange={handleStateChange}
                value={selectedState}
                className="mb-4 appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                required
              >
                <option value="" disabled>Select a State</option>
                {Object.keys(statesWithCities).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              {selectedState && (
                <div className="relative">
                  <input
                    id="city"
                    type="text"
                    value={cityInput}
                    onChange={handleCityChange}
                    placeholder="Start typing a city..."
                    className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    required
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {suggestions.map((city, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCityInput(city);
                            setSuggestions([]);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Project Date
              </label>
              <input
                id="date"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="date"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 hover:cursor-pointer"
            >
              Submit Quote
              <FiArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App