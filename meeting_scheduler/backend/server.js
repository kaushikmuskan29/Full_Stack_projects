// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // Port for the backend server

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory storage for meetings
let meetings = [];

// Helper function to check for overlapping meetings
const isOverlapping = (newStart, newEnd) => {
  const newStartDate = new Date(newStart);
  const newEndDate = new Date(newEnd);

  for (const meeting of meetings) {
    const existingStart = new Date(meeting.startDate);
    const existingEnd = new Date(meeting.endDate);

    // Check for overlap: (newStart < existingEnd AND newEnd > existingStart)
    if (newStartDate < existingEnd && newEndDate > existingStart) {
      return true; // Overlap detected
    }
  }
  return false; // No overlap
};

// API to get all meetings
app.get('/api/meetings', (req, res) => {
  // Sort meetings by start date before sending
  const sortedMeetings = meetings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  res.json(sortedMeetings);
});

// API to add a new meeting
app.post('/api/meetings', (req, res) => {
  const { title, participants, startDate, endDate } = req.body;

  // Basic validation
  if (!title || !startDate || !endDate) {
    return res.status(400).json({ message: 'Title, Start Date, and End Date are required.' });
  }

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  if (startDateTime >= endDateTime) {
    return res.status(400).json({ message: 'End time must be after start time.' });
  }

  // Check for overlaps on the backend
  if (isOverlapping(startDateTime, endDateTime)) {
    return res.status(409).json({ message: 'This meeting overlaps with an existing meeting. Please choose different times.' });
  }

  const newMeeting = {
    id: Date.now(), 
    title,
    participants,
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString(),
  };

  meetings.push(newMeeting);
  res.status(201).json(newMeeting); // Respond with the created meeting
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
