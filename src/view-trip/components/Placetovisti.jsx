// // import React from 'react';
// // import Placecard from './Placecard';

// // function Placetovisit({ trip }) {
// //   const itinerary = trip?.TripData?.itinerary || {};

// //   console.log('Itinerary:', itinerary); // Debugging log

// //   return (
// //     <div className="mt-5">
// //       <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
// //       {Object.keys(itinerary).length > 0 ? (
// //         <div className="space-y-6">
// //           {Object.entries(itinerary)
// //             .sort(
// //               ([keyA], [keyB]) =>
// //                 parseInt(keyA.replace('day', ''), 10) -
// //                 parseInt(keyB.replace('day', ''), 10)
// //             )
// //             .map(([dayKey, { places }], index) => (
// //               <div key={index} className="border rounded-lg p-4 shadow-sm mt-2">
// //                 {/* Display the day */}
// //                 <h3 className="font-bold text-lg mb-2">
// //                   {`Day ${index + 1}`} {/* Corrected day format */}
// //                 </h3>

// //                 {/* Places grid */}
// //                 {Array.isArray(places) && places.length > 0 ? (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                     {places.map((place, idx) => (
// //                       <Placecard
// //                         key={idx}
// //                         place={place.placeName}
// //                         placeDetails={place.placeDetails}
// //                         time={place.time}
// //                       />
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <p>No places available for this day.</p>
// //                 )}
// //               </div>
// //             ))}
// //         </div>
// //       ) : (
// //         <p>No itinerary available.</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default Placetovisit;


// import React from 'react';
// import Placecard from './Placecard';

// function Placetovisit({ trip }) {
//   const itinerary = trip?.TripData?.itinerary || {};

//   console.log('Itinerary:', itinerary); // Debugging log

//   return (
//     <div className="mt-5">
//       <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
//       {Object.keys(itinerary).length > 0 ? (
//         <div className="space-y-6">
//           {Object.entries(itinerary)
//             .sort(
//               ([keyA], [keyB]) =>
//                 parseInt(keyA.replace('day', ''), 10) -
//                 parseInt(keyB.replace('day', ''), 10)
//             )
//             .map(([dayKey, placesArray], index) => (
//               <div key={index} className="border rounded-lg p-4 shadow-sm mt-2">
//                 {/* Display the day */}
//                 <h3 className="font-bold text-lg mb-2">
//                   {`Day ${index + 1}`}
//                 </h3>

//                 {/* Places grid */}
//                 {Array.isArray(placesArray) && placesArray.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     {placesArray.map((place, idx) => (
//                       <Placecard
//                         key={idx}
//                         place={place.placeName}
//                         placeDetails={place.placeDetails}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <p>No places available for this day.</p>
//                 )}
//               </div>
//             ))}
//         </div>
//       ) : (
//         <p>No itinerary available.</p>
//       )}
//     </div>
//   );
// }

// export default Placetovisit;
import React from 'react';
import Placecard from './Placecard';

function Placetovisit({ trip }) {
  const itinerary = trip?.TripData?.itinerary || {};

  console.log('Itinerary:', itinerary); // Debugging log

  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg mb-4">Places to Visit</h2>
      {Object.keys(itinerary).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(itinerary)
            .sort(
              ([keyA], [keyB]) =>
                parseInt(keyA.replace('day', ''), 10) -
                parseInt(keyB.replace('day', ''), 10)
            )
            .map(([dayKey, dayData], index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm mt-2">
                {/* Display the day */}
                <h3 className="font-bold text-lg mb-2">
                  {`Day ${index + 1}`}
                </h3>

                {/* Handle both array and object formats */}
                {Array.isArray(dayData) ? (
                  dayData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {dayData.map((place, idx) => (
                        <Placecard
                          key={idx}
                          place={place.placeName}
                          placeDetails={place.placeDetails}
                          time={place.time}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No places available for this day.</p>
                  )
                ) : dayData.places ? (
                  Array.isArray(dayData.places) && dayData.places.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {dayData.places.map((place, idx) => (
                        <Placecard
                          key={idx}
                          place={place.placeName}
                          placeDetails={place.placeDetails}
                          time={place.time}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No places available for this day.</p>
                  )
                ) : (
                  <p>No valid data available for this day.</p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p>No itinerary available.</p>
      )}
    </div>
  );
}

export default Placetovisit;