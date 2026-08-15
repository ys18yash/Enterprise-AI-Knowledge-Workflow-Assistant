'use client'

import { MoreHorizontal, Plus, Search, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { AssistantConversation } from '@/lib/mock-data'

export function ConversationSidebar({ conversations, activeId, onSelect, onNew }: { conversations: AssistantConversation[]; activeId: string; onSelect: (id: string) => void; onNew: () => void }) {
  const [query, setQuery] = useState('')
  const filtered = conversations.filter((item) => `${item.title} ${item.preview}`.toLowerCase().includes(query.toLowerCase()))
  return <aside className="chat-history" aria-label="Conversation history">
    <div className="flex items-center justify-between gap-3"><div><p className="panel-kicker">Workspace</p><h2 className="mt-1 text-sm font-semibold">Conversations</h2></div><Button size="icon" variant="outline" onClick={onNew} aria-label="New conversation"><Plus data-icon="inline-start" /></Button></div>
    <label className="chat-search mt-5"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" aria-label="Search conversations" /></label>
    <div className="mt-6 flex items-center justify-between"><p className="panel-kicker">Recent</p><button className="text-button" aria-label="Conversation options"><MoreHorizontal /></button></div>
    <div className="mt-2 flex flex-col gap-1" role="list">{filtered.map((conversation) => <button key={conversation.id} className={`chat-history-row ${activeId === conversation.id ? 'chat-history-row-active' : ''}`} onClick={() => onSelect(conversation.id)} role="listitem"><span className="chat-history-icon"><MessageSquare /></span><span className="min-w-0 flex-1 text-left"><span className="flex items-center gap-2"><span className="truncate text-xs font-medium">{conversation.title}</span>{activeId === conversation.id && <span className="status-dot" />}</span><span className="mt-1 block truncate text-[11px] text-muted-foreground">{conversation.preview}</span><span className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground"><span>{conversation.category}</span><span>·</span><span>{conversation.time}</span></span></span></button>)}</div>
    {filtered.length === 0 && <p className="py-8 text-center text-xs text-muted-foreground">No conversations found</p>}
  </aside>
}
