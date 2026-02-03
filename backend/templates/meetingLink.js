module.exports = (name, link) => `
  <h2>Video Consultation Link</h2>
  <p>Hello ${name},</p>
  <p>Please join your consultation using the link below:</p>
  <a href="${link}">${link}</a>
  <p>This link is valid only for your scheduled time.</p>
`;
