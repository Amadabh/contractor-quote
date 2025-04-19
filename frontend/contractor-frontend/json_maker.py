import pandas as pd
import json

# Load the CSV
df = pd.read_csv("uscities.csv")

# 1. Create statesWithCities.json
state_city_map = df.groupby('state_id')['city_ascii'].unique().to_dict()
state_city_map = {k: list(v) for k, v in state_city_map.items()}

with open('statesWithCities.json', 'w', encoding='utf-8') as f:
    json.dump(state_city_map, f, indent=2)

# 2. Create cityCoordsMap.json (CITY-STATE → lat/lng)
city_coords_map = {}
for _, row in df.iterrows():
    city = row['city_ascii'].strip().upper()
    state = row['state_id'].strip().upper()
    key = f"{city}-{state}"
    city_coords_map[key] = {
        "lat": float(row['lat']),
        "lng": float(row['lng'])
    }

with open('cityCoordsMap.json', 'w', encoding='utf-8') as f:
    json.dump(city_coords_map, f, indent=2)

print("✅ statesWithCities.json and cityCoordsMap.json have been created!")
