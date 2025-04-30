const API_URL = 'https://harrisongeventmanagement.somee.com/api'; 



// Events
export const fetchEvents = async () => {
  const response = await fetch(`${API_URL}/Event`);
  return response.json();
};
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
};
export const createSponsor = async(sponsorData) => {
  const response = await fetch(`${API_URL}/Sponsor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sponsorData)
  });
};
export const deleteSponsor = async (sponsorId) => {
  await fetch(`${API_URL}/Sponsor/${sponsorId}`, { 
    method: 'DELETE' 
  });
};


// Participant 
export const fetchParticipant = async () => {
  const response = await fetch(`${API_URL}/Participant`);
  return response.json();
};
export const createParticipant = async (participantData) => {
  const response = await fetch(`${API_URL}/Participant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(participantData)
  });
};
export const deleteParticipant = async (participantId) => {
  await fetch(`${API_URL}/Participant/${participantId}`, { 
    method: 'DELETE' 
  });
};


// Rejistrations

export const fetchRegistration = async () => {
  const response = await fetch(`${API_URL}/Registration`);
  return response.json();
};


export const createRegistrations = async (registrationData) => {
  const response = await fetch(`${API_URL}/Registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData)
  });
};

export const deleteRegistrations = async (registrationId) => {
  await fetch(`${API_URL}/Registration/${registrationId}`, { 
    method: 'DELETE' 
  });
};

 