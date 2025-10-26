export const defaultSnippets = [
  // BEGINNER (5 snippets)
  {
    id: 'snippet-1',
    title: 'Basic useState Hook',
    code: `const [count, setCount] = useState(0);

// Update state
setCount(count + 1);

// Update based on previous state (safer)
setCount(prevCount => prevCount + 1);`,
    language: 'javascript',
    tags: ['react', 'hooks', 'state', 'beginner'],
    description: 'Basic React state management with useState',
    difficulty: 'beginner',
    createdAt: Date.now() - 86400000 * 10,
    copiedCount: 0,
  },
  {
    id: 'snippet-2',
    title: 'Simple useEffect',
    code: `useEffect(() => {
  // Code runs after render
  console.log('Component mounted or updated');

  // Cleanup function (optional)
  return () => {
    console.log('Cleanup before unmount or next effect');
  };
}, []); // Empty array = run once on mount`,
    language: 'javascript',
    tags: ['react', 'hooks', 'effects', 'beginner'],
    description: 'Basic useEffect hook for side effects',
    difficulty: 'beginner',
    createdAt: Date.now() - 86400000 * 9,
    copiedCount: 0,
  },
  {
    id: 'snippet-3',
    title: 'Map Over Array in JSX',
    code: `{items.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
))}`,
    language: 'jsx',
    tags: ['react', 'array', 'rendering', 'beginner'],
    description: 'Render list of items in React',
    difficulty: 'beginner',
    createdAt: Date.now() - 86400000 * 8,
    copiedCount: 0,
  },
  {
    id: 'snippet-4',
    title: 'Conditional Rendering',
    code: `{/* Method 1: Ternary */}
{isLoading ? <Spinner /> : <Content />}

{/* Method 2: && operator */}
{error && <ErrorMessage error={error} />}

{/* Method 3: If-else */}
{isLoggedIn ? (
  <Dashboard />
) : (
  <Login />
)}`,
    language: 'jsx',
    tags: ['react', 'conditional', 'beginner'],
    description: 'Different ways to conditionally render in React',
    difficulty: 'beginner',
    createdAt: Date.now() - 86400000 * 7,
    copiedCount: 0,
  },
  {
    id: 'snippet-5',
    title: 'Basic Event Handler',
    code: `function handleClick(event) {
  event.preventDefault();
  console.log('Button clicked!');
}

<button onClick={handleClick}>
  Click Me
</button>`,
    language: 'javascript',
    tags: ['react', 'events', 'beginner'],
    description: 'Handle click events in React',
    difficulty: 'beginner',
    createdAt: Date.now() - 86400000 * 6,
    copiedCount: 0,
  },

  // INTERMEDIATE (5 snippets)
  {
    id: 'snippet-6',
    title: 'Fetch with Error Handling',
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw to handle upstream
  }
}`,
    language: 'javascript',
    tags: ['api', 'fetch', 'error-handling', 'intermediate'],
    description: 'Fetch data with proper error handling',
    difficulty: 'intermediate',
    createdAt: Date.now() - 86400000 * 5,
    copiedCount: 0,
  },
  {
    id: 'snippet-7',
    title: 'useEffect with Cleanup',
    code: `useEffect(() => {
  // Subscribe to something
  const subscription = someAPI.subscribe(data => {
    setData(data);
  });

  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, [dependency]); // Re-run when dependency changes`,
    language: 'javascript',
    tags: ['react', 'hooks', 'cleanup', 'intermediate'],
    description: 'useEffect with proper cleanup for subscriptions',
    difficulty: 'intermediate',
    createdAt: Date.now() - 86400000 * 4,
    copiedCount: 0,
  },
  {
    id: 'snippet-8',
    title: 'Custom Hook Template',
    code: `function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom logic here

  return { value, loading, error, setValue };
}

// Usage:
const { value, loading, error } = useCustomHook('default');`,
    language: 'javascript',
    tags: ['react', 'hooks', 'custom', 'intermediate'],
    description: 'Template for creating custom React hooks',
    difficulty: 'intermediate',
    createdAt: Date.now() - 86400000 * 3,
    copiedCount: 0,
  },
  {
    id: 'snippet-9',
    title: 'Debounced Input',
    code: `const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearch) {
    // Perform search
    fetchResults(debouncedSearch);
  }
}, [debouncedSearch]);

<input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search..."
/>`,
    language: 'javascript',
    tags: ['react', 'performance', 'debounce', 'intermediate'],
    description: 'Debounce user input for better performance',
    difficulty: 'intermediate',
    createdAt: Date.now() - 86400000 * 2,
    copiedCount: 0,
  },
  {
    id: 'snippet-10',
    title: 'Try-Catch Wrapper',
    code: `async function safeAsyncCall(asyncFunction, fallbackValue = null) {
  try {
    const result = await asyncFunction();
    return result;
  } catch (error) {
    console.error('Error occurred:', error);
    return fallbackValue;
  }
}

// Usage:
const data = await safeAsyncCall(() => fetchData(url), []);`,
    language: 'javascript',
    tags: ['error-handling', 'async', 'intermediate'],
    description: 'Reusable async error handler',
    difficulty: 'intermediate',
    createdAt: Date.now() - 86400000 * 1,
    copiedCount: 0,
  },

  // ADVANCED (5 snippets)
  {
    id: 'snippet-11',
    title: 'React Context Provider Pattern',
    code: `// Create context
const MyContext = createContext();

// Provider component
export function MyProvider({ children }) {
  const [state, setState] = useState(initialState);

  const value = {
    state,
    updateState: (newState) => setState(newState),
    // Add more methods
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook for using context
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}`,
    language: 'javascript',
    tags: ['react', 'context', 'state-management', 'advanced'],
    description: 'Complete context provider pattern',
    difficulty: 'advanced',
    createdAt: Date.now() - 3600000 * 12,
    copiedCount: 0,
  },
  {
    id: 'snippet-12',
    title: 'React Error Boundary',
    code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage:
<ErrorBoundary>
  <App />
</ErrorBoundary>`,
    language: 'javascript',
    tags: ['react', 'error-handling', 'advanced'],
    description: 'Error boundary component for React',
    difficulty: 'advanced',
    createdAt: Date.now() - 3600000 * 6,
    copiedCount: 0,
  },
  {
    id: 'snippet-13',
    title: 'Advanced useReducer Pattern',
    code: `const initialState = { data: null, loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(\`Unhandled action: \${action.type}\`);
  }
}

function useDataFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetch(url).then(r => r.json());
        if (!cancelled) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: 'FETCH_ERROR', payload: error });
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return state;
}`,
    language: 'javascript',
    tags: ['react', 'hooks', 'state-management', 'advanced'],
    description: 'useReducer for complex state management',
    difficulty: 'advanced',
    createdAt: Date.now() - 3600000 * 3,
    copiedCount: 0,
  },
  {
    id: 'snippet-14',
    title: 'Memoized Expensive Calculation',
    code: `const expensiveValue = useMemo(() => {
  // Expensive calculation
  return items
    .filter(item => item.active)
    .map(item => complexTransform(item))
    .reduce((acc, item) => acc + item.value, 0);
}, [items]); // Only recalculate when items change

// Memoized callback
const handleClick = useCallback((id) => {
  // Handler logic
  updateItem(id, newValue);
}, [newValue]); // Only recreate when newValue changes`,
    language: 'javascript',
    tags: ['react', 'performance', 'memoization', 'advanced'],
    description: 'useMemo and useCallback for optimization',
    difficulty: 'advanced',
    createdAt: Date.now() - 3600000 * 2,
    copiedCount: 0,
  },
  {
    id: 'snippet-15',
    title: 'Intersection Observer Hook',
    code: `function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}

// Usage for lazy loading:
const ref = useRef();
const isVisible = useIntersectionObserver(ref);

<div ref={ref}>
  {isVisible && <HeavyComponent />}
</div>`,
    language: 'javascript',
    tags: ['react', 'hooks', 'performance', 'advanced'],
    description: 'Custom hook for lazy loading with Intersection Observer',
    difficulty: 'advanced',
    createdAt: Date.now() - 3600000 * 1,
    copiedCount: 0,
  },
];
