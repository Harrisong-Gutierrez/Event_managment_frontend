import { useEffect, useState } from 'react';
import { createEvent, fetchOrganizers } from '../../services/api';

export default function EventForm({ onEventCreated }) {
  const [error, setError] = useState(null);
  const [organizers, setOrganizers] = useState([]);
  const [selectedOrganizerId, setSelectedOrganizerId] = useState("");


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    maxCapacity: '',
  });

  const loadOrganizers = async () => {
    try {
      const data = await fetchOrganizers();
      setOrganizers(data);
    } catch (err) {
      setError(err.message);
    } 
  };

  useEffect(() => {
    loadOrganizers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrganizerId) {
      alert("Please select an organizer.");
      return;
    }

    try {
      const apiData = {
        Name: formData.name,
        Description: formData.description,
        Date: `${formData.date}:00`,
        Location: formData.location,
        MaxCapacity: Number(formData.maxCapacity),
        OrganizerId: selectedOrganizerId,
      };

      await createEvent(apiData);
      onEventCreated();
      setFormData({
        name: '',
        description: '',
        date: '',
        location: '',
        maxCapacity: '',
      });
      setSelectedOrganizerId("");
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
        <h5 className="card-title mb-4">New Event</h5>
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
                type="datetime-local"
                className="form-control"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Max Capacity"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                min="1"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Organizer</label>
              <select
                className="form-control"
                value={selectedOrganizerId}
                onChange={(e) => setSelectedOrganizerId(e.target.value)}
                required
              >
                <option value="">Select an organizer</option>
                {organizers.map((organizer) => (
                  <option key={organizer.organizerId} value={organizer.organizerId}>
                    {organizer.name}
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
