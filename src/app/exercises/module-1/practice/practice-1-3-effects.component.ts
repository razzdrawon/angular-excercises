import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
}

@Component({
  selector: 'app-practice-1-3-effects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-1-3-effects.component.html',
  styleUrl: './practice-1-3-effects.component.css'
})
export class Practice13EffectsComponent {
  // User preferences
  darkMode = signal(false);
  fontSize = signal(16);
  language = signal('en');
  
  // Application state
  notifications = signal<Notification[]>([]);
  errorCount = signal(0);
  warningCount = signal(0);
  
  // TODO: Create a computed signal that returns the total notification count
  
  // TODO: Create an effect that logs to console whenever darkMode changes
  // Log: "Dark mode is now: [true/false]"
  
  // TODO: Create an effect that adds a notification whenever errorCount changes
  // The notification should say "Error count changed to: [count]"
  // Only add notification if the count actually increased (not decreased)
  // Use this.addNotification(message, 'error') to add notifications
  
  // TODO: Create an effect that saves user preferences to localStorage
  // Save: darkMode, fontSize, and language
  // Use JSON.stringify to save as an object
  
  // TODO: Create an effect that loads user preferences from localStorage on init
  // Load the saved preferences and set the signals
  // Hint: Check if localStorage has the key 'userPreferences', then parse and set values
  // You can use a flag (like a signal) to track if it's been loaded, or check if signals are at default values
  
  // Methods
  toggleDarkMode() {
    this.darkMode.update(mode => !mode);
  }
  
  updateFontSize(size: number) {
    this.fontSize.set(size);
  }
  
  updateLanguage(lang: string) {
    this.language.set(lang);
  }
  
  incrementError() {
    this.errorCount.update(count => count + 1);
  }
  
  incrementWarning() {
    this.warningCount.update(count => count + 1);
  }
  
  clearNotifications() {
    this.notifications.set([]);
  }
  
  removeNotification(id: number) {
    this.notifications.update(notifications => 
      notifications.filter(n => n.id !== id)
    );
  }
  
  // Helper method to add notification (you can use this in your effects)
  addNotification(message: string, type: Notification['type'] = 'info') {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    this.notifications.update(notifications => [...notifications, notification]);
  }
}

