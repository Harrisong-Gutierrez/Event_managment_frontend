import { createOrganizer, fetchEvents } from "@/services/api";
import { useEffect, useState } from "react";

export default function SponsorForm({ onSponsorCreated }) {
    const [error, setError] = useState(null);
    const [events, setEvets] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("")

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        eventId: '',
    });


    const loadEvents = async () => {
        try {
            const data = await fetchEvents();
            setEvets(data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEventId) {
            alert("Please select an organizer.");
            return;
        }

        try {
            const apiData = {
                Name: formData.name,
                description: formData.description,
                eventId: selectedEventId,
            }
            await createOrganizer(apiData);

            onSponsorCreated();

            setFormData({
                name: '',
                description: '',
                eventId: '',
            });
            setSelectedEventId("")

        } catch (error) {
            alert(`Error: ${error.message}`);
        };
    }


    if (error)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-danger">{error}</div>
            </div>
        );

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title mb-4">New Sponsor</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Event</label>
                            <select
                                className="form-control"
                                value={selectedEventId}
                                onChange={(e) => setSelectedEventId(e.target.value)}
                                required
                            >
                                <option value="">Select an Event</option>
                                {events.map((event) => (
                                    <option key={event.eventId} value={event.eventId}>
                                        {event.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Create Event
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}