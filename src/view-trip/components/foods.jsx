import React from 'react';
import { Link } from 'react-router-dom';

function Foods({ trip, imageUrls }) {
  const foodRecommendations = trip?.TripData?.famousFoods || [];
  const locationLabel = trip?.userselection?.location?.label || "unknown location";

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Food Recommendations</h2>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
        {foodRecommendations.length > 0 ? (
          foodRecommendations.map((foodrec, index) => {
            const imageUrl = imageUrls?.[index] || '/placeholder.jpg';
            return (
              <div
                key={index}
                className="group transition-all hover:scale-110 hover:border-2 rounded-xl"
              >
                <Link
                  className="text-black no-underline"
                  to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    foodrec
                  )},${encodeURIComponent(locationLabel)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={imageUrl}
                    className="rounded-xl w-full h-[200px] object-cover"
                    alt={foodrec || 'Food recommendation'}
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                  <div className="my-2">
                    <h2 className="font-medium text-center text-black no-underline">
                      {foodrec || 'Unknown Food'}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No food recommendations available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Foods;
