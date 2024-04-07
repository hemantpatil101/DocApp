import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker,message } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
//import TimePicker from 'react-time-picker';

const BookingPage = () => {
    const params = useParams();
    const {user} = useSelector(state => state.user);
    const [doctors,setDoctors] = useState();
    const [date,setDate] = useState("");
    const [time,setTime] = useState("");
    const [isAvailable,setIsAvailable] = useState(false);

    const getUserData = async() => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/doctor/getDoctorById`,
        {doctorId:params.doctorId},
        {
           headers:{
             Authorization: `Bearer ${localStorage.getItem('token')}`,
           }
        })
        if(res.data.success)
        {
            setDoctors(res.data.data);
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }

    const handleBooking = async() => {
      try {
          const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/book-appointment`,
          {
            doctorId: params.doctorId,
            userId: user._id,
            doctorInfo: doctors,
            userInfo: user,
            date: date,
            time: time,
          },
          {
            headers:
            {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          })
            
            message.success(res.data.message);
          }
          catch(error)
          {
             console.log(error);
          }
    }

    const handleAvailability = async() => {
        try{
             
          console.log(date  + "  " + time);
            const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/booking-availability`,
           {
              doctorId:params.doctorId,
              date:date,
              time:time,
           },
           {headers:
           {
               Authorization:`Bearer ${localStorage.getItem('token')}`,
           }
           })
           if(res.data.success)
           {
              console.log(res);
              if(res.data.message=='Yes')
              {
                 message.success('This slot is Available');
                 setIsAvailable(true);
              }
              else
              {
                message.error('This slot is already Booked');
                setIsAvailable(false);
              }
           } 
         }
         catch(error)
         {
            console.log(error);
         }
    }

    useEffect(() => {
      getUserData();
    },[]);
  return (
    <Layout>
      <div>
        <h3 style={{ textAlign: "center",marginTop: '25px', padding: '30px' }} >📅 Booking Page</h3>
        <div className="container m-2" >
          {doctors && (
            <div style={{ textAlign: "center" }}>
              <h5>
                Dr.{doctors.firstName} {doctors.lastName}
              </h5>
              <h5>Fees : {doctors.feesPerConsultation}</h5>
              <h5>
                Timings : {doctors.timings && doctors.timings[0].substring(11, 16)} -{" "}
                {doctors.timings && doctors.timings[1].substring(11, 16)}{" "}
              </h5>
              <div className="d-flex flex-column align-items-center" >
                <DatePicker
                  aria-required={"true"}
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  aria-required={"true"}
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />

                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>

                {isAvailable &&
                  <button className="btn btn-dark mt-2" onClick={handleBooking}>
                    Book Now
                  </button>}
              </div>
            </div>
          )}
        </div>
      </div>

    </Layout>
  )
}

export default BookingPage