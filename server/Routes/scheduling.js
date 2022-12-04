const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

const formatDate = (date) => {
    const dateAmOrPm = date.getHours() / 12 === 1 ? 'PM' : 'AM';

    let dateHour = date.getHours();
    if (dateHour === 0) dateHour = 12;
    else if (dateHour > 12) dateHour -= - 12;

    let dateSecond = date.getSeconds().toString();
    if (dateSecond.length === 1) dateSecond = '0' + dateSecond;

    let dateMinute = date.getMinutes().toString();
    if (dateMinute.length === 1) dateMinute = '0' + dateMinute;

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${dateHour}:${dateMinute}:${dateSecond} ${dateAmOrPm}`;
}





// TODO: - Clean up commented code in functs
//       - Perform validation of tokens at beginning of each method






// @route GET /api/scheduling/trainerAppointments
// @desc Get a list of appointments for a trainer
// @access Public
router.get('/trainerAppointments', async (req, res) => {
    // // Get the access token from the header
    // const { authorization } = req.headers;
    // const accessToken = authorization.split(' ')[1];
  
    // let session = await Session.findOne({ accessToken: accessToken });
    // // Check if a session with this trainer exists
    // if (!session) {
    //     let err = 'Could not find the given accessToken!';
    //     res.status(401).json(err);
    //     return;
    // }

    // let email = session.email;
    const { email, filterStartTime, filterEndTime } = req.body;
    
    const trainer = await User.findOne({ email: email });
    // Check if trainer exists and if they are a trainer
    if (!trainer) {
        let err = 'Could not find the given email!';
        res.status(401).send(err);
        return;
    }
    // Check if trainer is a trainer
    if (trainer.role !== 'trainer') {
        let err = 'You must be a trainer to open appointments!';
        res.status(401).send(err);
        return;
    }
    

    // Build the filters for the appointments
    let filters = { email: email };
    console.log(filterStartTime && filterEndTime);
    if (filterStartTime && filterEndTime) {
        filters.startTime = {
            $gt: filterStartTime, 
            $lt: filterEndTime
        };
    }

    console.log(filters);
    const appointments = await Appointment.find(filters);
    // Check for an error
    if (!appointments) {
        let err = `Error finding appointments for ${email}!`;
        res.status(401).send(err);
        return;
    }

    res.status(200).json(appointments);
});

// Returns an error if the request body does not follow the restrictions below
const validateOpenAppointmentsRequest = (req) => {
    const { startDay, endDay, appointmentTime } = req.body;

    const endDayDate = new Date(Number.parseInt(endDay));
    const appointmentTimeDate = new Date(Number.parseInt(appointmentTime));

    if (!(endDayDate.getMinutes() !== 0 || endDayDate.getMinutes() !== 30) || endDayDate.getSeconds() !== 0)
        return 'endDay must have a time of XX:00:00 XM or XX:30:00 XM.';
    if (endDayDate.getHours() !== appointmentTimeDate.getHours() 
        || endDayDate.getMinutes() !== appointmentTimeDate.getMinutes()
        || endDayDate.getSeconds() !== appointmentTimeDate.getSeconds())
        return 'appointmentTime must have a time of XX:00:00 XM or XX:30:00 XM.'
    if (!(appointmentTimeDate <= endDayDate))
        return 'appointmentTime must be before endDay.'
    if (appointmentTimeDate.getDay() !== endDayDate.getDay())
        return 'appointmentTimeDate must be the same day of the week as endDayDate.'
}

// @route POST /api/scheduling/openAppointments
// @desc Open a series of recurring appointments for scheduling
// @access Public
/*
    Request:
        - authorization: 'Bearer {accessToken}'
        - endDay: A unix time in milliseconds representing the last date (excluded) in the series. 
                    This must have the same hours, minutes, and time as appointmentTime and must have a time of XX:00:00 XM or
                    XX:30:00 XM. 
        - appointmentTime: A unix time in milliseconds representing the appointment start time for the series of appointments.
                    This must have the same hours, minutes, and time as endDay and must have a time of XX:00:00 XM or
                    XX:30:00 XM. 
*/
router.post('/openAppointments', async (req, res) => {
    // // Get the access token from the header
    // const { authorization } = req.headers;
    // const accessToken = authorization.split(' ')[1];
  
    // let session = await Session.findOne({ accessToken: accessToken });
    // // Check if a session with this trainer exists
    // if (!session) {
    //     let err = 'Could not find the given accessToken!';
    //     res.status(401).json(err);
    //     return;
    // }

    // let email = session.email;
    const validationErr = validateOpenAppointmentsRequest(req)
    if (validationErr) {
        let err = validationErr;
        res.status(401).send(err);
        return;
    }
    const { email, startDay, endDay, appointmentTime } = req.body; // get startTime from body
    // const startDayDate = new Date(Number.parseInt(startDay));
    const endDayDate = new Date(Number.parseInt(endDay));
    const appointmentTimeDate = new Date(Number.parseInt(appointmentTime));
    
    const trainer = await User.findOne({ email });
    // Check if trainer exists and if they are a trainer
    if (!trainer) {
        let err = 'Could not find the given email!';
        res.status(401).send(err);
        return;
    }
    // Check if trainer is a trainer
    if (trainer.role !== 'trainer') {
        let err = 'You must be a trainer to open appointments!';
        res.status(401).send(err);
        return;
    }
    
    let appointmentsToOpen = [];
    while (appointmentTimeDate < endDayDate) {
        appointmentsToOpen.push(new Appointment({
            trainerId: trainer._id,
            startTime: appointmentTimeDate.getTime(),
        }));
        appointmentTimeDate.setDate(appointmentTimeDate.getDate() + 7);
    }
    
    let savedAppointments = await Appointment.insertMany(appointmentsToOpen);
    if(!savedAppointments) {
        let err = 'Could not save appointments to the database!';
        res.status(401).send(err);
        return;
    }

    res.status(200).json(savedAppointments);
});

// @route POST /api/scheduling/closeAppointment
// @desc Remove an appointment from the database
// @access Public
router.post('/closeAppointment', async (req, res) => {
    // // Get the access token from the header
    // const { authorization } = req.headers;
    // const accessToken = authorization.split(' ')[1];
  
    // let session = await Session.findOne({ accessToken: accessToken });
    // // Check if a session with this trainer exists
    // if (!session) {
    //     let err = 'Could not find the given accessToken!';
    //     res.status(401).json(err);
    //     return;
    // }

    // let email = session.email;
    const { email, appointmentId } = req.body; // get appointmentId from body
    
    const trainer = await User.findOne({ email: email });
    // Check if trainer exists
    if (!trainer) {
        let err = 'Could not find the given email!';
        res.status(401).send(err);
        return;
    }
    // Check if trainer is a trainer
    if (trainer.role !== 'trainer') {
        let err = 'You must be a trainer to close appointments!';
        res.status(401).send(err);
        return;
    }
    
    const closedAppointment = await Appointment.findByIdAndDelete(appointmentId).exec();
    if (!closedAppointment) {
        let err = 'Could not find the specified appointment!';
        res.status(401).send(err);
        return;
    }

    // Email the customer if the appointment was booked
    if (closedAppointment.customerId) {
    
        const customer = await User.findOne({ _id: closedAppointment.customerId });
        // Check if customer exists
        if (!customer)
            return;

        // async process from here to endif
        
        // Create a SMTP transporter to send mail to the trainer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.SCHEDULING_EMAIL_ADDRESS}`,
                pass: `${process.env.SCHEDULING_EMAIL_PASSWORD}`
            }
        });

        // Configure the email
        const mailOptions = {
            from: `${process.env.SCHEDULING_EMAIL_ADDRESS}`,
            to: customer.email,
            subject: 'Appointment Cancellation',
            text:
            `Dear ${customer.name},\n\nYou are receiving this because ${trainer.name} canceled your appointment for`
            + ` ${formatDate(new Date(closedAppointment.startTime))}. Please note you will need to`
            + ` schedule a new appointment with ${trainer.name} because of this cancellation.\n\n`
            + `Sincerely,\nThe Fitocity Team`
        };

        // Send the eamil
        transporter.sendMail(mailOptions, (err) => {
            if (err)
                console.error(err);
        });
    }

    res.status(200).json(closedAppointment);
});

// @route POST /api/scheduling/bookAppointment
// @desc Register a user for an appointment with a trainer
/*
  Request:
      - authorization: 'Bearer {accessToken}'
      - appointmentId: the id of the appointment
*/
// @access Public
router.post('/bookAppointment', async (req, res) => {
  // // Get the access token from the header
  // const { authorization } = req.headers;
  // const accessToken = authorization.split(' ')[1];

  // let session = await Session.findOne({ accessToken: accessToken });
  // // Check if a session with this trainer exists
  // if (!session) {
  //     let err = 'Could not find the given accessToken!';
  //     res.status(401).json(err);
  //     return;
  // }

  // let email = session.email;
  const { email, appointmentId } = req.body; // get startTime from body
  
  const user = await User.findOne({ email });
  // Check if user exists
  if (!user) {
      let err = 'Could not find the given email!';
      res.status(401).send(err);
      return;
  }
  // Check if user is a user
  if (user.role !== 'user') {
      let err = 'You must be a user to book appointments!';
      res.status(401).send(err);
      return;
  }
  

  let appointment = await Appointment.findById(appointmentId).exec();
  if (!appointment) {
    console.log(appointment);
      let err = 'Could not find the requested appointment!';
      res.status(401).send(err);
      return;
  }
  // Check if the appointment is already booked
  if (appointment.customerId !== '') {
      let err = 'The requested appointment has already been booked!';
      res.status(401).send(err);
      return;
  }

  // Change the customerId of the appointment (i.e. book the appointment)
  appointment.customerId = user._id;
  await appointment.save();

  res.status(200).json(appointment);
});

module.exports = router;

