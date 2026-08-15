'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  Bot,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  ChevronRight,
  Command,
  FileText,
  LayoutDashboard,
  Library,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Plug,
  Search,
  Send,
  Settings2,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  assistantGreeting,
  conversations,
  currentUser,
  dataFreshness,
  metrics,
  modelLabel,
  navigation,
  recentActivity,
  secondaryNavigation,
  sourceCoverage,
  sources,
  starterPrompts,
  workflows,
  workspace,
} from '@/lib/mock-data'

const iconMap = { LayoutDashboard, MessageSquare, Library, Workflow, ChartNoAxesCombined, Plug, Activity, Settings2 }

function Brand() {
  return <div className="flex items-center gap-3 px-1"><div className="brand-mark">N</div><div><p className="text-[12px] font-semibold tracking-[0.22em] text-foreground">NORTHSTAR</p><p className="text-[10px] tracking-[0.12em] text-muted-foreground">AI WORKSPACE</p></div></div>
}

export function Sidebar({ active, setActive, open, onClose }: { active: string; setActive: (value: string) => void; open: boolean; onClose: () => void }) {
  return <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="Workspace navigation">
    <div className="flex items-center justify-between"><Brand /><button className="icon-button lg:hidden" onClick={onClose} aria-label="Close navigation"><X /></button></div>
    <div className="workspace-switcher mt-8"><div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary"><Sparkles /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{workspace.name}</p><p className="truncate text-[11px] text-muted-foreground">{workspace.plan} plan</p></div><ChevronDown className="size-4 text-muted-foreground" /></div>
    <nav className="mt-8 flex flex-col gap-1">
      <p className="sidebar-label">Workspace</p><button className="nav-item nav-item-create" onClick={() => { setActive('Assistant'); onClose() }}><Plus /><span>New conversation</span><kbd>⌘ N</kbd></button>
      {navigation.map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <button key={item.label} onClick={() => { setActive(item.label); onClose() }} className={`nav-item ${active === item.label ? 'nav-item-active' : ''}`}><Icon /><span>{item.label}</span>{'count' in item && <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{item.count}</span>}</button> })}
      <p className="sidebar-label mt-7">System</p>
      {secondaryNavigation.map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <button key={item.label} onClick={() => { setActive(item.label); onClose() }} className={`nav-item ${active === item.label ? 'nav-item-active' : ''}`}><Icon /><span>{item.label}</span></button> })}
    </nav>
    <div className="mt-auto flex flex-col gap-4"><div className="status-card"><span className="status-dot" /><div><p className="text-xs font-medium">All systems operational</p><p className="text-[11px] text-muted-foreground">Last sync 18 min ago</p></div></div><div className="flex items-center gap-3 border-t border-border/70 pt-4"><div className="avatar">{currentUser.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{currentUser.name}</p><p className="truncate text-[11px] text-muted-foreground">{currentUser.role}</p></div><MoreHorizontal className="size-4 text-muted-foreground" /></div></div>
  </aside>
}

export function Topbar({ onMenu, onSearch, section = 'Overview' }: { onMenu: () => void; onSearch: () => void; section?: string }) {
  return <header className="topbar"><button className="icon-button lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu /></button><div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="hidden sm:inline">Workspace</span><ChevronRight className="hidden size-3 sm:inline" /><span className="text-foreground">{section}</span></div><div className="ml-auto flex items-center gap-2"><button className="search-trigger" onClick={onSearch} aria-label="Open command menu"><Search /><span className="hidden md:inline">Search workspace</span><kbd>⌘ K</kbd></button><button className="icon-button" aria-label="Notifications"><Bell /></button><div className="avatar avatar-small">MC</div></div></header>
}

function MetricCards() { return <section aria-label="Workspace metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <div className="metric-card" key={metric.label}><p className="text-xs text-muted-foreground">{metric.label}</p><div className="mt-3 flex items-end justify-between gap-3"><p className="metric-value">{metric.value}</p><span className="metric-trend">{metric.trend}</span></div><p className="mt-2 text-[11px] text-muted-foreground">{metric.detail}</p></div>)}</section> }

function PromptCard({ onSubmit }: { onSubmit: (value: string) => void }) { const [value, setValue] = useState(''); const submit = () => { if (value.trim()) { onSubmit(value); setValue('') } }; return <section className="prompt-card"><div className="flex items-center gap-2 text-xs font-medium text-primary"><span className="status-dot" />{assistantGreeting.eyebrow}<span className="text-muted-foreground">·</span><span className="text-muted-foreground">{modelLabel}</span></div><h1 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{assistantGreeting.title}</h1><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{assistantGreeting.description}</p><div className="prompt-input mt-7"><textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit() } }} placeholder="Ask anything about your workspace..." aria-label="Ask anything about your workspace" rows={2} /><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-1"><button className="prompt-action" aria-label="Attach source"><Paperclip /><span className="hidden sm:inline">Attach</span></button><span className="text-[11px] text-muted-foreground">Grounded answers with citations</span></div><Button size="sm" onClick={submit} aria-label="Send question"><Send data-icon="inline-start" />Ask</Button></div></div><div className="mt-4 flex flex-wrap gap-2">{starterPrompts.map((prompt) => <button key={prompt} className="starter-chip" onClick={() => setValue(prompt)}>{prompt}</button>)}</div></section> }

function ConversationPanel() { return <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Conversation history</p><h2 className="panel-title">Recent conversations</h2></div><button className="text-button">View all <ArrowUpRight /></button></div><div className="flex flex-col">{conversations.map((conversation) => <button className="conversation-row" key={conversation.title}><div className={`conversation-icon ${conversation.unread ? 'conversation-icon-active' : ''}`}><MessageSquare /></div><div className="min-w-0 flex-1 text-left"><div className="flex items-center gap-2"><p className="truncate text-sm font-medium">{conversation.title}</p>{conversation.unread && <span className="size-1.5 rounded-full bg-primary" />}</div><p className="mt-1 truncate text-xs text-muted-foreground">{conversation.preview}</p><div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground"><span>{conversation.category}</span><span>·</span><span>{conversation.time}</span></div></div><ChevronRight className="size-4 shrink-0 text-muted-foreground/60" /></button>)}</div></section> }

function KnowledgePanel() { return <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Retrieval layer</p><h2 className="panel-title">Knowledge coverage</h2></div><button className="icon-button" aria-label="Connect source"><Plus /></button></div><div className="flex flex-col gap-4">{sources.map((source) => <div className="source-row" key={source.name}><div className="source-icon"><FileText /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-medium">{source.name}</p><span className={`source-status ${source.status === 'Indexing' ? 'source-status-indexing' : ''}`}><span className="status-dot" />{source.status}</span></div><p className="mt-1 text-xs text-muted-foreground">{source.type} · {source.chunks}</p><p className="mt-1 text-[11px] text-muted-foreground/70">{source.updated}</p></div></div>)}</div><div className="coverage-chart mt-5"><div className="flex items-center justify-between"><p className="text-xs font-medium">Coverage by team</p><p className="text-[11px] text-muted-foreground">{dataFreshness}</p></div><div className="mt-4 flex items-end gap-2">{sourceCoverage.map((item) => <div className="flex flex-1 flex-col items-center gap-2" key={item.label}><div className="bar-track"><div className="bar-fill" style={{ height: `${item.value}%` }} /></div><span className="text-[10px] text-muted-foreground">{item.label}</span></div>)}</div></div></section> }

function WorkflowPanel() { return <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Agentic execution</p><h2 className="panel-title">Workflow activity</h2></div><button className="text-button">See activity <ArrowUpRight /></button></div><div className="flex flex-col gap-4">{workflows.map((workflow) => <div className="workflow-row" key={workflow.name}><div className={`workflow-icon workflow-${workflow.status.toLowerCase()}`}><Workflow /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-medium">{workflow.name}</p><span className={`workflow-status workflow-${workflow.status.toLowerCase()}`}>{workflow.status}</span></div><p className="mt-1 truncate text-xs text-muted-foreground">{workflow.description}</p><div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground"><span>{workflow.time}</span><span>{workflow.step}</span></div></div></div>)}</div></section> }

function ActivityPanel() { return <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Observability</p><h2 className="panel-title">System activity</h2></div><Activity className="size-4 text-primary" /></div><div className="flex flex-col gap-4">{recentActivity.map((item) => <div className="activity-row" key={item.detail}><div className="activity-line"><span className="activity-dot"><Check /></span></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="text-xs font-medium">{item.label}</p><time className="text-[10px] text-muted-foreground">{item.time}</time></div><p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">{item.detail}</p></div></div>)}</div><div className="mt-5 border-t border-border/70 pt-4"><div className="flex items-center justify-between text-[11px]"><span className="text-muted-foreground">Current model</span><span className="text-foreground">grounded-v2</span></div><div className="mt-2 flex items-center justify-between text-[11px]"><span className="text-muted-foreground">Response quality</span><span className="text-primary">0.96 faithfulness</span></div></div></section> }

function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) { const [query, setQuery] = useState(''); const items = useMemo(() => ['Ask about company policy', 'Search knowledge sources', 'Open workflow builder', 'View recent evaluations'].filter((item) => item.toLowerCase().includes(query.toLowerCase())), [query]); if (!open) return null; return <div className="command-overlay" role="dialog" aria-modal="true" aria-label="Quick navigation" onClick={onClose}><div className="command-menu" onClick={(event) => event.stopPropagation()}><div className="flex items-center gap-3 border-b border-border p-4"><Search className="size-4 text-muted-foreground" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or jump to..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><kbd>ESC</kbd></div><div className="p-2">{items.length ? items.map((item, index) => <button key={item} className="command-item" onClick={onClose}><div className="command-item-icon">{index === 0 ? <Sparkles /> : index === 1 ? <Search /> : index === 2 ? <Workflow /> : <ChartNoAxesCombined />}</div><span>{item}</span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></button>) : <p className="p-5 text-center text-sm text-muted-foreground">No matching workspace items</p>}</div><div className="flex items-center gap-2 border-t border-border px-4 py-3 text-[10px] text-muted-foreground"><Command className="size-3" />Search your workspace</div></div></div> }

export function EnterpriseWorkspace() { const [active, setActive] = useState('Overview'); const [sidebarOpen, setSidebarOpen] = useState(false); const [commandOpen, setCommandOpen] = useState(false); const [question, setQuestion] = useState(''); return <div className="workspace-shell"><Sidebar active={active} setActive={setActive} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="workspace-main"><Topbar onMenu={() => setSidebarOpen(true)} onSearch={() => setCommandOpen(true)} /><main className="workspace-content" aria-label="Workspace overview"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{active === 'Overview' ? 'Good morning, Maya' : active}</p><h1 className="page-title">Your intelligence workspace</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Connect knowledge, ask grounded questions, and turn reliable answers into repeatable workflows.</p></div><div className="flex items-center gap-2"><span className="hidden text-xs text-muted-foreground md:inline">Thursday, August 16, 2026</span><Button variant="outline" size="sm" onClick={() => setCommandOpen(true)}><Command data-icon="inline-start" />Quick actions</Button></div></div><MetricCards /><div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]"><PromptCard onSubmit={setQuestion} /><div className="callout-card"><div className="callout-icon"><Bot /></div><p className="mt-5 text-xs font-medium text-primary">Grounded AI</p><h2 className="mt-2 text-lg font-medium tracking-tight">Every answer has a trail.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Inspect citations, retrieval details, tool calls, and evaluation signals without leaving the workspace.</p><div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><span className="status-dot" />Secure by default<span className="text-border">·</span><span>SSO enabled</span></div></div></div>{question && <div className="answer-toast"><div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles /></div><div><p className="text-xs font-medium">Question queued</p><p className="mt-1 text-xs text-muted-foreground">“{question}” will be sent to the FastAPI service.</p></div><button className="ml-auto icon-button" onClick={() => setQuestion('')} aria-label="Dismiss"><X /></button></div>}<div className="mt-5 grid gap-5 xl:grid-cols-2"><ConversationPanel /><KnowledgePanel /></div><div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]"><WorkflowPanel /><ActivityPanel /></div><p className="mt-8 text-center text-[11px] text-muted-foreground/60">Frontend surface only · AI orchestration, retrieval, permissions, and evaluations live in the separate FastAPI service.</p></main></div><CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} /></div> }

export { Zap, BookOpen }
