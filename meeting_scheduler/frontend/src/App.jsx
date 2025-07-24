import React, { useState, useEffect } from 'react';
import { create } from 'zustand'; // Zustand is still useful for local UI state, but meetings will be from backend

// Zustand Store for managing UI-related state if needed, but not for meetings data
// For this example, we'll keep it simple and manage meetings directly via fetch.
// If you had complex local UI state, Zustand could still be used here.

// Helper function to format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Helper function to format Date object to datetime-local string (YYYY-MM-DDTHH:mm)
const toDatetimeLocal = (date) => {
  if (!date) return '';
  const dt = new Date(date);
  // Adjust for timezone offset to display local time correctly in input
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
};

// Main App Component
const App = () => {
  const [meetings, setMeetings] = useState([]); // Meetings now fetched from backend
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for fetching meetings

  const API_BASE_URL = 'http://localhost:3001/api'; // Backend API URL

  // Function to fetch meetings from the backend
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/meetings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setErrorMessage('Failed to load meetings. Please check the backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch meetings on component mount
  useEffect(() => {
    fetchMeetings();
  }, []); // Empty dependency array means this runs once on mount

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (!title || !startDate || !endDate) {
      setErrorMessage('Please fill in all required fields (Title, Start Date, End Date).');
      return;
    }

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (startDateTime >= endDateTime) {
      setErrorMessage('End time must be after start time.');
      return;
    }

    // Prepare meeting data for the backend
    const newMeetingData = {
      title,
      participants,
      startDate: startDateTime.toISOString(), // Send as ISO string
      endDate: endDateTime.toISOString(),     // Send as ISO string
    };

    try {
      const response = await fetch(`${API_BASE_URL}/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeetingData),
      });

      if (response.status === 409) { // Conflict (overlap)
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // If successful, re-fetch all meetings to update the list
      await fetchMeetings();

      // Clear form fields
      setTitle('');
      setParticipants('');
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setErrorMessage(`Failed to schedule meeting: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meeting Scheduler</h1>

        {/* Meeting Scheduling Form */}
        <form onSubmit={handleScheduleMeeting} className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-5 text-center">Schedule a New Meeting</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Project Sync"
                required
              />
            </div>

            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                Participants (comma-separated)
              </label>
              <input
                type="text"
                id="participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Alice, Bob, Charlie"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="startDate"
                value={toDatetimeLocal(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="endDate"
                value={toDatetimeLocal(endDate)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm mb-4 p-2 bg-red-100 border border-red-300 rounded-md">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out font-semibold text-lg"
          >
            Schedule Meeting
          </button>
        </form>

        {/* Scheduled Meetings List */}
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Scheduled Meetings</h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading meetings...</p>
          ) : meetings.length === 0 ? (
            <p className="text-gray-500 text-center">No meetings scheduled yet. Start by adding one above!</p>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{meeting.title}</h3>
                    <p className="text-gray-700 text-sm">
                      <span className="font-medium">When:</span> {formatDate(meeting.startDate)} to {formatDate(meeting.endDate)}
                    </p>
                    {meeting.participants && (
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">Participants:</span> {meeting.participants}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
