export class TronLinkEventManager {
  private static instance: TronLinkEventManager;
  private listeners: Set<(address: string) => void> = new Set();
  private isInitialized = false;
  private accountsChangedHandler: ((accounts: string[]) => void) | null = null;
  private networkChangedHandler: ((network: string) => void) | null = null;

  private constructor() {
    // Don't setup listeners immediately
  }

  static getInstance(): TronLinkEventManager {
    if (!TronLinkEventManager.instance) {
      TronLinkEventManager.instance = new TronLinkEventManager();
    }
    return TronLinkEventManager.instance;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      // Wait for TronLink to be available and ready
      const isAvailable = await this.waitForTronLinkReady();
      
      if (isAvailable) {
        this.setupEventListeners();
        this.isInitialized = true;
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn('TronLink initialization failed:', error);
      return false;
    }
  }

  private async waitForTronLinkReady(): Promise<boolean> {
    const maxAttempts = 50;
    const delay = 100;
    
    for (let i = 0; i < maxAttempts; i++) {
      if (this.isTronLinkAvailable() && this.isTronLinkReady()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return false;
  }

  private isTronLinkAvailable(): boolean {
    return typeof window !== 'undefined' && 
           (window as any).tronLink && 
           typeof (window as any).tronLink.on === 'function' &&
           typeof (window as any).tronLink.off === 'function';
  }

  private isTronLinkReady(): boolean {
    return !!(window as any).tronLink?.ready;
  }

  static async waitForTronLinkReady(): Promise<boolean> {
    if (this.isTronLinkInstalled() && (window as any).tronLink.ready) {
      return true;
    }
    
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 30;
      const interval = 100;
      
      const checkReady = () => {
        attempts++;
        if ((window as any).tronLink && (window as any).tronLink.ready) {
          resolve(true);
        } else if (attempts >= maxAttempts) {
          resolve(false);
        } else {
          setTimeout(checkReady, interval);
        }
      };
      
      checkReady();
    });
  }

  private setupEventListeners() {
    if (this.isTronLinkAvailable()) {
      // Store the handler reference so we can remove it later
      this.accountsChangedHandler = (accounts: string[]) => {
        console.log('Accounts changed event received:', accounts);
        if (accounts && accounts.length > 0) {
          this.notifyListeners(accounts[0]);
        } else if (accounts && accounts.length === 0) {
          // Handle case when all accounts are disconnected
          this.notifyListeners('');
        }
      };

      // Network change handler (optional but good to have)
      this.networkChangedHandler = (network: string) => {
        console.log('Network changed event received:', network);
        // You might want to handle network changes too
        this.notifyListeners(''); // Empty address to trigger refresh
      };

      // Remove any existing listeners first
      try {
        if (this.accountsChangedHandler) {
          (window as any).tronLink.off('accountsChanged', this.accountsChangedHandler);
        }
        if (this.networkChangedHandler) {
          (window as any).tronLink.off('networkChanged', this.networkChangedHandler);
        }
      } catch (e) {
        console.log('No existing listeners to remove or error removing them:', e);
      }

      // Add new listeners
      try {
        if (this.accountsChangedHandler) {
          (window as any).tronLink.on('accountsChanged', this.accountsChangedHandler);
        }
        if (this.networkChangedHandler) {
          (window as any).tronLink.on('networkChanged', this.networkChangedHandler);
        }
        console.log('TronLink event listeners setup successfully');
      } catch (error) {
        console.error('Failed to setup TronLink event listeners:', error);
      }

    } else {
      console.warn('TronLink not available for event listening');
    }
  }

  addListener(callback: (address: string) => void) {
    console.log('Adding account change listener');
    this.listeners.add(callback);
    return () => this.removeListener(callback);
  }

  removeListener(callback: (address: string) => void) {
    this.listeners.delete(callback);
  }

  private notifyListeners(address: string) {
    console.log('Notifying listeners of address change:', address);
    this.listeners.forEach(callback => {
      try {
        callback(address);
      } catch (error) {
        console.error('Error in account change listener:', error);
      }
    });
  }

  // Cleanup method to remove event listeners
  cleanup() {
    if (this.isTronLinkAvailable()) {
      try {
        if (this.accountsChangedHandler) {
          (window as any).tronLink.off('accountsChanged', this.accountsChangedHandler);
        }
        if (this.networkChangedHandler) {
          (window as any).tronLink.off('networkChanged', this.networkChangedHandler);
        }
        console.log('Removed TronLink event listeners');
      } catch (error) {
        console.error('Error cleaning up TronLink listeners:', error);
      }
    }
    this.listeners.clear();
    this.isInitialized = false;
    this.accountsChangedHandler = null;
    this.networkChangedHandler = null;
  }

  // Add a method to check if TronLink is available without initializing
  static isTronLinkInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).tronLink;
  }

  // Method to manually get current account from TronLink
  static async getCurrentAccount(): Promise<string | null> {
    if (!this.isTronLinkInstalled()) return null;
    
    try {
      const accounts = await (window as any).tronLink.request({ method: 'tron_accounts' });
      return accounts && accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }
}