import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './directives/permission.directive';
import { RoleDirective } from './directives/role.directive';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

/**
 * Exercise 4-1: Permissions and Roles System
 * 
 * Objetivo: Crear un sistema de permisos y roles usando:
 * - Custom directives
 * - Composable architecture
 * - Service-based state management
 */

@Component({
  selector: 'app-exercise-4-1-permissions-roles',
  standalone: true,
  imports: [CommonModule, PermissionDirective, RoleDirective],
  templateUrl: './exercise-4-1-permissions-roles.component.html',
  styleUrl: './exercise-4-1-permissions-roles.component.css'
})
export class Exercise41PermissionsRolesComponent {
  // Usuarios de ejemplo
  users = signal<User[]>([
    { id: 1, name: 'Admin User', role: 'admin', permissions: ['read', 'write', 'delete', 'manage'] },
    { id: 2, name: 'Editor User', role: 'editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer User', role: 'viewer', permissions: ['read'] }
  ]);

  // Usuario actual
  currentUser = signal<User>(this.users()[0]);

  // Computed: permisos del usuario actual
  currentPermissions = computed(() => this.currentUser().permissions);
  currentRole = computed(() => this.currentUser().role);

  // Métodos
  switchUser(userId: number) {
    const user = this.users().find(u => u.id === userId);
    if (user) {
      this.currentUser.set(user);
    }
  }

  addPermission(permission: string) {
    const user = this.currentUser();
    if (!user.permissions.includes(permission)) {
      this.currentUser.update(u => ({
        ...u,
        permissions: [...u.permissions, permission]
      }));
      // Actualizar también en la lista de usuarios
      this.users.update(users => 
        users.map(u => u.id === user.id 
          ? { ...u, permissions: [...u.permissions, permission] }
          : u
        )
      );
    }
  }

  removePermission(permission: string) {
    const user = this.currentUser();
    this.currentUser.update(u => ({
      ...u,
      permissions: u.permissions.filter(p => p !== permission)
    }));
    // Actualizar también en la lista de usuarios
    this.users.update(users => 
      users.map(u => u.id === user.id 
        ? { ...u, permissions: u.permissions.filter(p => p !== permission) }
        : u
      )
    );
  }
}

