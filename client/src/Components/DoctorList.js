import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
    console.log(doctor);

  return (
     <>
       <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.Specialization}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>
     </>
  )
}

export default DoctorList