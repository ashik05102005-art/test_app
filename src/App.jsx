import { Link, Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { ModulePage, Roadmap } from './pages/Roadmap.jsx';
import TopicPage from './pages/TopicPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import Practice from './pages/Practice.jsx';
import Progress from './pages/Progress.jsx';
import { PageHeading } from './components/ui.jsx';

function NotFound() {
  return <div className="page"><PageHeading eyebrow="404 · PAGE NOT FOUND" title="Looks like a wrong turn." description="That page doesn’t exist in this learning path. Choose somewhere to continue." action={<Link to="/" className="button button-primary">Go to dashboard</Link>} /></div>;
}

export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Navigate to="/" replace />} />
    <Route path="roadmap" element={<Roadmap />} />
    <Route path="module/:moduleId" element={<ModulePage />} />
    <Route path="topic/:topicId" element={<TopicPage />} />
    <Route path="quiz/:moduleId" element={<QuizPage />} />
    <Route path="practice" element={<Practice />} />
    <Route path="progress" element={<Progress />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes>;
}
