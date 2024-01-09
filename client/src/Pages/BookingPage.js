import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

const BookingPage = () => {
    const params = useParams();
    const {user} = useSelector(state => state.user);
    const [doctors,setDoctors] = useState([]);
    const [date,setDate] = useState();
    const [time,setTime] = useState([]);
    const [isAvailable,setIsAvailable] = useState(false);

    const getUserData = async() => {
      try{
        const res = await axios.post('/api/v1/doctor/getDoctorById',
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
          try{
             const res = await axios.post('/api/v1/user/book-appointment',
            {
               doctorId:params.doctorId,
               userId:user._id,
               doctorInfo:doctors,
               userInfo:user,
               date:date,
               time:time,
            },
            {headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`,
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
            const res = await axios.post('/api/v1/user/booking-availability',
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
        <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerConsultation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
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
    </Layout>
  )
}

export default BookingPage