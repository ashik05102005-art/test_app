import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getModule } from '../data/modules.js';
import { quizzes } from '../data/quizzes.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { PageHeading, ProgressBar } from '../components/ui.jsx';

export default function QuizPage() {
  const { moduleId } = useParams();
  const module = getModule(moduleId);
  const questions = quizzes[moduleId];
  const { saveQuizScore, quizScores } = useProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  useEffect(() => { setQuestionIndex(0); setSelected(null); setAnswers([]); setResult(null); }, [moduleId]);
  if (!module || !questions) return <div className="page"><PageHeading eyebrow="MODULE QUIZ" title="Quiz not found" description="Choose a module and its quiz from the learning roadmap." action={<Link className="button button-primary" to="/roadmap">View roadmap</Link>} /></div>;
  const question = questions[questionIndex];
  const score = answers.reduce((sum, answer, index) => sum + (answer === questions[index].answer ? 1 : 0), 0);
  const previousScore = quizScores[module.id];

  const advance = () => {
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    if (questionIndex + 1 < questions.length) { setQuestionIndex(questionIndex + 1); setSelected(null); }
    else {
      const finalScore = nextAnswers.reduce((sum, answer, index) => sum + (answer === questions[index].answer ? 1 : 0), 0);
      const finalPercent = Math.round((finalScore / questions.length) * 100);
      saveQuizScore(module.id, finalScore, questions.length);
      setResult({ score: finalScore, percent: finalPercent, passed: finalPercent >= 70 });
    }
  };
  const retry = () => { setQuestionIndex(0); setSelected(null); setAnswers([]); setResult(null); };

  if (result) return <div className="page quiz-page"><div className="back-link-row"><Link to={`/module/${module.id}`}>← Back to module</Link><span>MODULE {String(module.number).padStart(2, '0')} QUIZ</span></div><section className={`quiz-result-card ${result.passed ? 'result-pass' : 'result-fail'}`}><span className="result-icon">{result.passed ? '✦' : '↻'}</span><div className="eyebrow">{result.passed ? 'MODULE QUIZ COMPLETE' : 'KEEP PRACTICING'}</div><h1>{result.passed ? 'Nicely done!' : 'You’re building your knowledge.'}</h1><p>{result.passed ? 'You passed this quiz. The module is now marked complete.' : 'Review the lesson notes, then give the quiz another try. You’ve got this.'}</p><div className="result-score"><strong>{result.percent}<small>%</small></strong><span>{result.score} correct out of {questions.length}</span></div><ProgressBar value={result.percent} tone={result.passed ? 'green' : 'indigo'} /><div className="result-status">{result.passed ? '✓ PASS' : '↻ NOT PASSED'} <span>·</span> 70% required to pass</div>{previousScore?.best > result.percent && <div className="best-score-note">Your best score is {previousScore.best}%. Keep going to beat it.</div>}<div className="result-actions"><button onClick={retry} className="button button-primary">Try again <span>↻</span></button><Link to={`/module/${module.id}`} className="button button-outline">Back to module</Link><Link to={`/topic/${module.topics[0].id}`} className="text-link">Review lessons</Link></div></section></div>;

  return <div className="page quiz-page"><div className="back-link-row"><Link to={`/module/${module.id}`}>← Back to {module.title}</Link><span>MODULE {String(module.number).padStart(2, '0')} QUIZ</span></div><div className="quiz-layout"><section className="quiz-main"><div className="quiz-topline"><div className={`quiz-module-mark ${module.color}`}>{module.icon}</div><div><div className="eyebrow">KNOWLEDGE CHECK</div><h1>{module.title}</h1></div></div><div className="quiz-progress-label"><span>Question {questionIndex + 1} <small>of {questions.length}</small></span><span>{Math.round((questionIndex / questions.length) * 100)}% complete</span></div><ProgressBar value={Math.round((questionIndex / questions.length) * 100)} /><div className="question-card"><div className="question-number">QUESTION {String(questionIndex + 1).padStart(2, '0')}</div><h2>{question.question}</h2><div className="answer-options">{question.options.map((option, index) => {
    const answered = selected !== null;
    const isCorrect = index === question.answer;
    const isSelected = index === selected;
    const statusClass = answered && isCorrect ? 'correct' : answered && isSelected ? 'incorrect' : '';
    return <button key={option} disabled={answered} onClick={() => setSelected(index)} className={`answer-option ${isSelected ? 'selected' : ''} ${statusClass}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answered && isCorrect && <span className="option-status">✓</span>}{answered && isSelected && !isCorrect && <span className="option-status">×</span>}</button>;
  })}</div>{selected !== null && <div className={`answer-feedback ${selected === question.answer ? 'feedback-correct' : 'feedback-incorrect'}`}><strong>{selected === question.answer ? 'That’s right!' : 'Not quite — here’s why.'}</strong><p>{question.explanation}</p></div>}<div className="question-footer"><span>✦ &nbsp;One correct answer</span><button disabled={selected === null} onClick={advance} className="button button-primary">{questionIndex + 1 === questions.length ? 'See my results' : 'Next question'} <span>→</span></button></div></div></section><aside className="quiz-aside"><div className="quiz-aside-card"><span className="quiz-aside-sparkle">✧</span><h3>Quick quiz</h3><p>Check what you’ve learned. You’ll get an explanation after every answer.</p><div className="quiz-aside-fact"><span>◎</span><strong>{questions.length} questions</strong></div><div className="quiz-aside-fact"><span>◷</span><strong>About 3 minutes</strong></div><div className="quiz-aside-fact"><span>✦</span><strong>70% to pass</strong></div>{previousScore && <div className="previous-attempt"><span>Your best</span><strong>{previousScore.best}%</strong></div>}</div><div className="quiz-aside-tip"><strong>There’s no time limit.</strong><p>Take your time and think through each answer. You can always retry.</p></div></aside></div></div>;
}
