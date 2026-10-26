import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getAdjacentTopics, getModule, getTopic } from '../data/modules.js';
import { getLesson } from '../data/lessonContent.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { PageHeading, ProgressBar } from '../components/ui.jsx';

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getTopic(topicId);
  const { completedTopics, completeTopic, setCurrentTopic, topicsTotal } = useProgress();
  useEffect(() => { if (topic) setCurrentTopic(topic.id); }, [topic, setCurrentTopic]);
  if (!topic) return <div className="page"><PageHeading eyebrow="LESSON" title="Topic not found" description="This topic may have moved. Explore the roadmap to choose another lesson." action={<Link to="/roadmap" className="button button-primary">View roadmap</Link>} /></div>;
  const lesson = getLesson(topic);
  const module = getModule(topic.moduleId);
  const { previous, next, index } = getAdjacentTopics(topic.id);
  const done = completedTopics.includes(topic.id);
  return <div className="page lesson-page">
    <div className="back-link-row"><Link to={`/module/${topic.moduleId}`}>← Back to {topic.moduleTitle}</Link><span>LESSON {String(index + 1).padStart(2, '0')}</span></div>
    <section className="lesson-heading"><div className="lesson-module-pill"><span>{topic.moduleNumber}</span> MODULE {String(topic.moduleNumber).padStart(2, '0')} <span className="pill-dot">·</span> {topic.moduleTitle}</div><h1>{lesson.title}</h1><p className="lesson-definition">{lesson.definition}</p><div className="lesson-heading-meta"><span>◷ &nbsp;5 min read</span><span className={done ? 'completed-label' : ''}>{done ? '✓ Completed' : '○ Not completed yet'}</span></div></section>
    <div className="lesson-layout"><article className="lesson-main">
      <section className="lesson-card explanation-card"><div className="lesson-section-heading"><span className="lesson-section-icon blue">✦</span><div><div className="eyebrow">THE IDEA</div><h2>Let’s make it simple</h2></div></div><p>{lesson.explanation}</p><div className="example-callout"><span className="callout-mark">“</span><div><strong>Real-world example</strong><p>{lesson.realWorldExample}</p></div></div></section>
      <section className="lesson-card keypoints-card"><div className="lesson-section-heading"><span className="lesson-section-icon green">✓</span><div><div className="eyebrow">THE TAKEAWAYS</div><h2>Key points to remember</h2></div></div><ul className="keypoint-list">{lesson.keyPoints.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul></section>
      <section className="lesson-card app-example-card"><div className="lesson-section-heading"><span className="lesson-section-icon violet">⌘</span><div><div className="eyebrow">PUT IT INTO PRACTICE</div><h2>Web app example</h2></div></div><p>{lesson.appExample}</p><div className="example-code-row"><span className="example-code-dot" /><span>Think like a tester</span><span className="example-code-arrow">→</span><span>Try inputs</span><span className="example-code-arrow">→</span><span>Compare results</span></div></section>
      <section className="lesson-card terms-card"><div className="lesson-section-heading"><span className="lesson-section-icon orange">Aa</span><div><div className="eyebrow">VOCABULARY</div><h2>Important terms</h2></div></div><div className="term-chips">{lesson.terms.map((term) => <span key={term}>{term}</span>)}</div></section>
      <section className="interview-card"><div className="interview-mark">?</div><div><div className="eyebrow">INTERVIEW PRACTICE</div><h2>{lesson.interviewQuestion}</h2><details><summary>Show a helpful hint <span>⌄</span></summary><p>{lesson.interviewHint}</p></details></div></section>
      <section className="quick-revision"><span className="revision-sparkle">✧</span><div><div className="eyebrow">ONE-MINUTE RECAP</div><h2>Quick revision</h2><ul>{lesson.quickRevision.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <div className="lesson-pager"><button className="button button-outline" disabled={!previous} onClick={() => previous && navigate(`/topic/${previous.id}`)}><span>←</span> Previous topic</button><span>{topic.moduleTitle} · {topic.index + 1} of {module.topics.length}</span><button className="button button-outline" disabled={!next} onClick={() => next && navigate(`/topic/${next.id}`)}>Next topic <span>→</span></button></div>
    </article>
    <aside className="lesson-aside"><div className="lesson-progress-panel"><div className="eyebrow">YOUR PROGRESS</div><div className="lesson-progress-number">{completedTopics.length}<small> / {topicsTotal} topics</small></div><ProgressBar value={Math.round((completedTopics.length / topicsTotal) * 100)} /><p>Every lesson brings you closer to confident testing.</p></div><button className={`button completion-button ${done ? 'completed' : 'button-primary'}`} onClick={() => completeTopic(topic.id)}>{done ? '✓ Completed' : '✓ Mark as completed'}</button><div className="lesson-aside-note"><span>✦</span><div><strong>Learning tip</strong><p>Try to explain the idea in your own words. If you can, you’ve got it.</p></div></div><div className="lesson-aside-next"><div className="eyebrow">UP NEXT</div>{next ? <Link to={`/topic/${next.id}`}><span><small>Module {next.moduleNumber}</small><strong>{next.title}</strong></span><span>→</span></Link> : <Link to="/progress"><span><small>Path complete</small><strong>View your progress</strong></span><span>→</span></Link>}</div></aside></div>
  </div>;
}
