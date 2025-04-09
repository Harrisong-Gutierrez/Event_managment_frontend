'use client';
import { deleteParticipant, fetchParticipant } from '@/services/api';
import { useEffect, useState } from 'react';



export default function ParticipantList() {
    const [participants, setParticipant] = useState([]);
    const [error, setError] = useState(null);



    const loadParticipants = async () => {
        try {
            const data = await fetchParticipant()
            setParticipant(data)
        } catch (err) {
            setError(err.message)
        };
    };


    const handleDelete = async (participantId) => {
        if (confirm("¿Eliminar Participant?")) {
            try {
                await deleteParticipant(participantId);
                loadParticipants();
            } catch (err) {
                setError(err.message);
            };
        };
    }

    useEffect(() => {
        loadParticipants();
    }, []);



    return (
        <div className="mt-3">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {participants.map(participant => (
                    <div key={participant.participantId} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{participant.name}</h5>
                                <ul className="list-unstyled">
                                    <li><strong>Email:</strong> {participant.email}</li>
                                    <li><strong>Phone:</strong> {participant.phone}</li>
                                </ul>
                                <button
                                    onClick={() => handleDelete(participant.participantId)}
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