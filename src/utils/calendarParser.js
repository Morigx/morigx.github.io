import ICAL from 'ical.js';

const GOOGLE_CALENDAR_ICS_URL = 'YOUR_GOOGLE_CALENDAR_ICS_URL_HERE';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchCalendarEvents() {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(GOOGLE_CALENDAR_ICS_URL)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch calendar');
    }
    const text = await response.text();
    const jcalData = ICAL.parse(text);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents('vevent');
    
    return events.map(vevent => {
      const event = new ICAL.Event(vevent);
      const description = event.description || '';
      
      let jsonData = {};
      try {
        const jsonMatch = description.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error('Failed to parse JSON from event description:', e);
      }
      
      return {
        uid: event.uid,
        summary: event.summary,
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
        data: jsonData
      };
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

export function getActiveEvent(events) {
  const now = new Date();
  
  for (const event of events) {
    if (now >= event.startDate && now <= event.endDate) {
      return event;
    }
  }
  
  return null;
}
