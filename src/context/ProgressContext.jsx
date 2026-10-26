import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { modules, topics } from '../data/modules.js';

const STORAGE_KEY = 'testmaster-progress-v1';
const ProgressContext = createContext(null);

function readProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      completedTopics: Array.isArray(saved.completedTopics) ? saved.completedTopics.filter((id) => topics.some((topic) => topic.id === id)) : [],
      completedModules: Array.isArray(saved.completedModules) ? saved.completedModules.filter((id) => modules.some((module) => module.id === id)) : [],
      quizScores: saved.quizScores && typeof saved.quizScores === 'object' ? saved.quizScores : {},
      currentTopicId: topics.some((topic) => topic.id === saved.currentTopicId) ? saved.currentTopicId : topics[0].id,
    };
  } catch {
    return { completedTopics: [], completedModules: [], quizScores: {}, currentTopicId: topics[0].id };
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(readProgress);

  useEffect(() => {
    const overallProgress = Math.round((progress.completedTopics.length / topics.length) * 100);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, overallProgress })); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [progress]);

  const setCurrentTopic = useCallback((topicId) => {
    if (topics.some((topic) => topic.id === topicId)) setProgress((old) => ({ ...old, currentTopicId: topicId }));
  }, []);

  const completeTopic = useCallback((topicId) => {
    const topic = topics.find((item) => item.id === topicId);
    if (!topic) return;
    setProgress((old) => {
      const completedTopics = [...new Set([...old.completedTopics, topicId])];
      const module = modules.find((item) => item.id === topic.moduleId);
      const moduleComplete = module.topics.every((item) => completedTopics.includes(item.id));
      const completedModules = moduleComplete ? [...new Set([...old.completedModules, module.id])] : old.completedModules;
      return { ...old, completedTopics, completedModules };
    });
  }, []);

  const saveQuizScore = useCallback((moduleId, score, total) => {
    setProgress((old) => {
      const previous = old.quizScores[moduleId] ?? { best: 0, attempts: 0, passed: false };
      const percentage = Math.round((score / total) * 100);
      const passed = percentage >= 70;
      const quizScores = { ...old.quizScores, [moduleId]: { best: Math.max(previous.best, percentage), latest: percentage, attempts: previous.attempts + 1, passed: previous.passed || passed } };
      const completedModules = passed ? [...new Set([...old.completedModules, moduleId])] : old.completedModules;
      return { ...old, quizScores, completedModules };
    });
  }, []);

  const resetProgress = useCallback(() => setProgress({ completedTopics: [], completedModules: [], quizScores: {}, currentTopicId: topics[0].id }), []);

  const value = useMemo(() => {
    const completedTopicCount = progress.completedTopics.length;
    const overallPercent = Math.round((completedTopicCount / topics.length) * 100);
    const currentTopic = topics.find((topic) => topic.id === progress.currentTopicId) ?? topics[0];
    const moduleIsComplete = (module) => progress.completedModules.includes(module.id) || module.topics.every((topic) => progress.completedTopics.includes(topic.id));
    return { ...progress, topicsTotal: topics.length, modulesTotal: modules.length, completedTopicCount, overallPercent, currentTopic, moduleIsComplete, setCurrentTopic, completeTopic, saveQuizScore, resetProgress };
  }, [progress, setCurrentTopic, completeTopic, saveQuizScore, resetProgress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
