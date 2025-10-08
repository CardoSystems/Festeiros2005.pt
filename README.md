# Festival Website with Google Calendar Integration

This website is designed to showcase community events using Google Calendar embedding. It allows local community members to easily view upcoming events in multiple formats.

## Project Structure

```
festival-website
├── public
│   ├── index.html        # Main HTML document for the website
│   └── styles.css       # CSS styles for the website
├── src
│   ├── scripts
│   │   └── main.js      # JavaScript for dynamic behavior
│   └── components
│       └── GoogleCalendarEmbed.js  # Component for Google Calendar embed
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Features

- Interactive Google Calendar integration with real-time updates
- Event highlights section showcasing featured upcoming events
- Multiple calendar view options (Month and Agenda views)
- Mobile-friendly design with responsive layouts for all device sizes
- Calendar subscription functionality for users
- Loading states for better user experience
- Smooth animations and transitions

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd festival-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Open `public/index.html` in your web browser to view the website.

## Usage

- Modify the `public/index.html` file to update the content of the website.
- Adjust styles in `public/styles.css` to change the appearance.
- Use `src/scripts/main.js` for any interactive features.

## Calendar Configuration

The website is integrated with a Google Calendar using the ID:
`816a0a926eb45804d46292e69a25a992e459786291315a30096815b6a5fe92e@group.calendar.google.com`

To use your own calendar:

1. Create a Google Calendar and make it public
2. Get the Calendar ID from your Google Calendar settings
3. Replace the Calendar ID in:
   - `public/index.html`
   - `src/components/GoogleCalendarEmbed.js`
   - `src/scripts/calendar-api.js`

## Testing

To test the website:
1. Open `public/index.html` in a browser
2. Test calendar view switching between Month and Agenda views
3. Test responsiveness by resizing browser window
4. Verify that the calendar loads correctly and displays events

## Future Enhancements

- Full calendar API integration to dynamically load events
- User authentication for creating and managing events
- Email notifications for upcoming events
- Filter events by category
- Update `src/components/GoogleCalendarEmbed.js` to change the Google Calendar embed settings.

## License

This project is licensed under the MIT License.