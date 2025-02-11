import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions } from '../constants/options';
import { SelectTravelesList } from '../constants/options';
import { Button } from '../components/ui/button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const apiKey = import.meta.env.VITE_GEMINI_API;
const URL = import.meta.env.VITE_PIC_RADIO_URL;
const xkey = import.meta.env.VITE_PIC_API;
const host = import.meta.env.VITE_HOST;
const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
function CreateTrip() {
  const [place, setPlace] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    noofdays: '',
    budget: '',
    WithWhom: ''
  });

  const [openDailog, setopendailog] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const navigate = useNavigate();

  useEffect(() => {
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => Getuserprofiles(codeResp),
    onerror: (error) => console.log(error)
  })
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setopendailog(true);
      return;
    }
    if ((!formData?.location)) {
      toast.error("Please select a Destination for your trip", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "16px",
          padding: "15px",
          borderRadius: "10px",
          width: "500px",
        },
      });
      return;
    } else if (parseInt(formData?.noofdays) > 5) {
      toast.error("Number of Days should be less than 6", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "16px",
          padding: "15px",
          borderRadius: "10px",
          width: "500px",
        },
      });
      return;
    } else if ((!formData?.noofdays || formData?.noofdays == 0)) {
      toast.error("Please select a duration of at least 1 day for your trip", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "16px",
          padding: "15px",
          borderRadius: "10px",
          width: "500px",
        },
      });
      return;
    } else if ((!formData?.budget)) {
      toast.error("Please select a budget for your trip", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "16px",
          padding: "15px",
          borderRadius: "10px",
          width: "500px",
        },
      });
      return;
    } else if ((!formData?.WithWhom)) {
      toast.error("Select the group type to personalize your trip experience!", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontSize: "16px",
          padding: "15px",
          borderRadius: "10px",
          width: "500px",
        },
      });
      return;

    } else {
      setLoading(true);
      const Final_Promt = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{noofday}', formData?.noofdays)
        .replace('{WithWhom}', formData?.WithWhom)
        .replace('{budget}', formData?.budget)
        .replace('{noofdays}', formData?.noofdays)
      console.log(Final_Promt)
      const result = await model.generateContent(Final_Promt)
      setLoading(false);
      console.log(result?.response?.text());
      let response = result?.response?.text();
      let cleanedResponse = response.replace(/^```json\n/, '');
      let cleanedRespons = cleanedResponse.replace("```", '');
      console.log(cleanedRespons);
      SaveAITrip(cleanedRespons)
    }
  };
  const SaveAITrip = async (Tripdata) => {
    setLoading(true);
      const docid = Date.now().toString()
      const user = JSON.parse(localStorage.getItem('user'));
      await setDoc(doc(db, "Trip-Rec", docid), {
        userselection: formData,
        TripData:JSON.parse(Tripdata),
        Useremail: user?.email,
        id: docid
      });
      setLoading(false);
      navigate('/view-trip/'+docid)

  }
  const Getuserprofiles = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {

      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setopendailog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Share Your Travel Dreams, and We'll Turn Them into Reality 🦋</h2>
      <p className='mt-3 text-gray-700'>Give us a few details, and our trip planner will craft a personalized itinerary just for you!</p>
      <div className='mt-10 flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'> Where do you want to go? ✈️</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium mt-5'> How many days are you planning for your adventure!</h2>
          <Input
            placeholder={'Ex. 2'}
            onChange={(e) => handleInputChange('noofdays', e.target.value)}
            type='number'
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'> What's your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
              ${formData?.budget === item.title && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium mt-10'> Who will you be sharing this unforgettable journey with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('WithWhom', item.people)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
              ${formData?.WithWhom === item.people && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center items-end mt-10'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {
            loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'

          }
        </Button>
      </div>
      <div>
        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button onClick={login}
                  className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='h-7 w-7' />Sign in with Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTrip;
