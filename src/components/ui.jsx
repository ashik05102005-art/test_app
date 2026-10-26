import { Link } from 'react-router';
import { useProgress } from '../context/ProgressContext.jsx';

export function ProgressBar({ value = 0, tone = 'indigo', label }) {
  return <div className="progress-wrap">
    {label && <div className="progress-label"><span>{label}</span><strong>{value}%</strong></div>}
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" aria-label={label || 'Progress'}>
      <span className={`progress-fill ${tone}`} style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
    </div>
  </div>;
}

export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading">
    <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>
    {action && <div className="heading-action">{action}</div>}
  </div>;
}

export function ModuleCard({ module, compact = false }) {
  const { completedTopics, quizScores, moduleIsComplete } = useProgress();
  const done = completedTopics.filter((topic) => module.topics.some((item) => item.id === topic)).length;
  const percent = Math.round((done / module.topics.length) * 100);
  const complete = moduleIsComplete(module);
  return <Link to={`/module/${module.id}`} className={`module-card ${compact ? 'module-card-compact' : ''}`}>
    <div className="module-card-top"><span className={`module-icon ${module.color}`}>{module.icon}</span><span className={`status-badge ${complete ? 'done' : ''}`}>{complete ? 'Complete' : `Module ${String(module.number).padStart(2, '0')}`}</span></div>
    <h3>{module.title}</h3><p>{module.description}</p>
    <div className="module-card-meta"><span>{module.topics.length} lessons</span><span>{quizScores[module.id]?.best ? `Quiz ${quizScores[module.id].best}%` : `${done}/${module.topics.length} done`}</span></div>
    <ProgressBar value={percent} tone={complete ? 'green' : 'indigo'} />
  </Link>;
}

export function TopicRow({ topic, showModule = false }) {
  const { completedTopics, currentTopicId } = useProgress();
  const done = completedTopics.includes(topic.id);
  return <Link to={`/topic/${topic.id}`} className={`topic-row ${done ? 'topic-row-done' : ''}`}>
    <span className={`topic-status ${done ? 'checked' : ''}`}>{done ? '✓' : '·'}</span>
    <span className="topic-row-copy"><strong>{topic.title}</strong>{showModule && <small>Module {topic.moduleNumber} · {topic.moduleTitle}</small>}</span>
    {currentTopicId === topic.id && !done && <span className="now-badge">In progress</span>}
    <span className="topic-duration">5 min <span aria-hidden="true">›</span></span>
  </Link>;
}

export function EmptyState({ icon = '✧', title, children, action }) {
  return <div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{children}</p>{action}</div>;
}

export function StatCard({ icon, label, value, detail, tone = 'blue' }) {
  return <div className="stat-card"><span className={`stat-icon ${tone}`}>{icon}</span><div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong>{detail && <small>{detail}</small>}</div></div>;
}
