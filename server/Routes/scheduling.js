const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const url = require('url');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Session = require('../models/Session');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const authenticator = require('otplib').authenticator;
const util = require('util');

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

// @route POST /api/scheduling/openAppointments
// @desc Open a series of recurring appointments for scheduling
/*
    Request:
        - authorization: 'Bearer {accessToken}'
        - startDay: A unix time representing 12:00:00 AM for the first date in the series
        - endDay: A unix time representing 11:59:59 PM for the last date (excluded) in the series. 
                    This date must be the same day of the week and must be at least 1 week from the startDay. 
        - appointmentTime: A unix time representing the appointment start time for the series of appointments.
                    This date must be the same day, month, and year as startDay.
    

*/
// @access Public
router.post('/openAppointment', async (req, res) => {
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
    const { email, startTime } = req.body; // get startTime from body
    
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
    

    let newAppointment = new Appointment({
        trainerId: trainer._id,
        startTime: new Date() // startTime
    });

    newAppointment.save()
        .then(openAppointment => {
            res.status(200).json(openAppointment);
        })
        .catch(err => {
            res.status(400).json(err);
        });    
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

    res.status(200).json(closedAppointment)
});

module.exports = router;

