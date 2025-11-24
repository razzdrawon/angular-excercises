import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { Exercise41PermissionsRolesComponent } from '../exercise-4-1-permissions-roles.component';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private parent = inject(Exercise41PermissionsRolesComponent, { optional: true });
  
  @Input() appPermission!: string;
  @Input() appPermissionAnd?: string;

  constructor() {
    if (this.parent) {
      effect(() => {
        const permissions = this.parent!.currentPermissions();
        this.updateView(permissions);
      });
    }
  }

  private updateView(permissions: string[]) {
    if (!this.appPermission || !this.parent) {
      this.viewContainer.clear();
      return;
    }

    const hasPermission = permissions.includes(this.appPermission);
    const hasAndPermission = !this.appPermissionAnd || permissions.includes(this.appPermissionAnd);

    if (hasPermission && hasAndPermission) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}

