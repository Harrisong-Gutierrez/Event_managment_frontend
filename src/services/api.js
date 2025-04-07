const API_URL = 'https://localhost:7239/api'; 



// Events
export const fetchEvents = async () => {
  const response = await fetch(`${API_URL}/Event`);
  return response.json();
};111

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_URL}/Event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  return response.json();
};

export const deleteEvent = async (eventId) => {
  await fetch(`${API_URL}/Event/${eventId}`, { method: 'DELETE' });
};       

// Organizer
export const fetchOrganizers = async () => {
  const response = await fetch(`${API_URL}/Organizer`);
  return response.json();
};
export const createOrganizer = async (organizerData) => {
  const response = await fetch(`${API_URL}/Organizer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(organizerData)
  });
}
export const deleteOrganizers = async (organizerId) => {
  await fetch(`${API_URL}/Organizer/${organizerId}`, { 
    method: 'DELETE' 
  });
};

// Sponsor

export const fetchSponsor = async () => {
  const  response = await fetch(`${API_URL}/Sponsor`);
  return response.json();
}

export const createSponsor = async(sponsorData) => {
  const response = await fetch(`${API_URL}/Spopnsor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sponsorData)
  });
}

export const deleteSponsor = async (sponsorId) => {
  await fetch(`${API_URL}/Sponsor/${sponsorId}`, { 
    method: 'DELETE' 
  });
};

