// Calendar API integration for fetching events
// Note: This is a simplified version for demonstration purposes

// In a real implementation, you would need to:
// 1. Set up proper Google Calendar API authentication
// 2. Handle API keys and OAuth properly
// 3. Implement error handling and rate limiting

const CALENDAR_ID = '816a0a926eb45804d46292e69a25a992e459786291315a30096815b6a5fe92e@group.calendar.google.com';

/**
 * Fetch upcoming events from the Google Calendar API
 * This is a placeholder function that would normally make an API request
 * In a real implementation, you would call the actual Google Calendar API
 */
function fetchUpcomingEvents(maxResults = 3) {
    // In a real implementation, this would be:
    // return fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?...`)

    // For demo purposes, we're returning mock data
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 'event1',
                    summary: 'Annual Harvest Festival',
                    start: {
                        dateTime: '2025-10-15T10:00:00',
                    },
                    end: {
                        dateTime: '2025-10-15T18:00:00',
                    },
                    location: 'Central Park',
                    description: 'Join us for the annual harvest celebration with local produce, crafts, music and food!'
                },
                {
                    id: 'event2',
                    summary: 'Community Workshop',
                    start: {
                        dateTime: '2025-10-22T14:00:00',
                    },
                    end: {
                        dateTime: '2025-10-22T16:30:00',
                    },
                    location: 'Community Center',
                    description: 'Learn new skills at our community workshop focused on sustainable living practices.'
                },
                {
                    id: 'event3',
                    summary: 'Halloween Night Market',
                    start: {
                        dateTime: '2025-10-31T18:00:00',
                    },
                    end: {
                        dateTime: '2025-10-31T22:00:00',
                    },
                    location: 'Main Square',
                    description: 'Enjoy a spooky night market with costume contests, local vendors, and seasonal treats.'
                }
            ]);
        }, 500);
    });
}

/**
 * Format a date from ISO string to display format
 */
function formatEventDate(isoDate) {
    const date = new Date(isoDate);
    return {
        day: date.getDate(),
        month: date.toLocaleString('en-US', { month: 'short' })
    };
}

/**
 * Format event time to display format
 */
function formatEventTime(startIso, endIso) {
    const start = new Date(startIso);
    const end = new Date(endIso);
    
    return `${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
}

export { fetchUpcomingEvents, formatEventDate, formatEventTime, CALENDAR_ID };