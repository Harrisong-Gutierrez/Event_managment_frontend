import { createOrganizer } from "@/services/api";
import { useState } from "react";


export default function OrganaizerForm({ onOrganaizerCreated }) {
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiData = {
                Name: formData.name,
                email: formData.email,
                phone: formData.phone,
            }
            await createOrganizer(apiData);

            onOrganaizerCreated();

            setFormData({
                name: '',
                email: '',
                phone: '',
            });

        } catch (error) {
            alert(`Error: ${error.message}`);
        };
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
                <h5 className="card-title mb-4">New Organizer</h5>
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
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Create Organizer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};