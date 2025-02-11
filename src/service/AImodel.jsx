import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GEMINI_AP;
  console.log(apiKey);
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "\nGenerate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display real-time information, including hotel prices, availability, images, and real-time ratings.  Hotel prices and availability are extremely dynamic and change constantly.  Also, I cannot access and display images directly.\n\nHowever, I can provide you with a JSON template that you can populate with information you find yourself using resources like Google Maps, Booking.com, Expedia, TripAdvisor, etc.  Remember to always check for the most up-to-date prices and availability before booking.\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, NV\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\",\n    \"travelers\": \"Couple\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"Hotel Name 1\",\n      \"address\": \"Hotel Address 1\",\n      \"price\": \"Price Range (e.g., $50-$80/night)\",\n      \"imageUrl\": \"URL to Hotel Image 1\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 3.5,\n      \"description\": \"Hotel Description 1\"\n    },\n    {\n      \"name\": \"Hotel Name 2\",\n      \"address\": \"Hotel Address 2\",\n      \"price\": \"Price Range (e.g., $60-$90/night)\",\n      \"imageUrl\": \"URL to Hotel Image 2\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1234,\n        \"longitude\": -115.2345\n      },\n      \"rating\": 4.0,\n      \"description\": \"Hotel Description 2\"\n    },\n    {\n      \"name\": \"Hotel Name 3\",\n      \"address\": \"Hotel Address 3\",\n      \"price\": \"Price Range (e.g., $40-$70/night)\",\n      \"imageUrl\": \"URL to Hotel Image 3\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0987,\n        \"longitude\": -115.1765\n      },\n      \"rating\": 3.0,\n      \"description\": \"Hotel Description 3\"\n\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip (Walking Tour)\",\n        \"placeDetails\": \"Walk the length of the Strip, taking in the sights and sounds.  Free!\",\n        \"placeImageUrl\": \"URL to Strip Image\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1728\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeToSpend\": \"4-6 hours\"\n      },\n      {\n        \"placeName\": \"In-N-Out Burger\",\n        \"placeDetails\": \"Budget-friendly and delicious West Coast burger chain.\",\n        \"placeImageUrl\": \"URL to In-N-Out Image\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1111,\n          \"longitude\": -115.1888\n        }, \n        \"ticketPricing\": \"$10-$15 per person\",\n        \"rating\": 4.0,\n        \"timeToSpend\": \"1 hour\"\n      }\n\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free light show and street performers in Downtown Las Vegas.\",\n        \"placeImageUrl\": \"URL to Fremont Street Image\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1398\n        },\n        \"ticketPricing\": \"Free (optional paid attractions)\",\n        \"rating\": 4.0,\n        \"timeToSpend\": \"3-4 hours\"\n      },\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation south of the city (requires transportation).\",\n        \"placeImageUrl\": \"URL to Seven Magic Mountains Image\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0219,\n          \"longitude\": -114.9161\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.2,\n        \"timeToSpend\": \"1-2 hours\"\n      }\n\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Hiking trails and scenic drives (requires transportation, small entrance fee).\",\n        \"placeImageUrl\": \"URL to Red Rock Canyon Image\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.2144,\n          \"longitude\": -115.7611\n        },\n        \"ticketPricing\": \"$15-$20 per vehicle\",\n        \"rating\": 4.5,\n        \"timeToSpend\": \"4-6 hours\"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data from your research.  Consider using public transportation or ride-sharing services to save on transportation costs in Las Vegas.  Enjoy your trip!\n"},
          ],
        },
      ],
    }); 
  run();