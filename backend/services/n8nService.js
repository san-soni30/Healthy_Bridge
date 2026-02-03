const callMeetingWorkflow = async (payload) => {
  const response = await fetch(process.env.N8N_MEETING_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-n8n-secret": process.env.N8N_SECRET,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`n8n error: ${text}`);
  }

  return response.json();
};

module.exports = { callMeetingWorkflow };


