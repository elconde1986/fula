import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Goals from './pages/Goals';
import Scenarios from './pages/Scenarios';
import Session from './pages/Session';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/session/:personaId/:scenarioId" element={<Session />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
