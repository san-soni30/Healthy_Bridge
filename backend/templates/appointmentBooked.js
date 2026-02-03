module.exports = (name, date, timeSlot) => `
  <h2>Appointment Booked Successfully</h2>
  <p>Hello <b>${name}</b>,</p>
  <p>Your appointment request has been received.</p>
  <p><b>Date:</b> ${date}</p>
  <p><b>Time:</b> ${timeSlot}</p>
  <p>Status: <b>Pending Approval</b></p>
`;
