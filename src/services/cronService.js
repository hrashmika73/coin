// Automated task scheduler for Kleverscape platform
class CronService {
  constructor() {
    this.tasks = new Map();
    this.isRunning = false;
  }

  // Start the cron service
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🕒 Kleverscape Cron Service Started');
    
    // Schedule all automated tasks
    this.scheduleTask('priceUpdates', this.updateCryptoPrices, 30000); // 30 seconds
    this.scheduleTask('dailyInterest', this.processDailyInterest, 86400000); // 24 hours
    this.scheduleTask('referralBonuses', this.processReferralBonuses, 3600000); // 1 hour
    this.scheduleTask('marketAnalysis', this.updateMarketData, 300000); // 5 minutes
    this.scheduleTask('userNotifications', this.sendScheduledNotifications, 1800000); // 30 minutes
    this.scheduleTask('investmentUpdates', this.updateInvestmentReturns, 21600000); // 6 hours
  }

  // Stop the cron service
  stop() {
    this.tasks.forEach(taskId => clearInterval(taskId));
    this.tasks.clear();
    this.isRunning = false;
    console.log('🛑 Kleverscape Cron Service Stopped');
  }

  // Schedule a recurring task
  scheduleTask(name, taskFunction, interval) {
    if (this.tasks.has(name)) {
      clearInterval(this.tasks.get(name));
    }
    
    const taskId = setInterval(() => {
      try {
        taskFunction.call(this);
        console.log(`✅ Automated task completed: ${name}`);
      } catch (error) {
        console.error(`❌ Error in automated task ${name}:`, error);
      }
    }, interval);
    
    this.tasks.set(name, taskId);
    console.log(`📅 Scheduled task: ${name} (every ${interval/1000}s)`);
  }

  // Update cryptocurrency prices automatically
  updateCryptoPrices() {
    const cryptos = ['BTC', 'ETH', 'USDT', 'BNB'];
    const priceUpdates = {};
    
    cryptos.forEach(crypto => {
      // Simulate realistic price fluctuations
      const basePrice = this.getBasePrice(crypto);
      const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% change
      const newPrice = basePrice * (1 + fluctuation);
      priceUpdates[crypto] = newPrice.toFixed(2);
    });

    // Update local storage with new prices
    localStorage.setItem('cryptoPrices', JSON.stringify(priceUpdates));
    
    // Dispatch custom event for components to update
    window.dispatchEvent(new CustomEvent('priceUpdate', { detail: priceUpdates }));
  }

  // Process daily interest on investments
  processDailyInterest() {
    try {
      const investments = JSON.parse(localStorage.getItem('userInvestments') || '[]');
      const walletData = JSON.parse(localStorage.getItem('walletBalances') || '{}');
      
      investments.forEach(investment => {
        if (investment.status === 'active') {
          const dailyRate = investment.apy / 365 / 100;
          const interestEarned = investment.amount * dailyRate;
          
          // Add interest to wallet
          walletData[investment.currency] = (walletData[investment.currency] || 0) + interestEarned;
          
          // Log transaction
          this.addTransaction({
            type: 'interest',
            amount: interestEarned,
            currency: investment.currency,
            description: `Daily interest from ${investment.plan}`,
            timestamp: new Date().toISOString()
          });
        }
      });
      
      localStorage.setItem('walletBalances', JSON.stringify(walletData));
      console.log('💰 Daily interest processed for all active investments');
    } catch (error) {
      console.error('Error processing daily interest:', error);
    }
  }

  // Process referral bonuses
  processReferralBonuses() {
    try {
      const referralData = JSON.parse(localStorage.getItem('referralStats') || '{}');
      const walletData = JSON.parse(localStorage.getItem('walletBalances') || '{}');
      
      // Process pending referral bonuses
      if (referralData.pendingBonuses && referralData.pendingBonuses.length > 0) {
        let totalBonusPaid = 0;
        
        referralData.pendingBonuses.forEach(bonus => {
          walletData.BTC = (walletData.BTC || 0) + bonus.amount;
          totalBonusPaid += bonus.amount;
          
          this.addTransaction({
            type: 'referral_bonus',
            amount: bonus.amount,
            currency: 'BTC',
            description: `Referral bonus for user ${bonus.referredUser}`,
            timestamp: new Date().toISOString()
          });
        });
        
        // Clear processed bonuses
        referralData.pendingBonuses = [];
        referralData.totalEarned = (referralData.totalEarned || 0) + totalBonusPaid;
        
        localStorage.setItem('referralStats', JSON.stringify(referralData));
        localStorage.setItem('walletBalances', JSON.stringify(walletData));
        
        console.log(`💎 Processed referral bonuses: $${totalBonusPaid.toFixed(4)} BTC`);
      }
    } catch (error) {
      console.error('Error processing referral bonuses:', error);
    }
  }

  // Update market analysis data
  updateMarketData() {
    const marketData = {
      marketCap: (2.1 + Math.random() * 0.2).toFixed(2) + 'T',
      volume24h: (95 + Math.random() * 10).toFixed(1) + 'B',
      dominance: {
        btc: (42 + Math.random() * 4).toFixed(1),
        eth: (18 + Math.random() * 2).toFixed(1)
      },
      fearGreedIndex: Math.floor(30 + Math.random() * 40),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('marketData', JSON.stringify(marketData));
    window.dispatchEvent(new CustomEvent('marketUpdate', { detail: marketData }));
  }

  // Send scheduled notifications
  sendScheduledNotifications() {
    const notifications = [
      {
        type: 'market_alert',
        title: 'Market Update',
        message: 'Bitcoin showing strong support at current levels',
        icon: '📈'
      },
      {
        type: 'investment_reminder',
        title: 'Investment Opportunity',
        message: 'New high-yield investment plans available',
        icon: '💎'
      },
      {
        type: 'security_tip',
        title: 'Security Reminder',
        message: 'Enable 2FA for enhanced account security',
        icon: '🔒'
      }
    ];
    
    // Randomly select and dispatch a notification
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    window.dispatchEvent(new CustomEvent('automaticNotification', { detail: randomNotification }));
  }

  // Update investment returns
  updateInvestmentReturns() {
    try {
      const investments = JSON.parse(localStorage.getItem('userInvestments') || '[]');
      
      investments.forEach(investment => {
        if (investment.status === 'active') {
          const timeElapsed = new Date() - new Date(investment.startDate);
          const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
          const expectedReturn = investment.amount * (investment.apy / 100) * (daysElapsed / 365);
          
          investment.currentReturn = expectedReturn;
          investment.daysActive = Math.floor(daysElapsed);
        }
      });
      
      localStorage.setItem('userInvestments', JSON.stringify(investments));
      console.log('📊 Investment returns updated');
    } catch (error) {
      console.error('Error updating investment returns:', error);
    }
  }

  // Helper: Get base price for cryptocurrency
  getBasePrice(crypto) {
    const basePrices = {
      BTC: 65000,
      ETH: 3200,
      USDT: 1.00,
      BNB: 580
    };
    return basePrices[crypto] || 1;
  }

  // Helper: Add transaction to history
  addTransaction(transaction) {
    try {
      const transactions = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
      transactions.unshift({
        id: Date.now().toString(),
        ...transaction,
        status: 'completed'
      });
      
      // Keep only last 1000 transactions
      if (transactions.length > 1000) {
        transactions.splice(1000);
      }
      
      localStorage.setItem('transactionHistory', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }

  // Get status of all scheduled tasks
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeTasks: Array.from(this.tasks.keys()),
      taskCount: this.tasks.size
    };
  }
}

// Export singleton instance
export const cronService = new CronService();

// Auto-start the cron service when the module loads
if (typeof window !== 'undefined') {
  cronService.start();
  
  // Stop cron service when page unloads
  window.addEventListener('beforeunload', () => {
    cronService.stop();
  });
}

export default cronService;
