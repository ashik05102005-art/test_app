import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { modules } from '../data/modules.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { ModuleCard, PageHeading, ProgressBar, TopicRow } from '../components/ui.jsx';

export function Roadmap() {
  const { overallPercent, completedTopicCount, topicsTotal, modulesTotal } = useProgress();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => modules.filter((module) => `${module.title} ${module.description} ${module.topics.map((item) => item.title).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="page">
    <PageHeading eyebrow="THE COMPLETE LEARNING PATH" title="Your testing roadmap" description="A guided path from the essentials to building confidence with APIs, databases, and automation." action={<Link to={`/module/${modules[0].id}`} className="button button-primary">Start at the beginning <span>→</span></Link>} />
    <section className="roadmap-overview"><div><div className="overview-overline">YOUR OVERALL PROGRESS</div><strong>{overallPercent}<small>%</small></strong><span>{completedTopicCount} of {topicsTotal} lessons completed</span></div><div className="roadmap-overview-progress"><ProgressBar value={overallPercent} label="Learning path" /><div className="roadmap-stages"><span>FOUNDATION</span><span>CORE SKILLS</span><span>AUTOMATION</span></div></div><div className="roadmap-module-count"><strong>{modulesTotal}</strong><span>modules<br />to explore</span></div></section>
    <div className="roadmap-toolbar"><div><h2>All modules</h2><p>Follow the sequence or jump to any topic you need.</p></div><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a topic or module" aria-label="Find a topic or module" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label></div>
    {filtered.length ? <div className="module-grid roadmap-grid">{filtered.map((module) => <ModuleCard key={module.id} module={module} />)}</div> : <div className="empty-search"><span>⌕</span><strong>No matches yet</strong><p>Try a different topic, such as “API”, “Agile”, or “regression”.</p><button className="text-link" onClick={() => setQuery('')}>Clear search</button></div>}
    <div className="roadmap-note"><span>✦</span><p><strong>A flexible path.</strong> Follow the order for a complete foundation, or jump straight to a topic. Your progress stays saved on this device.</p></div>
  </div>;
}

export function ModulePage() {
  const { moduleId } = useParams();
  const module = modules.find((item) => item.id === moduleId);
  const { completedTopics, quizScores, moduleIsComplete } = useProgress();
  if (!module) return <div className="page"><PageHeading eyebrow="LEARNING ROADMAP" title="Module not found" description="Choose a module from the roadmap to continue." action={<Link className="button button-primary" to="/roadmap">View roadmap</Link>} /></div>;
  const completed = module.topics.filter((topic) => completedTopics.includes(topic.id)).length;
  const score = quizScores[module.id];
  return <div className="page module-page">
    <div className="back-link-row"><Link to="/roadmap">← Back to roadmap</Link><span>Module {String(module.number).padStart(2, '0')}</span></div>
    <section className={`module-hero ${module.color}`}><span className={`module-hero-icon ${module.color}`}>{module.icon}</span><div className="module-hero-copy"><div className="eyebrow">MODULE {String(module.number).padStart(2, '0')} · {module.topics.length} TOPICS</div><h1>{module.title}</h1><p>{module.description}</p><div className="module-hero-actions"><Link className="button button-primary" to={`/topic/${module.topics[0].id}`}>{completed ? 'Continue module' : 'Start this module'} <span>→</span></Link><Link className="button button-light-outline" to={`/quiz/${module.id}`}>Take module quiz <span>✦</span></Link></div></div><div className="module-hero-progress"><div className="module-hero-progress-value">{Math.round((completed / module.topics.length) * 100)}<small>%</small></div><span>MODULE PROGRESS</span><ProgressBar value={Math.round((completed / module.topics.length) * 100)} tone="white" /></div></section>
    <div className="module-content-grid"><section className="module-topic-section"><div className="section-title-row"><div><div className="eyebrow">YOUR LESSONS</div><h2>Topics in this module</h2></div><span className="section-counter">{completed} OF {module.topics.length} COMPLETE</span></div><div className="topic-list module-topic-list">{module.topics.map((topic) => <TopicRow key={topic.id} topic={topic} />)}</div></section><aside className="module-sidebar-panel"><div className="quiz-panel-icon">✧</div><div className="eyebrow">CHECK YOUR UNDERSTANDING</div><h3>Ready for a quick quiz?</h3><p>Four multiple-choice questions. See your result right away, review explanations, and retry whenever you like.</p>{score && <div className={`quiz-previous-score ${score.passed ? 'passed' : ''}`}><span>Best score</span><strong>{score.best}%</strong><small>{score.passed ? 'Passed' : `${score.attempts} attempt${score.attempts === 1 ? '' : 's'}`}</small></div>}<Link className="button button-primary quiz-cta" to={`/quiz/${module.id}`}>{score ? 'Retake the quiz' : 'Start module quiz'} <span>→</span></Link><div className="quiz-pass-note">A score of 70% or more marks this module complete.</div>{moduleIsComplete(module) && <div className="module-complete-note">✓ Module completed. Great work!</div>}</aside></div>
  </div>;
}
