import random
import json
from datetime import datetime, timedelta

# Sample values to randomize from
contractors = ["Alpha Roofing", "Skyline Contractors", "TopShield Inc.", "RainProof LLC", "EcoRoofs"]
companies = ["BuildPro", "RoofRight", "GreenBuilders", "SafeTop", "UrbanSky"]
roof_types = ["TPO", "Metal", "Foam", "Asphalt Shingles", "Clay Tiles", "Slate", "Wood Shingles", "Concrete", "Green Roof"]
states = ["CA", "AZ", "TX", "FL", "NY"]
cities_by_state = {
    "CA": ["Los Angeles", "San Diego", "San Francisco", "Sacramento"],
    "AZ": ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
    "TX": ["Houston", "Dallas", "Austin", "San Antonio"],
    "FL": ["Miami", "Orlando", "Tampa", "Jacksonville"],
    "NY": ["New York", "Buffalo", "Rochester", "Albany"]
}



def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

# Generate 1000 fake entries
fake_data = []
for _ in range(1000):
    state = random.choice(states)
    city = random.choice(cities_by_state[state])
    entry = {
        "contractor": random.choice(contractors),
        "company": random.choice(companies),
        "roof_size": str(random.randint(500, 5000)),
        "roof_type": random.choice(roof_types),
        "state": state,
        "city": city,
        "date": random_date(datetime(2022, 1, 1), datetime(2024, 12, 31)).strftime("%Y-%m-%d")
    }
    fake_data.append(entry)

# Output as JSON
fake_data[:5]  # Show a sample of 5 rows
