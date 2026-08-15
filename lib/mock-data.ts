export type Conversation = { title: string; preview: string; time: string; category: string; unread?: boolean }
export type Source = { name: string; type: string; updated: string; chunks: string; status: 'Synced' | 'Indexing' }
export type Workflow = { name: string; description: string; status: 'Completed' | 'Running' | 'Queued'; time: string; step: string }

export const metrics = [
  { label: 'Grounded answers', value: '98.4%', trend: '+2.1%', detail: 'last 30 days' },
  { label: 'Knowledge sources', value: '142', trend: '+8', detail: 'this month' },
  { label: 'Active workflows', value: '06', trend: '2 running', detail: 'across workspace' },
  { label: 'Avg. response time', value: '1.8s', trend: '-0.4s', detail: 'vs. last week' },
]
export const conversations: Conversation[] = [
  { title: 'Q3 procurement policy changes', preview: 'Summarized the approval thresholds and exceptions...', time: '12 min ago', category: 'Operations', unread: true },
  { title: 'Customer escalation playbook', preview: 'What are the required steps for a P1 escalation?', time: '1 hr ago', category: 'Support' },
  { title: 'Onboarding checklist refresh', preview: 'Compared the latest People Ops docs with the current...', time: 'Yesterday', category: 'People' },
  { title: 'Revenue recognition guidance', preview: 'Found 4 relevant passages across Finance sources.', time: 'Yesterday', category: 'Finance' },
]
export const sources: Source[] = [
  { name: 'Company Handbook', type: 'Notion', updated: 'Updated 18 min ago', chunks: '2,842 chunks', status: 'Synced' },
  { name: 'Product documentation', type: 'GitHub', updated: 'Updated 2 hrs ago', chunks: '8,214 chunks', status: 'Synced' },
  { name: 'FY26 operating plan', type: 'Google Drive', updated: 'Indexing now', chunks: '1,128 chunks', status: 'Indexing' },
]
export const workflows: Workflow[] = [
  { name: 'Weekly knowledge digest', description: 'Collects notable changes across connected sources.', status: 'Completed', time: 'Today, 09:42', step: '6 of 6 steps' },
  { name: 'Vendor risk review', description: 'Checks new vendor records against policy and risk criteria.', status: 'Running', time: 'Started 4 min ago', step: '3 of 5 steps' },
  { name: 'Support ticket triage', description: 'Classifies and routes incoming enterprise support requests.', status: 'Queued', time: 'Scheduled 14:00', step: 'Waiting' },
]
export const recentActivity = [
  { label: 'Tool call', detail: 'search_knowledge', time: '11:48:20' },
  { label: 'Retrieval', detail: '12 sources / 38 passages', time: '11:48:21' },
  { label: 'Evaluation', detail: 'Faithfulness score 0.96', time: '11:48:23' },
]
export const sourceCoverage = [{ label: 'Product', value: 84 }, { label: 'Operations', value: 72 }, { label: 'Finance', value: 58 }, { label: 'People', value: 44 }]
export const navigation = [
  { label: 'Overview', icon: 'LayoutDashboard' }, { label: 'Conversations', icon: 'MessageSquare', count: '4' }, { label: 'Knowledge', icon: 'Library' }, { label: 'Workflows', icon: 'Workflow' }, { label: 'Evaluations', icon: 'ChartNoAxesCombined' },
]
export const secondaryNavigation = [{ label: 'API & integrations', icon: 'Plug' }, { label: 'Observability', icon: 'Activity' }, { label: 'Workspace settings', icon: 'Settings2' }]
export const starterPrompts = ["Summarize this week's policy changes", 'Find the latest product launch notes', 'How do I request a new vendor?']
export const currentUser = { name: 'Maya Chen', initials: 'MC', role: 'Workspace admin' }
export const workspace = { name: 'Northstar', plan: 'Enterprise' }
export const assistantGreeting = { eyebrow: 'Northstar intelligence', title: 'What would you like to know?', description: 'Ask a grounded question across your connected workspace, or start with a workflow.' }
export const modelLabel = 'Northstar / grounded-v2'
export const dataFreshness = '98.4% fresh'

export type AssistantConversation = { id: string; title: string; time: string; category: string; preview: string }
export type AssistantCitation = { id: string; sourceId: string; label: string }
export type AssistantSource = { id: string; name: string; version: string; section: string; type: string; relevance: string; excerpt: string; status: string }
export type ExecutionStep = { label: string; detail: string; status: 'complete' | 'active' }

export const assistantConversations: AssistantConversation[] = [
  { id: 'refund-policy', title: 'Enterprise refund policy', time: 'Now', category: 'Finance', preview: 'What is the enterprise refund policy for customers?' },
  { id: 'procurement', title: 'Q3 procurement policy changes', time: '12 min ago', category: 'Operations', preview: 'Summarized approval thresholds and exceptions.' },
  { id: 'deployment', title: 'Production deployment approvals', time: 'Yesterday', category: 'Engineering', preview: 'Mapped the release approval chain.' },
  { id: 'inc-1042', title: 'Ticket INC-1042 next action', time: 'Mon', category: 'Support', preview: 'Reviewed incident notes and ownership.' },
]
export const assistantSources: AssistantSource[] = [
  { id: 'source-1', name: 'Enterprise Customer Policy', version: 'v4.2 · Effective May 2026', section: '§ 7.3 Refund eligibility', type: 'Company Handbook', relevance: '98%', excerpt: 'Enterprise customers may request a full refund within 30 days of initial activation when the service has not materially met the contracted requirements. Requests after 30 days require Finance approval.', status: 'Verified · Synced' },
  { id: 'source-2', name: 'Master Services Agreement', version: 'v2.8 · Updated Apr 2026', section: 'Schedule B · Commercial terms', type: 'Legal repository', relevance: '94%', excerpt: 'Credits and refunds are governed by the order form and applicable service-level commitments. Any exception must be documented by the account owner.', status: 'Verified · Synced' },
]
export const assistantCitations: AssistantCitation[] = [{ id: 'citation-1', sourceId: 'source-1', label: '[1]' }, { id: 'citation-2', sourceId: 'source-2', label: '[2]' }]
export const executionActivity: ExecutionStep[] = [
  { label: 'Request received', detail: 'Conversation turn accepted', status: 'complete' },
  { label: 'Retrieving knowledge', detail: '12 sources · 38 passages', status: 'complete' },
  { label: 'Analyzing sources', detail: '2 high-relevance passages selected', status: 'complete' },
  { label: 'Preparing grounded response', detail: 'Citations and policy scope verified', status: 'complete' },
  { label: 'Completed', detail: '1.8s · grounded-v2', status: 'complete' },
]
