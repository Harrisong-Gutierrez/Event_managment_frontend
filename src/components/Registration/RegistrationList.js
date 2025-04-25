'use client';
import { deleteRegistrations, fetchRegistration } from '@/services/api';
import { useEffect, useState } from 'react';


export default function () {
    const [registrations, setRegistration] = useState([]);
    const [error, setError] = useState(null);


    const loadRegistrations = async () => {
        try {
            const data = await fetchRegistration()
            setRegistration(data)
            console.log(data)
        } catch (err) {
            setError(err.message)
        };
    }

    const handleDelete = async (registrationId) => {
        if (confirm("Delete Rgistrations?")) {
            try {
                await deleteRegistrations(registrationId);
                loadRegistrations();
            } catch (err) {
                setError(err.message);
            };
        };
    };

    useEffect(() => {
        loadRegistrations();
    }, []);

    return (
        <div className="mt-3">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {registrations.map(registration => (
                    <div key={registration.registrationId} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">

                                <ul className="list-unstyled">
                                    <li><strong>Rejistration ID:</strong> {registration.participantId}</li>
                                    <li><strong>Event ID:</strong> {registration.eventId}</li>
                                </ul>
                                <button
                                    onClick={() => handleDelete(registration.registrationId)}
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
