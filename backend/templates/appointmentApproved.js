module.exports = (name, date, timeSlot) => `
  <h2>Appointment Approved</h2>
  <p>Hello ${name},</p>
  <p>Your appointment has been approved.</p>
  <p><b>Date:</b> ${date}</p>
  <p><b>Time:</b> ${timeSlot}</p>
  <p>Please proceed with payment.</p>
`;
