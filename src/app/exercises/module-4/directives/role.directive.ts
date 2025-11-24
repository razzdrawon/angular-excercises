import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { Exercise41PermissionsRolesComponent } from '../exercise-4-1-permissions-roles.component';

type Role = 'admin' | 'editor' | 'viewer';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private parent = inject(Exercise41PermissionsRolesComponent, { optional: true });
  
  @Input() appRole!: Role;

  constructor() {
    if (this.parent) {
      effect(() => {
        const currentRole = this.parent!.currentRole();
        this.updateView(currentRole);
      });
    }
  }

  private updateView(currentRole: Role) {
    if (!this.appRole || !this.parent) {
      this.viewContainer.clear();
      return;
    }

    // Lógica de roles: admin puede ver todo, editor puede ver editor y viewer, viewer solo viewer
    const roleHierarchy: Record<Role, Role[]> = {
      admin: ['admin', 'editor', 'viewer'],
      editor: ['editor', 'viewer'],
      viewer: ['viewer']
    };

    const allowedRoles = roleHierarchy[this.appRole] || [];
    const hasAccess = allowedRoles.includes(currentRole);

    if (hasAccess) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}

