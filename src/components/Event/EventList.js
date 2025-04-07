'use client';
import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../../services/api';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Delete this event?')) {
      await deleteEvent(eventId);
      loadEvents(); 
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  console.log()

  if (loading) return <div className="spinner-border text-primary"></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="mt-3">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {events.map(event => (
          <div key={event.eventId} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <ul className="list-unstyled">
                  <li><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</li>
                  <li><strong>Location:</strong> {event.location}</li>
                  <li><strong>Capacity:</strong> {event.maxCapacity}</li>
                  <li><strong>Organaizer Name:</strong> {event?.organizer?.name}</li>
                </ul>
                <button 
                  onClick={() => handleDelete(event.eventId)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
