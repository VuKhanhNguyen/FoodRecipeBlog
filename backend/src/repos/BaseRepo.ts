export interface IBaseRepo<T> {
  getAll: (query?: object) => Promise<T[]>;

  getById: (id: string) => Promise<T | null>;

  add: (data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>) => Promise<T>;

  update: (id: string, data: Partial<T>) => Promise<T | null>;

  delete: (id: string) => Promise<boolean>;
}