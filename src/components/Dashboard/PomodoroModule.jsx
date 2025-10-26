import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes
const SESSIONS_UNTIL_LONG_BREAK = 4;

const PomodoroModule = () => {
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
        ? '15 min break'
        : '5 min break';
    }
    return '25 min work';
  };

  return (
    <div className="card h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-border-subtle">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-text-primary">⏱️ Focus Timer</h2>
      </div>

      {/* Content - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* Timer display - LARGE */}
        <div
          className="text-7xl font-bold tabular-nums mb-6 tracking-tight"
          style={{
            fontFamily: 'ui-monospace, monospace',
            color: isActive ? 'var(--color-primary)' : undefined
          }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={toggleTimer}
            className="btn-primary px-8 py-3 flex items-center gap-2 min-w-[120px] justify-center"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Session counter */}
        <div className="text-sm mb-4 text-gray-600 dark:text-text-tertiary">
          Session <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{timerState.sessionsCompleted}</span> / {SESSIONS_UNTIL_LONG_BREAK} today
        </div>

        {/* Current task */}
        {timerState.mode === 'work' && (
          <div
            className="w-full max-w-[280px] border border-gray-200 dark:border-white/10 rounded-lg p-3 text-center bg-gray-50 dark:bg-white/5"
          >
            <div className="text-xs mb-1 text-gray-500 dark:text-text-tertiary">
              🎯 Working on:
            </div>
            <div className="text-sm font-medium truncate text-gray-900 dark:text-text-secondary">
              {getCurrentTask()}
            </div>
          </div>
        )}

        {/* Mode indicator */}
        <div className="mt-4 text-xs text-gray-500 dark:text-text-tertiary">
          {getModeLabel()} · Next: {getNextModeLabel()}
        </div>
      </div>
    </div>
  );
};

export default PomodoroModule;
