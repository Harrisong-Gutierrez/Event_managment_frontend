'use client';
import { useEffect, useState } from 'react';
import { fetchOrganizers, deleteOrganizers } from '../../services/api';

export default function OrganizerList() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrganizers = async () => {
    try {
      const data = await fetchOrganizers();
      setOrganizers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (organizerId) => {
    if (confirm("¿Eliminar organizador?")) {
      try {
        await deleteOrganizers(organizerId);
        loadOrganizers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    loadOrganizers();
  }, []);

  if (loading) return <div className="spinner-border text-primary"></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="mt-3">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {organizers.map(organizer => (
          <div key={organizer.organizerId} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{organizer.name}</h5>
                <ul className="list-unstyled">
                  <li><strong>Email:</strong> {organizer.email}</li>
                  <li><strong>Phone:</strong> {organizer.phone}</li>
                </ul>
                <button
                  onClick={() => handleDelete(organizer.organizerId)}
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