import json

# Load your JSON file
with open("fake_quote_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Prepare SQL lines
sql_lines = []

for row in data:
    # Escape single quotes in string values
    contractor = row['contractor'].replace("'", "''")
    company = row['company'].replace("'", "''")
    roof_type = row['roof_type'].replace("'", "''")
    city = row['city'].replace("'", "''")
    state = row['state']
    roof_size = int(row['roof_size'])
    date = row['date']

    sql = (
        "INSERT INTO quote (contractor, company, roof_size, roof_type, state, city, date) VALUES ("
        f"'{contractor}', "
        f"'{company}', "
        f"{roof_size}, "
        f"'{roof_type}', "
        f"'{state}', "
        f"'{city}', "
        f"'{date}');"
    )
    sql_lines.append(sql)

# Write all SQL statements to a file
with open("insert_quotes.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print("✅ insert_quotes.sql generated successfully!")
