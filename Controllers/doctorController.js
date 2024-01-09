const appointmentModel = require("../Models/appointmentModel");
const doctorModel = require("../Models/doctorModel");
const userModel = require("../Models/userModel");

const getDoctorInfoController = async(req,res) =>{
    try{
       const doctor = await doctorModel.findOne({userId:req.body.userId});
       res.status(200).send({
        success:true,
        message:"Doctor Data Fetched Successfully",
        data:doctor,
       })
     }
    catch(error)
    {
       console.log(error);
       res.status(200).send({
          success:false,
          message:'Error in Fetching Data',
          error
       })
    }
}

const updateProfileController = async(req,res) => {
    try{
        const doctor = await doctorModel.findOneAndUpdate(
            {userId:req.body.userId},
            req.body
        );

        res.status(200).send({
            success:true,
            message:'Doctor Profile Updated',
            data:doctor,
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Doctor Profile Update Failed',
            error
        })
    }
}

const getDoctorByIdController = async(req,res) => {
    try{
       const doctor = await doctorModel.findOne({_id:req.body.doctorId});
       res.status(200).send({
        success:true,
        message:'Doctor fetched Successfully',
        data:doctor,
    })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Fetching Doctor',
            error
        })
    }
}

const doctorAppointmentsController = async(req,res) =>{
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointments = await appointmentModel.find({
            doctorId:doctor._id,
        })
        console.log(doctor);
        console.log(appointments);
       res.status(200).send({
        success:true,
        message:'Doctor Appointments fetched Successfully',
        data:appointments,
    })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Doctor Appointments',
            error
        })
    }
}

const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };

module.exports = {getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController};