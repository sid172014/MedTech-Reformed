const schedule = require('node-schedule');

const triggerCall = (number) => {
    const accountSid = "ACf382cb92769be8308a0b5e397b2d464b";
    const authToken = "d31147755a4a92244dc1c1199e7d16f5";
    const client = require('twilio')(accountSid, authToken);

    // Replace this with the user's dynamic phone number
    const userPhoneNumber = '+918804347052'; // Retrieve this dynamically from user input

    // Replace this with your Twilio phone number
    const twilioPhoneNumber = '+17853902979';

    // Create a TwiML document with a custom message
    const twiml = `
  <Response>
    <Say>Hello! This is your medicine reminder call. Please take your medicine now. Thank you!</Say>
  </Response>
`;


    // Send a phone call reminder
    client.calls
        .create({
            twiml: twiml,
            to: userPhoneNumber,
            from: twilioPhoneNumber
        })
        .then(call => console.log(call.sid))
        .catch(error => console.error('Error:', error));
}

const whatsAppReminders = (number,message) => {

    const accountSid = "ACf382cb92769be8308a0b5e397b2d464b";
    const authToken = "d31147755a4a92244dc1c1199e7d16f5";
    const client = require('twilio')(accountSid, authToken);

    // Replace this variable with the user's dynamic WhatsApp number
    const userWhatsAppNumber = '+1234567890'; // Retrieve this dynamically from user input

    // Array of different message templates
    const messageTemplates = [
        `🌟 MedTech Reminder 🌟\n\nHello [User]! It's time to nurture your health. 🌿💊 Today's reminder: Take your medicine on time and enjoy a day filled with vitality!\n\n*${message}*\n\nStay vibrant, stay well! #MedTech #WellnessJourney\n `,
        `✨ MedTech Health Boost ✨\n\nHi [User]! 🌟 A gentle nudge to prioritize your well-being. ⏰ Remember to take your medicine today for a healthier, happier you!\n\n*${message}*\n\nWishing you vitality and joy! 💚🚀 #MedTech #WellnessJourney`,
        // Add more templates as needed
        `🌟 *Vitality Boost Alert* 🌟\n\nHey [User]! 🌿 It's time to recharge your health batteries. ⚡️ Remember to take your meds today and keep the energy flowing! 💊💙\n\n*${message}*\n\nStay vibrant, stay well! 🌞🚀 #MedTech #HealthyHabits`,
        `✨ *Wellness Check-In* ✨\n\nHi [User]! 🌟 Let's keep the wellness vibes going. ⏰ Take your medicine like a health champ today! \n\n*${message}*\n\nWishing you a day filled with positivity! 🌈🌻 #MedTech #WellnessJourney`,
        `🔔 MedTech Health Alert 🔔\n\nHello [User]! 🌿 A friendly reminder to prioritize self-care. Take your medicine, and let today be a step towards a healthier, happier you!\n\n*${message}*\n\nWishing you wellness and joy! 💚🌟 #MedTech #HealthFirst`,
        `🚀 Elevate Your Day with MedTech 🌈\n\nHey [User]! 🌟 Time for a boost! Don't forget your medicine—your daily ticket to vitality. \n\n*${message}*\n\nBe well, be happy! 💖🌞 #MedTech #DailyWellness`,
        `✨ MedTech Health Boost ✨\n\nHi [User]! 🌟 A gentle nudge to prioritize your well-being. ⏰ Remember to take your medicine today for a healthier, happier you!\n\n*${message}*\n\nWishing you vitality and joy! 💚🚀 #MedTech #WellnessJourney`,
        `🌟 MedTech Wellness Alert 🌈\n\nHello [User]! It's time to nurture your health. 🌿💊 Today's reminder: Take your medicine on time and enjoy a day filled with vitality!\n\n*${message}*\n\nStay vibrant, stay well! 💙🌞 #MedTech #HealthyHabits`
    ];

    // Randomly select a template
    const randomTemplate = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];

    // Replace placeholders in the template
    const reminderMessage = randomTemplate.replace('[User]', 'Ankit').replace('[Link to MedTech App]', 'https://example.com/medtech');

    console.log(reminderMessage)
    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: reminderMessage,
            statusCallback: 'http://postb.in/1234abcd',
            to: `whatsapp:+91${number}`
            // to: whatsapp:${userWhatsAppNumber}
        })
        .then(message => console.log(message.sid))
        .catch(error => console.error('Error:', error));

    // triggerCall();
};


const scheduleRemindersCall = (datetime,number,message) => {
    // Define the schedule for 10 seconds from now
   
    // const reminderSchedule = new Date(`${year}-${month}-${date}T${hour}:${minutes}:${seconds}`); // Current time + 10 seconds
    const reminderSchedule = new Date(datetime); // Current time + 10 seconds
    
    // Schedule the reminder
    const reminderJob = schedule.scheduleJob(reminderSchedule, function () {
        // This function will be called when the reminder is due
        triggerCall();
        whatsAppReminders(number,message);
    });
};

module.exports = {
    scheduleRemindersCall
}

