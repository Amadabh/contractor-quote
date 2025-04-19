
# EnKoat Contractor Quote Portal & Performance Dashboard

## 🚀 Project Summary

This full-stack web application enables roofing contractors to submit project quotes and provides a dynamic dashboard for analyzing project data.

### ✨ Features

1. **Contractor Quote Submission Form (Frontend):**  
   A responsive form built using React and Tailwind CSS that captures:
   - Contractor Name  
   - Company  
   - Roof Size (sq ft)  
   - Roof Type (Metal, TPO, Foam, etc.)  
   - Project City and State  
   - Project Date  

2. **Backend REST API with Cloudflare D1:**  
   Built using Cloudflare Workers and D1, the backend provides:
   - Endpoints to store and retrieve quote submissions
   - A dedicated endpoint to serve heatmap data 
   - Real-time storage of form submissions in a D1 database 

3. **Performance Dashboard (Frontend):**  
   A dashboard displaying insights from over 1000 mock roofing projects using:
   - **Bar Chart:** Average roof size by roof type  
   - **Pie Chart:** Estimated energy saved by roof type  
   - **Line Chart:** Monthly trend of completed projects  
   - **Summary Section:** Total Projects, Average Roof Size, Most Common Roof Type, Total Energy Saved (randomized)

4. **Interactive City Heatmap:**  
   Using React Leaflet, a city-level heatmap visualizes project density. Latitude and longitude values were added using a [Kaggle US Cities dataset](https://www.kaggle.com/datasets/...) to accurately map cities from **50 U.S. states**.

---

## 🛠️ Tools Used

- **Frontend:** React, Tailwind CSS, Chart.js, React Leaflet  
- **Backend:** Cloudflare Workers (Wrangler), Cloudflare D1  
- **Data Visualization:** Chart.js (Bar, Pie, Line)  
- **Mapping:** React Leaflet + `uscities.csv`  
- **Deployment:** Cloudflare Pages & Workers

---

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Amadabh/contractor-quote.git
cd contractor-quote
```

### 2. Install frontend dependencies
```bash
cd frontend
bun install
bun run dev
```

### 3. Start backend API (Cloudflare Worker)
```bash
cd ../backend
wrangler dev
```

> ⚠️ Make sure your `wrangler.toml` is configured to connect to your Cloudflare D1 database.

---

## 📊 Mock Data

A dataset of **1000 synthetic project entries** was generated across **50 U.S. states**,and migrated to the production database featuring:
- Varied contractor and company names  
- Multiple roof types and sizes  
- Diverse city/state pairs  
- Random project dates within the past year  
- Simulated energy savings (randomized)  

Geo-coordinates were sourced using the `uscities.csv` dataset for heatmap accuracy.

---

## 🔧 What I'd Improve With More Time

- Add login/authentication for contractor users  
- Allow file uploads or supporting documents with submissions  
- Replace mocked energy values with a realistic estimation model or API  
- Add analytics export (CSV/PDF)  
- Improve filtering with multi-select and better UX  
- Introduce automated tests and CI/CD integration  
