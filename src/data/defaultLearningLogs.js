export const defaultLearningLogs = [
  {
    id: 'log-1',
    week: 'Week 1',
    date: 'Week of Oct 1, 2025',
    topics: ['AI Fluency Framework', '4D Model Introduction'],
    notes: "Learned about the 4D Framework - Delegation, Description, Discernment, and Diligence. Understanding that AI fluency isn't just about using tools, but knowing when to use them, how to communicate effectively, and how to evaluate outputs critically. The three modes of interaction (Automation, Augmentation, Agency) help frame how to approach different tasks.",
    tags: ['ai-fluency', 'foundations', 'framework'],
    keyTakeaway: 'AI is a thinking partner, not just a tool for automation.',
    createdAt: Date.now() - 86400000 * 49, // 49 days ago
    updatedAt: Date.now() - 86400000 * 49,
  },
  {
    id: 'log-2',
    week: 'Week 2',
    date: 'Week of Oct 8, 2025',
    topics: ['Delegation', 'Platform Awareness', 'Task Breakdown'],
    notes: 'Explored Delegation competency - understanding when to use AI vs human work. Learned about platform awareness: knowing capabilities and limitations of different AI systems (ChatGPT vs Claude vs specialized tools). Practiced breaking down complex tasks into AI-suitable and human-suitable components.',
    tags: ['delegation', 'ai-tools', 'planning'],
    keyTakeaway: 'Not everything should be delegated to AI. Human judgment matters most for creative vision and ethical decisions.',
    createdAt: Date.now() - 86400000 * 42, // 42 days ago
    updatedAt: Date.now() - 86400000 * 42,
  },
  {
    id: 'log-3',
    week: 'Week 3',
    date: 'Week of Oct 15, 2025',
    topics: ['Prompt Engineering', 'Product/Process/Performance Description'],
    notes: "Deep dive into Description competency. Learned prompt engineering techniques: few-shot learning, chain-of-thought prompting, role definition, output formatting. The 3 P's: Product Description (what you want), Process Description (how AI should work), Performance Description (how AI should behave). Created 10 prompts for different use cases.",
    tags: ['prompting', 'description', 'communication'],
    keyTakeaway: 'Specific, structured prompts get better results than vague requests.',
    createdAt: Date.now() - 86400000 * 35, // 35 days ago
    updatedAt: Date.now() - 86400000 * 35,
  },
  {
    id: 'log-4',
    week: 'Week 4',
    date: 'Week of Oct 22, 2025',
    topics: ['Discernment', 'AI Output Evaluation', 'Hallucinations'],
    notes: 'Focused on Discernment - critically evaluating AI outputs. Learned about hallucinations, bias, and limitations. Practiced Product Discernment (is output accurate?), Process Discernment (was the reasoning sound?), and Performance Discernment (did AI behave appropriately?). Identified hallucinations in AI-generated content.',
    tags: ['discernment', 'evaluation', 'critical-thinking'],
    keyTakeaway: 'Always verify AI outputs, especially for facts, code, and critical decisions.',
    createdAt: Date.now() - 86400000 * 28, // 28 days ago
    updatedAt: Date.now() - 86400000 * 28,
  },
  {
    id: 'log-5',
    week: 'Week 5',
    date: 'Week of Oct 29, 2025',
    topics: ['Debugging with AI', 'Limitations', 'Bug Categories'],
    notes: 'Studied what bugs AI can catch (syntax, logic, type errors) vs what it misses (context-dependent issues, performance, security). Learned about bugs AI might introduce (over-optimization, security vulnerabilities, incomplete fixes). Used AI to debug code samples.',
    tags: ['debugging', 'coding', 'limitations'],
    keyTakeaway: 'AI is excellent for syntax and common patterns but struggles with business logic and context. Hybrid approach works best.',
    createdAt: Date.now() - 86400000 * 21, // 21 days ago
    updatedAt: Date.now() - 86400000 * 21,
  },
  {
    id: 'log-6',
    week: 'Week 6',
    date: 'Week of Nov 5, 2025',
    topics: ['AI Ethics', 'Transparency', 'Accountability', 'Diligence'],
    notes: 'Explored Diligence competency - using AI responsibly. Learned about Creation Diligence (thoughtful tool selection), Transparency Diligence (disclosure of AI use), and Deployment Diligence (verifying outputs before sharing). Discussed privacy concerns, bias in AI, academic integrity.',
    tags: ['ethics', 'diligence', 'responsibility'],
    keyTakeaway: "You're responsible for everything AI helps you create. Verify, vouch for, and be transparent about AI involvement.",
    createdAt: Date.now() - 86400000 * 14, // 14 days ago
    updatedAt: Date.now() - 86400000 * 14,
  },
  {
    id: 'log-7',
    week: 'Week 7',
    date: 'Week of Nov 12, 2025',
    topics: ['Web Accessibility', 'WCAG Standards', 'Inclusive UX'],
    notes: 'Learned WCAG 2.1 standards - Level A, AA, AAA compliance. Key principles: contrast ratios (4.5:1 minimum for text), touch targets (48px minimum), proper labels, keyboard navigation, semantic HTML, ARIA attributes. Analyzed forms for accessibility issues.',
    tags: ['accessibility', 'wcag', 'design'],
    keyTakeaway: "Accessibility isn't optional - 79% of users are concerned about it, and it's legally required in many cases.",
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    updatedAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'log-8',
    week: 'Week 8',
    date: 'Week of Nov 19, 2025',
    topics: ['React', 'Tailwind', 'Claude Code', 'Full-Stack Development'],
    notes: 'Built Dev Dashboard using Claude Code - a personalized command center for developers. Applied everything learned: AI fluency (using Claude Code as augmentation), accessibility principles (WCAG AA compliance), thoughtful delegation (AI for boilerplate, human for logic). Tech stack: Vite, React, Tailwind CSS, localStorage. Features: Daily tasks, AI prompt library, code snippets, notes, learning log, quick links.',
    tags: ['react', 'project', 'claude-code', 'development'],
    keyTakeaway: 'Completed functional MVP in 1 week using AI as a thinking partner while maintaining code quality and accessibility standards.',
    createdAt: Date.now(), // Today
    updatedAt: Date.now(),
  },
];
