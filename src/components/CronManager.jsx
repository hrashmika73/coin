import React, { useState, useEffect } from 'react';
import { cronService } from '../services/cronService';

const CronManager = () => {
  const [cronStatus, setCronStatus] = useState(cronService.getStatus());
  const [taskLogs, setTaskLogs] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Update status every 5 seconds if auto-refresh is enabled
    const interval = autoRefresh ? setInterval(() => {
      setCronStatus(cronService.getStatus());
      updateTaskLogs();
    }, 5000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const updateTaskLogs = () => {
    // Simulate task execution logs
    const logs = [
      { time: new Date().toLocaleTimeString(), task: 'priceUpdates', status: 'success', message: 'Crypto prices updated' },
      { time: new Date(Date.now() - 30000).toLocaleTimeString(), task: 'marketAnalysis', status: 'success', message: 'Market data refreshed' },
      { time: new Date(Date.now() - 60000).toLocaleTimeString(), task: 'userNotifications', status: 'success', message: 'Scheduled notifications sent' },
      { time: new Date(Date.now() - 90000).toLocaleTimeString(), task: 'referralBonuses', status: 'success', message: 'Referral bonuses processed' },
      { time: new Date(Date.now() - 120000).toLocaleTimeString(), task: 'dailyInterest', status: 'success', message: 'Daily interest calculated' }
    ];
    setTaskLogs(logs);
  };

  const handleStartStop = () => {
    if (cronStatus.isRunning) {
      cronService.stop();
    } else {
      cronService.start();
    }
    setCronStatus(cronService.getStatus());
  };

  const handleTaskRestart = (taskName) => {
    // Restart individual task (for demo purposes)
    console.log(`Restarting task: ${taskName}`);
    updateTaskLogs();
  };

  const taskDescriptions = {
    priceUpdates: 'Updates cryptocurrency prices every 30 seconds',
    dailyInterest: 'Processes daily interest on active investments',
    referralBonuses: 'Calculates and distributes referral bonuses',
    marketAnalysis: 'Updates market cap, volume, and sentiment data',
    userNotifications: 'Sends automated user notifications',
    investmentUpdates: 'Updates investment returns and performance'
  };

  return (
    <div className="cron-manager">
      <div className="cron-header">
        <h3>🕒 Automated Task Manager</h3>
        <div className="cron-controls">
          <button 
            className={`cron-toggle ${cronStatus.isRunning ? 'stop' : 'start'}`}
            onClick={handleStartStop}
          >
            {cronStatus.isRunning ? '⏹️ Stop All Tasks' : '▶️ Start All Tasks'}
          </button>
          <label className="auto-refresh">
            <input 
              type="checkbox" 
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto Refresh
          </label>
        </div>
      </div>

      <div className="cron-status">
        <div className="status-card">
          <div className="status-indicator">
            <span className={`status-dot ${cronStatus.isRunning ? 'active' : 'inactive'}`}></span>
            <span className="status-text">
              {cronStatus.isRunning ? 'System Active' : 'System Stopped'}
            </span>
          </div>
          <div className="task-count">
            Active Tasks: {cronStatus.taskCount}
          </div>
        </div>
      </div>

      <div className="cron-tasks">
        <h4>📋 Scheduled Tasks</h4>
        <div className="task-grid">
          {cronStatus.activeTasks.map(taskName => (
            <div key={taskName} className="task-card">
              <div className="task-header">
                <span className="task-name">{taskName}</span>
                <button 
                  className="task-restart"
                  onClick={() => handleTaskRestart(taskName)}
                  disabled={!cronStatus.isRunning}
                >
                  🔄
                </button>
              </div>
              <div className="task-description">
                {taskDescriptions[taskName] || 'Automated system task'}
              </div>
              <div className="task-status">
                <span className={`task-indicator ${cronStatus.isRunning ? 'running' : 'stopped'}`}>
                  {cronStatus.isRunning ? '🟢 Running' : '🔴 Stopped'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cron-logs">
        <h4>📄 Task Execution Logs</h4>
        <div className="log-container">
          {taskLogs.length > 0 ? (
            taskLogs.map((log, index) => (
              <div key={index} className={`log-entry ${log.status}`}>
                <span className="log-time">{log.time}</span>
                <span className="log-task">{log.task}</span>
                <span className="log-message">{log.message}</span>
                <span className={`log-status ${log.status}`}>
                  {log.status === 'success' ? '✅' : '❌'}
                </span>
              </div>
            ))
          ) : (
            <div className="no-logs">No task logs available</div>
          )}
        </div>
      </div>

      <div className="cron-config">
        <h4>⚙️ Quick Actions</h4>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => cronService.processDailyInterest()}>
            💰 Process Interest Now
          </button>
          <button className="action-btn secondary" onClick={() => cronService.processReferralBonuses()}>
            🎁 Process Referrals Now
          </button>
          <button className="action-btn tertiary" onClick={() => cronService.updateCryptoPrices()}>
            📈 Update Prices Now
          </button>
          <button className="action-btn quaternary" onClick={() => cronService.updateMarketData()}>
            📊 Refresh Market Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default CronManager;
