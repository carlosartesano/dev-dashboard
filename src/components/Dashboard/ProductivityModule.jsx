import PomodoroTimer from './PomodoroTimer';
import AIChatQuick from './AIChatQuick';

const ProductivityModule = () => {
  return (
    <div className="card h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pb-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h2 className="text-xl font-bold text-black dark:text-white">🎯 Productivity & AI</h2>
      </div>

      {/* Split content - 60/40 ratio */}
      <div className="flex-1 flex divide-x overflow-hidden" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        {/* Left: Pomodoro Timer - 60% width */}
        <div className="flex-[0.6] p-6 flex flex-col items-center justify-center overflow-y-auto">
          <PomodoroTimer />
        </div>

        {/* Right: AI Chat - 40% width */}
        <div className="flex-[0.4] p-5 flex flex-col justify-center overflow-y-auto">
          <AIChatQuick />
        </div>
      </div>
    </div>
  );
};

export default ProductivityModule;
