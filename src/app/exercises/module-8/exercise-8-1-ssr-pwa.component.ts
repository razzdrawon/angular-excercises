import { Component, signal, computed, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/**
 * Exercise 8-1: SSR-Enabled PWA Integration
 * 
 * Objetivo: Demostrar características avanzadas:
 * - SSR considerations
 * - PWA features (service workers, offline)
 * - Platform detection
 * - Hydration awareness
 */

@Component({
  selector: 'app-exercise-8-1-ssr-pwa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-8-1-ssr-pwa.component.html',
  styleUrl: './exercise-8-1-ssr-pwa.component.css'
})
export class Exercise81SsrPwaComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  isOnline = signal<boolean>(true);
  isBrowser = signal<boolean>(false);
  installPrompt = signal<any>(null);
  serviceWorkerRegistered = signal<boolean>(false);

  // Computed: estado de la aplicación
  appStatus = computed(() => {
    const online = this.isOnline();
    const browser = this.isBrowser();
    const sw = this.serviceWorkerRegistered();
    
    return {
      platform: browser ? 'Browser' : 'Server',
      online,
      offline: !online,
      pwaReady: browser && sw,
      canInstall: browser && this.installPrompt() !== null
    };
  });

  private onlineHandler?: () => void;
  private offlineHandler?: () => void;

  ngOnInit() {
    // Detectar si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser.set(true);
      this.checkOnlineStatus();
      this.setupServiceWorker();
      this.setupInstallPrompt();
      this.setupOnlineListeners();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('online', this.onlineHandler!);
      window.removeEventListener('offline', this.offlineHandler!);
    }
  }

  private checkOnlineStatus() {
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline.set(navigator.onLine);
    }
  }

  private setupServiceWorker() {
    if (isPlatformBrowser(this.platformId) && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
          this.serviceWorkerRegistered.set(true);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  private setupInstallPrompt() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        e.preventDefault();
        this.installPrompt.set(e);
      });
    }
  }

  private setupOnlineListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.onlineHandler = () => {
        this.isOnline.set(true);
        console.log('App is online');
      };
      
      this.offlineHandler = () => {
        this.isOnline.set(false);
        console.log('App is offline');
      };

      window.addEventListener('online', this.onlineHandler);
      window.addEventListener('offline', this.offlineHandler);
    }
  }

  async installPWA() {
    const prompt = this.installPrompt();
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      console.log('Install prompt outcome:', outcome);
      this.installPrompt.set(null);
    }
  }

  clearCache() {
    if (isPlatformBrowser(this.platformId) && 'caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
        console.log('Cache cleared');
      });
    }
  }
}

