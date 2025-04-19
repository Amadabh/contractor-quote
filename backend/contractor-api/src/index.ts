import { setEngine } from "crypto";
import { json } from "stream/consumers";

interface QuoteSubmission {
	contractor: string;
	company: string;
	roof_size: string;
	roof_type: string;
	state: string;
	city: string;
	date: string;
  }
  

function jsonResponse(data, statusCode=200,){
	return new Response(data,
		{ headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Max-Age": "86400"
		},
		status : statusCode,
		});
}
export default {
	async fetch(request, env, ctx) {

		const path = new URL(request.url).pathname;
		const params = new URL(request.url).searchParams;

		console.log("Path" ,path)
		console.log("Method",request.method)
		await env.DB.prepare(`
			CREATE TABLE IF NOT EXISTS quote (
			  id INTEGER PRIMARY KEY AUTOINCREMENT,
			  contractor TEXT,
			  company TEXT,
			  roof_size INTEGER,
			  roof_type TEXT,
			  state TEXT,
			  city TEXT,
			  date TEXT
			);
		  `).run();

		if (request.method === "OPTIONS") {
			return jsonResponse(null,204)
		}
	
	if(request.method=="POST"){
		console.log("Post req")

		// const db = await env.DB;
		// db.s
		const body:QuoteSubmission = await request.json();
		if(path=="/store"){
			console.log("request",body)
			const {
				contractor,
				company,
				roof_size,
				roof_type,
				state,
				city,
				date,
			  } = body;
			
	  
			  await env.DB.prepare(`INSERT INTO quote (contractor,company,roof_size,roof_type,state,city,date)
				VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(contractor,
					company,
					roof_size,
					roof_type,
					state,
					city,
					date).run();
			    return  jsonResponse(JSON.stringify("Inserted successfully")) 
			  
		}
		  


	}

    



	if (request.method=="GET"){
        if(path=="/contracts"){
			const state = params.get('state');
			const roofType = params.get("roofType")

			if( (state === null && roofType === null) || (state !== null && roofType !== null)) {
				return jsonResponse(JSON.stringify({"error" : "please pass one of state or roofType query parameter"}),400)
			}
			
			if(state !== null) {
				const {results} = await env.DB.prepare(
					"SELECT * FROM quote WHERE state = ?",
				).bind(state).all()
				return jsonResponse(JSON.stringify(results))
			}else {
				const {results} = await env.DB.prepare(
					"SELECT * FROM quote WHERE roof_type = ?",
				).bind(roofType).all()
				return jsonResponse(JSON.stringify(results))
			}
		}
	
		if (path === "/heatmap") {
			const { results } = await env.DB.prepare("SELECT city, state FROM quote").all();
		  
			// Group count by city-state
			const map = {};
			for (const row of results) {
			  const key = `${row.city.trim().toUpperCase()}-${row.state.trim().toUpperCase()}`;
			  map[key] = (map[key] || 0) + 1;
			}
		  
			return jsonResponse(JSON.stringify(map));
		  }
	}

	},
  };
