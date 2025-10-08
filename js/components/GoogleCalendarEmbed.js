import React from 'react';

const GoogleCalendarEmbed = ({ title = 'Calendário de Eventos' }) => {
    return (
        <div className="google-calendar-embed">
            <h2>{title}</h2>
            <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLisbon&title=AGENDA&src=ODE2YTBhOTI2ZWI0NTgwNGQ0NjI5MmU2OWEyNWE5OTJlNDU5Nzg2MjkxMzEzNWEzMDA5NjgxNWI2YTVmZTkyZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23d50000" 
                style={{ border: 'solid 1px #777', width: '100%', height: '600px' }}
                frameBorder="0" 
                scrolling="no"
                title="Calendário de Eventos da Comunidade"
            ></iframe>
        </div>
    );
};

export default GoogleCalendarEmbed;