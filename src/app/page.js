import Tabs from '@/components/Tabs';
import BootstrapClient from '../components/BootstrapClient';

export default function Home() {
  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Event Management</h1>
        <p className="lead text-muted">Easily manage your events, clients, and more!</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Event Options</h2>
          <Tabs />
        </div>
      </div>
    </main>
  );
}
