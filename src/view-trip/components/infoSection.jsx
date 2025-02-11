import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { createClient } from 'pexels';
import { GetPlaceDeatils } from '@/service/GlobalApi';

const Photo_ref_url =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=3840&maxWidthPx=2160&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip, setImageUrls }) {
  const key = import.meta.env.VITE_PIXL_API_KEY;
  const client = createClient(key);

  useEffect(() => {
    const fetchFoodImages = async () => {
      if (trip?.TripData?.famousFoods && trip?.TripData?.famousFoods.length > 0) {
        const urls = [];
        for (const food of trip.TripData.famousFoods) {
          try {
            const resp = await client.photos.search({ query: food, per_page: 1 });
            const largeImageUrl = resp?.photos?.[0]?.src?.large || '/placeholder.jpg';
            urls.push(largeImageUrl);
          } catch (error) {
            console.error(`Error fetching image for "${food}":`, error);
            urls.push('/placeholder.jpg');
          }
        }
        setImageUrls(urls);
      }
    };

    fetchFoodImages();
  }, [trip, setImageUrls]);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userselection?.location?.label,
    };

    const result = await GetPlaceDeatils(data).then((res) => {
      const photoName = res.data.places[0]?.photos?.[3]?.name;
      if (photoName) {
        const photoUrl = Photo_ref_url.replace('{NAME}', photoName);
        console.log('Place Photo URL:', photoUrl);
        document.getElementById('place-photo').src = photoUrl; // Update the image dynamically
      }
    });
  };

  return (
    <div>
      {/* Placeholder image will be replaced dynamically */}
      <img
        id="place-photo"
        src="/placeholder.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
        alt="Place Photo"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userselection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              🗓️ {trip?.userselection?.noofdays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              💲{trip?.userselection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              😀 No.of Traveler: {trip?.userselection?.WithWhom}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
