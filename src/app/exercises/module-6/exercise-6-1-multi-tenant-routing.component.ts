import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Exercise 6-1: Multi-Tenant Routing App
 * 
 * Objetivo: Demostrar routing avanzado con:
 * - Guards y resolvers
 * - Route data y params con signals
 * - Preloading strategies
 * - Multi-tenant routing
 */

interface Tenant {
  id: string;
  name: string;
  theme: string;
}

@Component({
  selector: 'app-exercise-6-1-multi-tenant-routing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exercise-6-1-multi-tenant-routing.component.html',
  styleUrl: './exercise-6-1-multi-tenant-routing.component.css'
})
export class Exercise61MultiTenantRoutingComponent {
  tenants = signal<Tenant[]>([
    { id: 'acme', name: 'ACME Corp', theme: 'blue' },
    { id: 'globex', name: 'Globex Inc', theme: 'green' },
    { id: 'initech', name: 'Initech LLC', theme: 'purple' }
  ]);

  currentTenant = signal<Tenant>(this.tenants()[0]);
  currentRoute = signal<string>('');
  routeParams = signal<Record<string, any>>({});
  routeData = signal<Record<string, any>>({});

  // Computed: URL base del tenant
  tenantBaseUrl = computed(() => `/tenant/${this.currentTenant().id}`);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Observar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateRouteInfo();
      });

    // Inicializar información de ruta
    this.updateRouteInfo();
  }

  private updateRouteInfo() {
    let activeRoute = this.route;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    this.currentRoute.set(this.router.url);
    this.routeParams.set(activeRoute.snapshot.params);
    this.routeData.set(activeRoute.snapshot.data);
  }

  switchTenant(tenantId: string) {
    const tenant = this.tenants().find(t => t.id === tenantId);
    if (tenant) {
      this.currentTenant.set(tenant);
      // Navegar a la ruta del tenant
      this.router.navigate([`/tenant/${tenantId}/dashboard`]);
    }
  }

  navigateTo(route: string) {
    const tenantId = this.currentTenant().id;
    this.router.navigate([`/tenant/${tenantId}/${route}`]);
  }
}

