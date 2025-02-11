import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/infoSection.jsx';
import Foods from '../components/foods.jsx';
import Placetovisit from '../components/Placetovisti.jsx';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'Trip-Rec', tripId);
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      console.log('Document:', docsnap.data());
      setTrip(docsnap.data());
    } else {
      console.log('No such document');
      toast('No trip found!');
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip} setImageUrls={setImageUrls} />
      <Foods trip={trip} imageUrls={imageUrls} />
      <Placetovisit trip={trip} />
    </div>
  );
}

export default Viewtrip;
