import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-0-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-0-overview.component.html',
  styleUrl: './module-0-overview.component.css'
})
export class Module0OverviewComponent {
  topics = [
    {
      title: 'Signals',
      icon: '📡',
      content: {
        what: 'Signals are reactive primitives introduced in Angular 16. They are values that can change over time and automatically notify consumers when they change.',
        why: 'Angular needed a simpler and more performant way to handle reactivity. RxJS is powerful but can be complex for simple cases. Signals offer a more direct and predictable API.',
        advantages: [
          'Simpler and more readable syntax than Observables',
          'Better integration with Angular\'s change detection system',
          'Automatically optimized performance',
          'Less boilerplate than RxJS for simple cases',
          'Type-safe by default',
          'Work perfectly with computed and effect'
        ],
        vsRxjs: 'RxJS is still better for complex async operations, stream transformations, and advanced operators. Signals are ideal for synchronous state and simple reactivity. The combination of both is the modern approach.'
      }
    },
    {
      title: 'Standalone Components',
      icon: '🧩',
      content: {
        what: 'Components that don\'t require NgModules. They can directly import their dependencies and be used without declaring them in a module.',
        why: 'NgModules added unnecessary complexity. Standalone components simplify the architecture and make code more modular and easier to maintain.',
        advantages: [
          'Less boilerplate - you don\'t need to create NgModules',
          'Better tree-shaking - you only import what you use',
          'Easier to migrate existing code',
          'Simpler lazy loading',
          'Better for micro-frontends',
          'Cleaner and more maintainable code'
        ],
        migration: 'You can migrate gradually: mark components as standalone, import dependencies directly, and eventually remove NgModules. Angular CLI has tools to help with migration.'
      }
    },
    {
      title: 'New Control Flow',
      icon: '🔄',
      content: {
        what: 'New syntax for @if, @for, @switch that replaces traditional structural directives (*ngIf, *ngFor, *ngSwitch).',
        why: 'Structural directives had performance and syntax limitations. The new control flow is more efficient and easier to read.',
        advantages: [
          'Better performance - compiled more efficiently',
          'Cleaner and more modern syntax',
          'Better support for else and else-if',
          'Built-in trackBy in @for for better performance',
          'Automatic type narrowing in TypeScript',
          'Less code in the template'
        ],
        comparison: '@if is more efficient than *ngIf because it compiles better. @for has built-in trackBy and better optimization. @switch is more readable than *ngSwitchCase.'
      }
    },
    {
      title: 'Performance in Angular',
      icon: '⚡',
      content: {
        what: 'Angular has multiple strategies to optimize performance: Change Detection, OnPush, signals, lazy loading, and more.',
        why: 'Large applications need optimization to maintain fast response times and good user experience.',
        strategies: [
          'OnPush Change Detection: Only checks for changes when inputs change or events occur',
          'Signals: Automatically optimize change detection',
          'Lazy Loading: Load code only when needed',
          'TrackBy functions: Optimize large lists',
          'Virtual Scrolling: Render only visible items',
          'Code Splitting: Divide the bundle into smaller chunks'
        ],
        modern: 'With signals and OnPush, Angular can automatically optimize which components need checking, resulting in better performance without additional effort.'
      }
    },
    {
      title: 'Architecture',
      icon: '🏗️',
      content: {
        what: 'Patterns and structures to organize Angular code in a scalable and maintainable way.',
        why: 'Good architecture facilitates maintenance, testing, and application scalability.',
        patterns: [
          'State Management: Signals + Services for global state',
          'Feature-based structure: Organize by features, not by file type',
          'Composable architecture: Small and reusable components',
          'Smart vs Dumb components: Separate presentation logic',
          'Custom directives and pipes: Extend functionality in a reusable way'
        ],
        modern: 'With standalone components, architecture becomes more flexible. You can easily create component libraries and compose features modularly.'
      }
    },
    {
      title: 'Forms',
      icon: '📝',
      content: {
        what: 'Angular offers two approaches: Template-driven (declarative) and Reactive (imperative).',
        why: 'Different situations require different approaches. Reactive forms offer more control and are better for complex forms.',
        advantages: [
          'Reactive Forms: More control, better for complex validation, easier to test',
          'Template-driven: Simpler for basic forms, less TypeScript code',
          'Custom Validators: Reusable and testable validation',
          'Async Validators: Validation against server',
          'Form Arrays: Dynamic forms with variable fields'
        ],
        signals: 'With modern Angular, you can combine reactive forms with signals for simpler and more performant reactive state.'
      }
    },
    {
      title: 'Routing',
      icon: '🗺️',
      content: {
        what: 'Angular Router navigation and lazy loading system.',
        why: 'Large applications need efficient routing to load only what\'s necessary and protect routes.',
        features: [
          'Guards: Protect routes (CanActivate, CanDeactivate, etc.)',
          'Resolvers: Pre-load data before activating the route',
          'Lazy Loading: Load modules/components only when needed',
          'Preloading: Strategies to pre-load routes in the background',
          'Route Data: Pass data to components via routing'
        ],
        modern: 'With standalone components, lazy loading is simpler. You can lazy load components directly without needing NgModules. Signals can be used for route params and data.'
      }
    },
    {
      title: 'Testing',
      icon: '🧪',
      content: {
        what: 'Strategies and tools to test Angular applications effectively.',
        why: 'Testing ensures quality, reduces bugs, and facilitates safe refactoring.',
        strategies: [
          'Unit Testing: Test components and services in isolation',
          'Component Testing: Test components with their template',
          'Integration Testing: Test interaction between components',
          'E2E Testing: Test complete user flows',
          'Testing with Signals: Verify reactivity and state changes'
        ],
        tools: 'Angular Testing Library, Jest, Vitest, Cypress, Playwright. The modern approach favors simpler testing focused on user behavior.'
      }
    },
    {
      title: 'Advanced Features',
      icon: '🚀',
      content: {
        what: 'Advanced Angular capabilities: SSR, PWA, Micro-frontends, Custom Elements.',
        why: 'Modern applications need these features for better SEO, offline performance, and distributed architectures.',
        features: [
          'SSR (Server-Side Rendering): Better SEO and faster initial load',
          'PWA (Progressive Web Apps): Offline functionality and app-like experience',
          'Micro-frontends: Divide application into independent parts',
          'Angular Elements: Use Angular components in other applications',
          'Hydration: Improves SSR performance'
        ],
        modern: 'Angular 17+ has better SSR support with improved performance. Signals work perfectly with SSR and improve the experience.'
      }
    },
    {
      title: 'Angular 21',
      icon: '✨',
      content: {
        what: 'The latest version of Angular with improvements and new features.',
        why: 'Angular continues to evolve to be simpler, more performant, and modern.',
        highlights: [
          'Improvements in signals and reactivity',
          'Better integration with the new build system',
          'Performance optimizations',
          'Better developer experience',
          'Improved support for standalone components',
          'New APIs and compiler improvements'
        ],
        future: 'Angular is moving towards a simpler and more performant experience. Signals are the future of reactivity in Angular, and standalone components are the standard.'
      }
    }
  ];

  selectedTopic: any = null;

  selectTopic(topic: any) {
    this.selectedTopic = this.selectedTopic === topic ? null : topic;
  }
}
