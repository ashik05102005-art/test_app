import { Link } from 'react-router';
import { modules } from '../data/modules.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { ModuleCard, PageHeading, ProgressBar, StatCard, TopicRow } from '../components/ui.jsx';

export default function Dashboard() {
  const { currentTopic, completedTopics, completedTopicCount, topicsTotal, overallPercent, quizScores, modulesTotal, moduleIsComplete } = useProgress();
  const currentModule = modules.find((item) => item.id === currentTopic.moduleId);
  const recentTopics = completedTopics.map((id) => modules.flatMap((item) => item.topics).find((topic) => topic.id === id)).filter(Boolean).slice(-3).reverse();
  const nextModules = modules.slice(0, 3);
  return <div className="page dashboard-page">
    <PageHeading eyebrow="YOUR TESTING JOURNEY" title="Good to see you." description="A little testing knowledge goes a long way. Pick up where you left off or explore a new topic." />
    <section className="dashboard-hero">
      <div className="hero-copy"><div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> YOUR LEARNING PATH</div><h2>Become the tester<br />who sees the <em>whole picture.</em></h2><p>Start with the foundations. Build toward real-world testing and automation, one clear lesson at a time.</p><div className="hero-actions"><Link className="button button-white" to={`/topic/${currentTopic.id}`}>Continue learning <span>→</span></Link><Link className="hero-link" to="/roadmap">Explore the roadmap <span>↗</span></Link></div></div>
      <div className="hero-progress-card"><div className="hero-progress-top"><span>YOUR PROGRESS</span><span className="hero-trophy">✦</span></div><div className="hero-percent">{overallPercent}<span>%</span></div><div className="hero-progress-caption">of your learning path complete</div><ProgressBar value={overallPercent} tone="white" /><div className="hero-divider" /><div className="hero-progress-foot"><span><strong>{completedTopicCount}</strong> of {topicsTotal} lessons</span><span><strong>{Object.values(quizScores).filter((item) => item.passed).length}</strong> quizzes passed</span></div></div>
      <span className="hero-decoration hero-decoration-one" /><span className="hero-decoration hero-decoration-two" />
    </section>

    <section className="stats-grid">
      <StatCard icon="▣" tone="blue" label="Lessons completed" value={`${completedTopicCount} / ${topicsTotal}`} detail="Keep your momentum going" />
      <StatCard icon="▤" tone="violet" label="Modules complete" value={`${modules.filter(moduleIsComplete).length} / ${modulesTotal}`} detail="15 thoughtfully structured modules" />
      <StatCard icon="✦" tone="green" label="Quiz attempts" value={Object.values(quizScores).reduce((sum, item) => sum + (item.attempts || 0), 0)} detail="Practice makes progress" />
    </section>

    <section className="dashboard-columns">
      <div className="content-column">
        <div className="section-title-row"><div><div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h2>Continue learning</h2></div><Link to="/roadmap" className="text-link">View roadmap <span>→</span></Link></div>
        <Link className="continue-card" to={`/topic/${currentTopic.id}`}>
          <div className={`continue-module-icon ${currentModule.color}`}>{currentModule.icon}</div><div className="continue-info"><div className="continue-meta">MODULE {String(currentModule.number).padStart(2, '0')} <span>·</span> {currentModule.title}</div><h3>{currentTopic.title}</h3><p>{completedTopics.includes(currentTopic.id) ? 'Review this lesson or move ahead to refresh your knowledge.' : 'A friendly, practical introduction — about 5 minutes.'}</p><div className="continue-progress-row"><ProgressBar value={Math.round((completedTopics.filter((id) => currentModule.topics.some((topic) => topic.id === id)).length / currentModule.topics.length) * 100)} /><span>{currentModule.topics.filter((topic) => completedTopics.includes(topic.id)).length}/{currentModule.topics.length} topics</span></div></div><span className="continue-arrow">→</span>
        </Link>
        <div className="section-title-row module-section-heading"><div><div className="eyebrow">YOUR CURRICULUM</div><h2>Learning modules</h2></div><span className="section-counter">{modules.length} MODULES</span></div>
        <div className="module-grid dashboard-module-grid">{nextModules.map((module) => <ModuleCard key={module.id} module={module} compact />)}</div>
        <Link to="/roadmap" className="button button-outline all-modules-button">See all 15 modules <span>→</span></Link>
      </div>
      <aside className="dashboard-aside">
        <div className="aside-panel now-panel"><div className="panel-header"><span className="aside-icon violet">◷</span><div><div className="eyebrow">CURRENTLY LEARNING</div><h3>Your next step</h3></div></div><Link to={`/topic/${currentTopic.id}`} className="next-step-link"><span className="next-step-number">{String(currentModule.number).padStart(2, '0')}</span><span><strong>{currentTopic.title}</strong><small>{currentModule.title}</small></span><span>→</span></Link><Link className="panel-button" to={`/topic/${currentTopic.id}`}>Open lesson <span>↗</span></Link></div>
        <div className="aside-panel category-panel"><div className="panel-header"><span className="aside-icon blue">⌘</span><div><div className="eyebrow">EXPLORE BY CATEGORY</div><h3>Choose your focus</h3></div></div><div className="category-list">{[[modules[0], 'Start with the basics'], [modules[10], 'Explore API testing'], [modules[12], 'Move into automation']].map(([module, caption]) => <Link to={`/module/${module.id}`} key={module.id} className="category-link"><span className={`category-dot ${module.color}`}>{module.icon}</span><span><strong>{module.title}</strong><small>{caption}</small></span><span className="category-chevron">›</span></Link>)}</div><Link to="/roadmap" className="category-all">Browse all categories <span>→</span></Link></div>
        {recentTopics.length > 0 && <div className="aside-panel recent-panel"><div className="section-title-row"><div><div className="eyebrow">NICE WORK</div><h3>Recently completed</h3></div></div>{recentTopics.map((topic) => <TopicRow key={topic.id} topic={topic} />)}</div>}
        <div className="aside-quote"><span>“</span><p>Quality is never an accident; it is always the result of intelligent effort.</p><small>— John Ruskin</small></div>
      </aside>
    </section>
  </div>;
}
