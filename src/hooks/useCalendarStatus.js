import { useState, useEffect } from 'react';
import { fetchCalendarEvents, getActiveEvent } from '../utils/calendarParser';

const DEFAULT_STATUS = {
  avatar: null,
  status: 'loading',
  links: []
};

export function useCalendarStatus() {
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const updateStatus = async () => {
      try {
        const events = await fetchCalendarEvents();
        if (!mounted) return;

        const activeEvent = getActiveEvent(events);

        if (activeEvent && activeEvent.data) {
          setStatus({
            avatar: activeEvent.data.avatar || null,
            status: activeEvent.data.status || 'unknown',
            links: activeEvent.data.links || []
          });
        } else {
          setStatus(DEFAULT_STATUS);
        }
      } catch (error) {
        console.error('Error updating calendar status:', error);
        if (!mounted) return;
        setStatus(DEFAULT_STATUS);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    updateStatus();

    const interval = setInterval(updateStatus, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { status, loading };
}
