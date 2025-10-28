export const defaultPrompts = [
  // BEGINNER (7 prompts)
  {
    id: '1',
    title: 'Explain Like I\'m 5',
    template: `Explain [CONCEPT] in simple terms that a beginner could understand.

Use analogies and real-world examples. Break it down step by step.

Concept I want to understand: [PASTE CONCEPT HERE]`,
    category: 'Learning',
    tags: ['explanation', 'beginner', 'concepts'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '2',
    title: 'What Does This Code Do?',
    template: `I'm looking at this code and trying to understand what it does:

[PASTE CODE HERE]

Can you:
1. Explain what this code does in plain English
2. Break down each part step-by-step
3. Explain any concepts I should know
4. Suggest what I should learn next to understand this better`,
    category: 'Learning',
    tags: ['code-review', 'understanding', 'beginner'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '3',
    title: 'Fix My Simple Bug',
    template: `I'm getting this error and I'm not sure what's wrong:

Error: [PASTE ERROR MESSAGE]

My code:
[PASTE CODE]

What I'm trying to do: [DESCRIBE GOAL]

Can you help me understand what's wrong and how to fix it?`,
    category: 'Debug',
    tags: ['debugging', 'beginner', 'error'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '4',
    title: 'How Do I Start?',
    template: `I want to learn [TOPIC/SKILL] but I don't know where to start.

My current level: [DESCRIBE YOUR EXPERIENCE]
My goal: [WHAT YOU WANT TO BUILD/ACHIEVE]
Time available: [HOW MUCH TIME YOU HAVE]

Can you give me:
1. A simple roadmap to get started
2. The first 3 things I should learn
3. Resources or tutorials you'd recommend
4. A small first project to try`,
    category: 'Learning',
    tags: ['getting-started', 'beginner', 'guidance'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '5',
    title: 'Simplify This Explanation',
    template: `I read this explanation but it's too complicated:

[PASTE COMPLEX EXPLANATION]

Can you explain the same thing but much simpler? Pretend I'm learning this for the first time.`,
    category: 'Learning',
    tags: ['explanation', 'simplification', 'beginner'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '6',
    title: 'Is This Code Correct?',
    template: `I wrote this code to [DESCRIBE PURPOSE]:

[PASTE YOUR CODE]

Questions:
1. Does this code work correctly?
2. Are there any bugs I'm missing?
3. Is this the right approach?
4. What should I learn to write this better?`,
    category: 'Review',
    tags: ['validation', 'beginner', 'feedback'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '7',
    title: 'Common Mistakes to Avoid',
    template: `I'm learning [TECHNOLOGY/CONCEPT].

What are the most common mistakes beginners make with this?
What should I watch out for?
What bad habits should I avoid developing?`,
    category: 'Learning',
    tags: ['best-practices', 'beginner', 'mistakes'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },

  // INTERMEDIATE (7 prompts)
  {
    id: '8',
    title: 'Debug Helper',
    template: `I'm getting this error:
[PASTE ERROR MESSAGE]

In this code:
[PASTE CODE]

Context: [WHAT YOU'RE TRYING TO DO]

I've already tried:
- [LIST WHAT YOU TRIED]

Help me understand what's wrong and suggest a fix.`,
    category: 'Debug',
    tags: ['debugging', 'error-handling', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '9',
    title: 'Code Review Request',
    template: `Please review this code for:
- Performance issues
- Security vulnerabilities
- Best practices
- Edge cases I might have missed

Code:
[PASTE CODE]

Purpose: [WHAT IT DOES]

Be thorough and suggest improvements.`,
    category: 'Review',
    tags: ['code-review', 'quality', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '10',
    title: 'Refactor This Code',
    template: `This code works but it's messy. Help me refactor it to be cleaner and more maintainable:

[PASTE CODE]

Focus on:
- Readability
- Following best practices
- Reducing complexity
- Better naming

Explain each change you make.`,
    category: 'Refactor',
    tags: ['refactoring', 'clean-code', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '11',
    title: 'Add Error Handling',
    template: `This code works in the happy path, but I need proper error handling:

[PASTE CODE]

Add comprehensive error handling for:
- Network failures
- Invalid inputs
- Edge cases
- User-facing error messages

Show me the updated code with explanations.`,
    category: 'Quality',
    tags: ['error-handling', 'robustness', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '12',
    title: 'Performance Optimization',
    template: `This code is slow with large datasets:

[PASTE CODE]

Dataset size: [DESCRIBE SCALE]
Current performance: [DESCRIBE ISSUE]

Help me optimize this for better performance. Explain the bottlenecks and your improvements.`,
    category: 'Performance',
    tags: ['optimization', 'performance', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '13',
    title: 'Write Tests For This',
    template: `Write unit tests for this function:

[PASTE CODE]

Include tests for:
- Happy path scenarios
- Edge cases
- Error conditions
- Invalid inputs

Use [TESTING FRAMEWORK] if relevant.`,
    category: 'Testing',
    tags: ['testing', 'quality', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '14',
    title: 'Convert To Modern Syntax',
    template: `Update this code to use modern [LANGUAGE/FRAMEWORK] syntax and best practices:

[PASTE OLD CODE]

Target version: [SPECIFY VERSION]

Explain each modernization you make.`,
    category: 'Refactor',
    tags: ['modernization', 'syntax', 'intermediate'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },

  // ADVANCED (6 prompts)
  {
    id: '15',
    title: 'Architecture Design',
    template: `I need to design a system for [DESCRIBE PROJECT].

Requirements:
- [LIST REQUIREMENTS]

Constraints:
- [LIST CONSTRAINTS]

Expected scale: [USERS/DATA/TRAFFIC]

Suggest:
1. Overall architecture
2. Tech stack choices with reasoning
3. Key design patterns to use
4. Potential bottlenecks and how to handle them
5. Scalability considerations`,
    category: 'Architecture',
    tags: ['system-design', 'architecture', 'advanced'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '16',
    title: 'Security Audit',
    template: `Audit this code for security vulnerabilities:

[PASTE CODE]

Check for:
- SQL injection
- XSS attacks
- Authentication/authorization issues
- Data exposure
- CSRF vulnerabilities
- Any other security concerns

Provide specific fixes for each issue found.`,
    category: 'Security',
    tags: ['security', 'vulnerabilities', 'advanced'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '17',
    title: 'Complex Bug Deep Dive',
    template: `I have a complex bug that only occurs in production:

Symptoms: [DESCRIBE BEHAVIOR]

Code:
[PASTE RELEVANT CODE]

Environment: [PRODUCTION DETAILS]

What I know:
- [OBSERVATIONS]

What I've tried:
- [DEBUGGING STEPS TAKEN]

Help me create a systematic debugging strategy to identify the root cause.`,
    category: 'Debug',
    tags: ['debugging', 'advanced', 'investigation'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '18',
    title: 'API Design Review',
    template: `Review this API design:

Endpoints:
[LIST ENDPOINTS WITH METHODS]

Data models:
[DESCRIBE MODELS]

Use cases:
[DESCRIBE USE CASES]

Evaluate:
1. RESTful principles adherence
2. Consistency and naming
3. Scalability concerns
4. Versioning strategy
5. Security considerations
6. Suggest improvements`,
    category: 'Architecture',
    tags: ['api-design', 'rest', 'advanced'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '19',
    title: 'Performance Profiling Analysis',
    template: `Analyze this performance profile:

Bottleneck identified: [DESCRIBE]

Profiling data:
[PASTE PROFILE RESULTS]

Code in question:
[PASTE CODE]

Constraints:
- [LIST CONSTRAINTS]

Suggest optimizations with expected impact and trade-offs.`,
    category: 'Performance',
    tags: ['profiling', 'optimization', 'advanced'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
  {
    id: '20',
    title: 'Legacy Code Migration Strategy',
    template: `I need to migrate this legacy codebase:

Current: [OLD TECH STACK]
Target: [NEW TECH STACK]

Codebase size: [DESCRIBE SCALE]

Constraints:
- [LIST CONSTRAINTS]
- Must maintain uptime during migration

Create a phased migration strategy with:
1. Assessment of risks
2. Step-by-step plan
3. Testing strategy
4. Rollback plan
5. Timeline estimate`,
    category: 'Refactor',
    tags: ['migration', 'legacy', 'advanced'],
    favorite: false,
    usageCount: 0,
    createdAt: Date.now(),
    lastUsed: null,
  },
];
