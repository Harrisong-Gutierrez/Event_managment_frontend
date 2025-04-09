'use client';
import { deleteSponsor, fetchSponsor } from '@/services/api';
import { useEffect, useState } from 'react';



export default function SponsorList() {
    const [sponsors, setSponsors] = useState([]);
    const [error, setError] = useState(null);

    const loadSponsors = async () => {
        try {
            const data = await fetchSponsor();
            setSponsors(data);
        } catch (err) {
            setError(err.message)
        };
    };


    const handleDelete = async (sponsorId) => {
        if (confirm("¿Eliminar Sponsor?")) {
            try {
                await deleteSponsor(sponsorId);
                loadSponsors();
            } catch (err) {
                setError(err.message);
            }
        }
    }

    useEffect(() => {
        loadSponsors();
    }, []);

    return (
        <div className="mt-3">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {sponsors.map(sponsor => (
              <div key={sponsor.sponsorId} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{sponsor.name}</h5>
                    <ul className="list-unstyled">
                      <li><strong>Description:</strong> {sponsor.description}</li>
                      <li><strong>Event ID:</strong> {sponsor.eventId}</li>
                    </ul>
                    <button 
                      onClick={() => handleDelete(sponsor.sponsorId)}
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

};