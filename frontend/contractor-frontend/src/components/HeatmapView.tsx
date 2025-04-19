import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { useEffect, useState } from 'react';
import cityCoordsMap from '../assets/cityCoordsMap.json' assert { type: 'json' };

const typedCityCoordsMap: Record<string, { lat: number; lng: number }> = cityCoordsMap;

export default function HeatmapView() {
  const [points, setPoints] = useState<number[][]>([]);

  useEffect(() => {
    fetch('http://localhost:8787/heatmap')
      .then(res => res.json())
      .then((data) => {
        const mapped = Object.entries(data)
          .map(([key, count]) => {
            const coords = typedCityCoordsMap[key];
            if (!coords) return null;
            return [coords.lat, coords.lng, count];
          })
          .filter(Boolean) as number[][];

        setPoints(mapped);
      });
  }, []);

  return (
    <div className="w-full h-[400px] shadow-lg">
      <MapContainer center={[37.8, -96]} zoom={4} scrollWheelZoom className="h-full w-full z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <HeatmapLayer data={points} />
      </MapContainer>
    </div>
  );
}

function HeatmapLayer({ data }: { data: number[][] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !data.length) return;

    const heat = (window as any).L.heatLayer(data, {
      radius: 40,
      blur: 0
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [data, map]);

  return null;
}
