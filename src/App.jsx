import { RotateCcw } from 'lucide-react';
import ThemeToggle from './components/Common/ThemeToggle';
import DailyTasks from './components/Dashboard/DailyTasks';
import PromptLibrary from './components/PromptLibrary/PromptLibrary';
import CodeSnippets from './components/CodeSnippets/CodeSnippets';
import QuickNotes from './components/Dashboard/QuickNotes';
import LearningLog from './components/LearningLog/LearningLog';
import PomodoroModule from './components/Dashboard/PomodoroModule';
import AIAssistant from './components/Dashboard/AIAssistant';
import DraggableModule from './components/Common/DraggableModule';
import { useDragAndDrop } from './hooks/useDragAndDrop';

// Define default module order
const DEFAULT_MODULE_ORDER = [
  'tasks',
  'notes',
  'pomodoro',
  'prompts',
  'snippets',
  'ai-assistant',
  'log',
];

function App() {
  const {
    moduleOrder,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    resetOrder,
  } = useDragAndDrop(DEFAULT_MODULE_ORDER);

  // Module rendering function
  const renderModule = (moduleId) => {
    switch (moduleId) {
      case 'tasks':
        return <DailyTasks />;
      case 'notes':
        return <QuickNotes />;
      case 'pomodoro':
        return <PomodoroModule />;
      case 'prompts':
        return <PromptLibrary />;
      case 'snippets':
        return <CodeSnippets />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'log':
        return <LearningLog />;
      default:
        return null;
    }
  };

  // Separate modules into sections
  const topRowModules = moduleOrder.filter((id) =>
    ['tasks', 'notes', 'pomodoro'].includes(id)
  );
  const promptsModule = moduleOrder.filter((id) =>
    ['prompts'].includes(id)
  );
  const snippetsModule = moduleOrder.filter((id) =>
    ['snippets'].includes(id)
  );
  const aiAssistantModule = moduleOrder.filter((id) =>
    ['ai-assistant'].includes(id)
  );
  const bottomRowModules = moduleOrder.filter((id) =>
    ['log'].includes(id)
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="border-b border-gray-200 dark:border-border-subtle"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                Dev Dashboard
              </h1>
              <p className="text-xs sm:text-sm mt-1 text-gray-600 dark:text-text-tertiary">
                Your personal development command center
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Reset Layout Button */}
              <button
                onClick={resetOrder}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-text-tertiary dark:hover:text-text-secondary transition-colors flex items-center gap-1.5"
                title="Reset to default layout"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset Layout</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Top Row - 3 cards (Tasks, Notes, Pomodoro) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRowModules.map((moduleId) => {
            const globalIndex = moduleOrder.indexOf(moduleId);
            return (
              <DraggableModule
                key={moduleId}
                id={moduleId}
                index={globalIndex}
                isDragging={draggedItem === globalIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {renderModule(moduleId)}
              </DraggableModule>
            );
          })}
        </div>

        {/* Prompt Library - Full width row */}
        {promptsModule.map((moduleId) => {
          const globalIndex = moduleOrder.indexOf(moduleId);
          return (
            <div key={moduleId} className="w-full" data-module={moduleId}>
              <DraggableModule
                id={moduleId}
                index={globalIndex}
                isDragging={draggedItem === globalIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {renderModule(moduleId)}
              </DraggableModule>
            </div>
          );
        })}

        {/* Code Snippets - Full width row */}
        {snippetsModule.map((moduleId) => {
          const globalIndex = moduleOrder.indexOf(moduleId);
          return (
            <div key={moduleId} className="w-full" data-module={moduleId}>
              <DraggableModule
                id={moduleId}
                index={globalIndex}
                isDragging={draggedItem === globalIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {renderModule(moduleId)}
              </DraggableModule>
            </div>
          );
        })}

        {/* AI Assistant - Full width */}
        {aiAssistantModule.map((moduleId) => {
          const globalIndex = moduleOrder.indexOf(moduleId);
          return (
            <div key={moduleId} className="w-full" data-module={moduleId}>
              <DraggableModule
                id={moduleId}
                index={globalIndex}
                isDragging={draggedItem === globalIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {renderModule(moduleId)}
              </DraggableModule>
            </div>
          );
        })}

        {/* Learning Log - Full width */}
        {bottomRowModules.map((moduleId) => {
          const globalIndex = moduleOrder.indexOf(moduleId);
          return (
            <div key={moduleId} className="w-full">
              <DraggableModule
                id={moduleId}
                index={globalIndex}
                isDragging={draggedItem === globalIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {renderModule(moduleId)}
              </DraggableModule>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
