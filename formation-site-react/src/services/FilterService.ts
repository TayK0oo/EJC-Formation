// services/FilterService.ts
import { Filter } from '../models/Filter';

export class FilterService {
  private static FILTER_KEY = 'formation_filters';

  static saveFilters(filters: Filter): void {
    localStorage.setItem(this.FILTER_KEY, JSON.stringify(filters));
  }

  static getFilters(): Filter | null {
    const filters = localStorage.getItem(this.FILTER_KEY);
    return filters ? JSON.parse(filters) : null;
  }

  static clearFilters(): void {
    localStorage.removeItem(this.FILTER_KEY);
  }
}