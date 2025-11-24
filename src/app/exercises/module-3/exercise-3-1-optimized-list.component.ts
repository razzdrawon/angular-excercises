import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ListItem {
  id: number;
  name: string;
  category: string;
  value: number;
}

/**
 * Exercise 3-1: 10k+ Item Optimized List
 * 
 * Objetivo: Demostrar técnicas de optimización para listas grandes:
 * - OnPush change detection
 * - trackBy functions
 * - Virtual scrolling concepts
 * - Lazy rendering
 */

@Component({
  selector: 'app-exercise-3-1-optimized-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exercise-3-1-optimized-list.component.html',
  styleUrl: './exercise-3-1-optimized-list.component.css'
})
export class Exercise31OptimizedListComponent {
  // Generar 10,000 items
  private generateItems(count: number): ListItem[] {
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      category: categories[i % categories.length],
      value: Math.floor(Math.random() * 1000)
    }));
  }

  allItems = signal<ListItem[]>(this.generateItems(10000));
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');
  itemsPerPage = signal<number>(50);
  currentPage = signal<number>(1);

  // Computed: items filtrados
  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const items = this.allItems();

    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(term) || 
                           item.category.toLowerCase().includes(term);
      const matchesCategory = category === 'all' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  });

  // Computed: items paginados
  paginatedItems = computed(() => {
    const items = this.filteredItems();
    const perPage = this.itemsPerPage();
    const page = this.currentPage();
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  });

  // Computed: información de paginación
  paginationInfo = computed(() => {
    const total = this.filteredItems().length;
    const perPage = this.itemsPerPage();
    const page = this.currentPage();
    const totalPages = Math.ceil(total / perPage);
    return { total, page, totalPages, start: (page - 1) * perPage + 1, end: Math.min(page * perPage, total) };
  });

  // Computed: categorías únicas
  categories = computed(() => {
    const categories = new Set(this.allItems().map(item => item.category));
    return ['all', ...Array.from(categories)];
  });

  // trackBy function para optimizar *ngFor
  trackByItemId(index: number, item: ListItem): number {
    return item.id;
  }

  // Métodos
  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1); // Reset a página 1
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  changePage(page: number) {
    this.currentPage.set(page);
  }

  changeItemsPerPage(perPage: number) {
    this.itemsPerPage.set(perPage);
    this.currentPage.set(1);
  }

  addItem() {
    const newId = this.allItems().length + 1;
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
    const newItem: ListItem = {
      id: newId,
      name: `New Item ${newId}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.floor(Math.random() * 1000)
    };
    this.allItems.update(items => [newItem, ...items]);
  }
}

