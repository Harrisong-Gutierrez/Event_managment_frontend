import { createParticipant, createRegistrations, fetchEvents, fetchParticipant } from "@/services/api";
import { useEffect, useState } from "react"


export default function RegistrationForm({ onRegistrationFormCreated }) {
    const [error, setError] = useState(null);
    const [events, setEvets] = useState([]);
    const [participants, setParticipant] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("")
    const [selectedParticipantId, setSelectedParticipantId] = useState("")

    const [formData, setFormData] = useState({
        participantId: '',
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

    const loadParticipants = async () => {
        try {
            const data = await fetchParticipant()
            setParticipant(data)
        } catch (err) {
            setError(err.message)
        };
    };


    useEffect(() => {
        loadEvents();
    }, []);


    useEffect(() => {
        loadParticipants();
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEventId) {
            alert("Please select an Event");
            return;
        }

        if (!selectedParticipantId) {
            alert("Please select an Participant.");
            return;
        }

        try {
            const apiData = {
                ParticipantId: selectedParticipantId,
                EventId: selectedEventId
            }
            await createRegistrations(apiData);

            onRegistrationFormCreated();

            setFormData({
                participantId: '',
                eventId: '',
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    };

    if (error)

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="alert alert-danger">{error}</div>
            </div>
        );

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title mb-4">New Participant</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">



                        <div className="col-12">
                            <label className="form-label"></label>
                            <select
                                className="form-control"
                                value={selectedParticipantId}
                                onChange={(e) => setSelectedParticipantId(e.target.value)}
                                required
                            >
                                <option value="">Select a Participant</option>
                                {participants.map((participant) => (
                                    <option key={participant.participantId} value={participant.participantId}>
                                        {participant.name}
                                    </option>
                                ))}
                            </select>
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
                                Create Registration
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}