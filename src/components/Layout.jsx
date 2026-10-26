import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { ProgressProvider, useProgress } from '../context/ProgressContext.jsx';

function Sidebar({ close }) {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: '⌂', end: true },
    { to: '/roadmap', label: 'Learning roadmap', icon: '⌁' },
    { to: '/practice', label: 'Practice lab', icon: '✳' },
    { to: '/progress', label: 'My progress', icon: '▥' },
  ];
  return <>
    <Link to="/" className="brand" onClick={close}><span className="brand-mark">T</span><span>testmaster<span className="brand-dot">.</span><small>LEARNING STUDIO</small></span></Link>
    <div className="side-label">YOUR LEARNING</div>
    <nav className="side-nav" aria-label="Main navigation">{navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={close} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><span className="side-link-icon">{item.icon}</span>{item.label}{item.to === '/practice' && <span className="new-badge">Try</span>}</NavLink>)}</nav>
    <div className="sidebar-bottom"><div className="side-tip-icon">✦</div><strong>Small steps add up</strong><p>A few minutes of practice today builds lasting confidence.</p><Link to="/roadmap" onClick={close}>Explore roadmap <span>→</span></Link></div>
    <div className="sidebar-user"><span className="avatar">Y</span><span><strong>Your learning space</strong><small>Saved on this device</small></span><span className="user-menu">···</span></div>
  </>;
}

function Topbar({ onMenu }) {
  const { overallPercent, currentTopic } = useProgress();
  const location = useLocation();
  const title = location.pathname === '/' || location.pathname === '/dashboard' ? 'Dashboard' : location.pathname.startsWith('/topic/') ? 'Lesson' : location.pathname.startsWith('/module/') ? 'Module overview' : location.pathname.startsWith('/quiz/') ? 'Module quiz' : location.pathname === '/roadmap' ? 'Learning roadmap' : location.pathname === '/practice' ? 'Practice lab' : location.pathname === '/progress' ? 'My progress' : 'Learning studio';
  return <header className="topbar">
    <button className="menu-button" aria-label="Open navigation" onClick={onMenu}>☰</button>
    <div className="topbar-title"><span className="breadcrumb-muted">Workspace</span><span className="breadcrumb-sep">/</span><strong>{title}</strong></div>
    <div className="topbar-right"><div className="topbar-progress"><span className="topbar-progress-dot" />{overallPercent}% complete</div><Link to={`/topic/${currentTopic.id}`} className="topbar-continue">Continue learning <span>↗</span></Link></div>
  </header>;
}

function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  return <div className="app-shell">
    <aside className="sidebar"><Sidebar /></aside>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={`mobile-sidebar ${mobileOpen ? 'open' : ''}`}><button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>×</button><Sidebar close={() => setMobileOpen(false)} /></aside>
    <div className="main-column"><Topbar onMenu={() => setMobileOpen(true)} /><main className="main-content"><Outlet /></main><footer className="footer"><span>TestMaster</span><span>Keep learning. Keep improving.</span><span>Progress saved locally on this device</span></footer></div>
  </div>;
}

export default function Layout() {
  return <ProgressProvider><Shell /></ProgressProvider>;
}
