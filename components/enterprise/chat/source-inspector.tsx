import { BookOpen, Check, ExternalLink, FileText, X } from 'lucide-react'
import type { AssistantSource } from '@/lib/mock-data'

export function SourceInspector({ source, sources, onSelect, onClose }: { source: AssistantSource; sources: AssistantSource[]; onSelect: (id: string) => void; onClose: () => void }) {
  return <aside className="source-inspector" aria-label="Source inspector">
    <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5"><div><p className="panel-kicker">Reference surface</p><h2 className="mt-1 text-sm font-semibold">Source inspector</h2></div><button className="icon-button" onClick={onClose} aria-label="Close source inspector"><X /></button></div>
    <div className="mt-5 flex gap-2">{sources.map((item) => <button key={item.id} className={`source-tab ${source.id === item.id ? 'source-tab-active' : ''}`} onClick={() => onSelect(item.id)}>{item.id === 'source-1' ? '[1]' : '[2]'}</button>)}</div>
    <div className="mt-6 flex items-start gap-3"><div className="callout-icon"><FileText /></div><div className="min-w-0"><h3 className="text-sm font-medium leading-5">{source.name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{source.version}</p></div></div>
    <div className="mt-6 grid grid-cols-2 gap-3"><div className="inspector-meta"><span>Section</span><strong>{source.section}</strong></div><div className="inspector-meta"><span>Relevance</span><strong className="text-primary">{source.relevance}</strong></div><div className="inspector-meta"><span>Source type</span><strong>{source.type}</strong></div><div className="inspector-meta"><span>Status</span><strong className="flex items-center gap-1.5"><span className="status-dot" />Synced</strong></div></div>
    <div className="mt-6"><p className="panel-kicker">Retrieved excerpt</p><blockquote className="excerpt mt-3">“{source.excerpt}”</blockquote></div>
    <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5"><span className="flex items-center gap-2 text-[11px] text-primary"><Check />{source.status}</span><button className="text-button">Open document <ExternalLink /></button></div>
    <div className="mt-auto border-t border-border/70 pt-5"><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><BookOpen /><span>Sources stay attached to this answer</span></div></div>
  </aside>
}
