import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes
const SESSIONS_UNTIL_LONG_BREAK = 4;

const PomodoroTimer = () => {
  const [timerState, setTimerState] = useLocalStorage('dev-dashboard-pomodoro', {
    timeLeft: WORK_DURATION,
    isActive: false,
    isBreak: false,
    sessionsCompleted: 0,
    sessionDate: new Date().toDateString(),
    mode: 'work'
  });

  const [timeLeft, setTimeLeft] = useState(timerState.timeLeft);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Reset sessions at midnight
  useEffect(() => {
    const today = new Date().toDateString();
    if (timerState.sessionDate !== today) {
      setTimerState({
        ...timerState,
        sessionsCompleted: 0,
        sessionDate: today
      });
    }
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          // Save to localStorage periodically
          if (newTime % 5 === 0) {
            setTimerState((current) => ({
              ...current,
              timeLeft: newTime
            }));
          }

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(
        timerState.mode === 'work' ? "Time's up! Take a break 🎉" : 'Break over! Back to work 💪',
        {
          body: timerState.mode === 'work'
            ? 'Great work! Time for a break.'
            : "Let's get back to being productive!",
          icon: '/favicon.ico'
        }
      );
    }

    // Switch modes
    if (timerState.mode === 'work') {
      const newSessionCount = timerState.sessionsCompleted + 1;
      const nextMode = newSessionCount % SESSIONS_UNTIL_LONG_BREAK === 0 ? 'longBreak' : 'shortBreak';
      const nextDuration = nextMode === 'longBreak' ? LONG_BREAK : SHORT_BREAK;

      setTimerState({
        ...timerState,
        sessionsCompleted: newSessionCount,
        mode: nextMode,
        isBreak: true,
        timeLeft: nextDuration
      });
      setTimeLeft(nextDuration);
    } else {
      // Break finished, back to work
      setTimerState({
        ...timerState,
        mode: 'work',
        isBreak: false,
        timeLeft: WORK_DURATION
      });
      setTimeLeft(WORK_DURATION);
    }
  };

  const toggleTimer = () => {
    // Request notification permission on first start
    if (!isActive && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    setIsActive(!isActive);
    setTimerState({
      ...timerState,
      isActive: !isActive
    });
  };

  const resetTimer = () => {
    setIsActive(false);
    const duration = timerState.mode === 'work' ? WORK_DURATION :
                     timerState.mode === 'shortBreak' ? SHORT_BREAK : LONG_BREAK;
    setTimeLeft(duration);
    setTimerState({
      ...timerState,
      isActive: false,
      timeLeft: duration
    });
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current task from Today's Focus
  const getCurrentTask = () => {
    const tasks = JSON.parse(localStorage.getItem('dev-dashboard-tasks') || '[]');
    const activeTask = tasks.find(task => !task.completed);
    return activeTask?.text || 'No active task';
  };

  const getModeLabel = () => {
    switch (timerState.mode) {
      case 'work':
        return 'Work Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Work Time';
    }
  };

  const getNextModeLabel = () => {
    if (timerState.mode === 'work') {
      const nextSession = timerState.sessionsCompleted + 1;
      return nextSession % SESSIONS_UNTIL_LONG_BREAK === 0
        ? '15 min long break'
        : '5 min break';
    }
    return '25 min work';
  };

  return (
    <div className="w-full flex flex-col items-center space-y-5">
      {/* Small subtle header */}
      <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
        ⏱️ Focus Timer
      </div>

      {/* LARGE timer display - main visual focus */}
      <div
        className="text-7xl font-bold tabular-nums mb-1"
        style={{
          fontFamily: 'ui-monospace, monospace',
          letterSpacing: '0.05em',
          color: isActive ? 'var(--color-primary)' : 'var(--color-light-text-primary)'
        }}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Mode badge */}
      <div
        className="px-4 py-1.5 rounded-full text-xs font-medium"
        style={{
          backgroundColor: timerState.mode === 'work'
            ? 'rgba(147, 51, 234, 0.15)'
            : 'rgba(16, 185, 129, 0.15)',
          color: timerState.mode === 'work'
            ? 'var(--color-primary)'
            : '#10b981',
          border: `1px solid ${timerState.mode === 'work' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
        }}
      >
        {getModeLabel()}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={toggleTimer}
          className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-medium"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all hover:bg-white hover:bg-opacity-5"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Session progress */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex gap-1">
          {[...Array(SESSIONS_UNTIL_LONG_BREAK)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i < timerState.sessionsCompleted
                  ? 'var(--color-primary)'
                  : 'rgba(255, 255, 255, 0.15)'
              }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          {timerState.sessionsCompleted}/{SESSIONS_UNTIL_LONG_BREAK} today
        </span>
      </div>

      {/* Current Task - Only show during work mode */}
      {timerState.mode === 'work' && (
        <div
          className="text-center w-full px-4 py-2 rounded-lg mt-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        >
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Current Task
          </div>
          <div className="text-sm truncate" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {getCurrentTask()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
