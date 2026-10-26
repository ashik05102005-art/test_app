import { useState } from 'react';
import { Link } from 'react-router';
import { practiceQuestions } from '../data/practiceQuestions.js';
import { PageHeading } from '../components/ui.jsx';

export default function Practice() {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  return <div className="page practice-page">
    <PageHeading eyebrow="LEARN BY DOING" title="Practice lab" description="Try realistic testing exercises. Write down your approach first, then reveal a sample answer and compare." action={<span className="practice-count">{practiceQuestions.length} EXERCISES</span>} />
    <div className="practice-intro"><div className="practice-intro-icon">✳</div><div><strong>Your answers are yours to think through.</strong><p>There is no single perfect answer. Use the examples to spot gaps and strengthen your testing instincts.</p></div><span className="practice-intro-tag">NO GRADING · SELF-PACED</span></div>
    <div className="practice-grid">{practiceQuestions.map((exercise, index) => {
      const attempted = (answers[exercise.id] || '').trim().length > 0;
      const isRevealed = revealed[exercise.id];
      return <article key={exercise.id} className="practice-card"><div className="practice-card-top"><span className="practice-index">{String(index + 1).padStart(2, '0')}</span><span className="practice-category">{exercise.category}</span><span className="practice-level">{exercise.level}</span></div><h2>{exercise.title}</h2><p className="practice-prompt">{exercise.prompt}</p><label className="practice-answer-label" htmlFor={`${exercise.id}-answer`}>YOUR APPROACH <span>{attempted ? 'Draft saved while you stay on this page' : 'Give it a try before revealing'}</span></label><textarea id={`${exercise.id}-answer`} value={answers[exercise.id] || ''} onChange={(event) => setAnswers((old) => ({ ...old, [exercise.id]: event.target.value }))} placeholder="Write a few notes about what you would check…" rows={4} />{!isRevealed ? <button disabled={!attempted} className="button button-outline reveal-button" onClick={() => setRevealed((old) => ({ ...old, [exercise.id]: true }))}>Reveal a sample answer <span>⌄</span></button> : <div className="practice-sample-answer"><div className="sample-answer-heading"><span>✦</span><strong>One way to approach it</strong><button onClick={() => setRevealed((old) => ({ ...old, [exercise.id]: false }))}>Hide</button></div><p>{exercise.answer}</p></div>}</article>;
    })}</div>
    <div className="practice-footer"><span>✦</span><p>Want to strengthen a topic? Revisit the <Link to="/roadmap">learning roadmap</Link> and try another lesson.</p></div>
  </div>;
}
