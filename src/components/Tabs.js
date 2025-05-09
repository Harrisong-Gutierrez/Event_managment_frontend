'use client';

import { useState } from 'react';
import EventList from './Event/EventList';
import EventForm from './Event/EventForm';
import OrganizerList from './Organaizer/OrganizerList';
import OrganaizerForm from './Organaizer/OrganaizerForm';
import SponsorList from './Sponsor/SponsorList';
import SponsorForm from './Sponsor/SponsorForm';
import ParticipantList from './Participant/ParticipantList';
import ParticipantForm from './Participant/ParticipantForm';
import RegistrationList from './Registration/RegistrationList';
import RegistrationForm from './Registration/RegistrationForm';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { id: 'events', label: 'Events' },
    { id: 'participants', label: 'Participants' },
    { id: 'organizers', label: 'Organizers' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'registrations', label: 'Registrations' }
  ];

  return (
    <div className="mt-4">
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === 'events' ? 'show active' : 'd-none'}`}>
          <EventForm onEventCreated={() => window.location.reload()} />
          <EventList />
        </div>

        <div className={`tab-pane ${activeTab === 'participants' ? 'show active' : 'd-none'}`}>
          <ParticipantForm  onParticipantFormCreated={() => window.location.reload()} />
          <ParticipantList />
        </div>

        <div className={`tab-pane ${activeTab === 'organizers' ? 'show active' : 'd-none'}`}>
          <OrganaizerForm onOrganaizerCreated={() => window.location.reload()} />
          <OrganizerList />
        </div>

        <div className={`tab-pane ${activeTab === 'sponsors' ? 'show active' : 'd-none'}`}>
          <SponsorForm onSponsorCreated={() => window.location.reload()} />
          <SponsorList />
        </div>

        <div className={`tab-pane ${activeTab === 'registrations' ? 'show active' : 'd-none'}`}>
         <RegistrationForm onRegistrationFormCreated={() => window.location.reload()} />
         <RegistrationList />
        </div>
      </div>
    </div>
  );
}