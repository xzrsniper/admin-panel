import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Іван Адмінко', email: 'admin@example.com', role: 'Admin', createdAt: new Date('2024-10-26') },
    { id: 2, name: 'Марія Редакторка', email: 'editor@example.com', role: 'Editor', createdAt: new Date('2024-11-15') },
    { id: 3, name: 'Петро Глядач', email: 'viewer@example.com', role: 'Viewer', createdAt: new Date() }
  ];
  private nextId = 4;

  constructor() { }

  getUsers(): User[] {
    return [...this.users];
  }

  addUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...userData,
      id: this.nextId++,
      createdAt: new Date()
    };
    this.users.push(newUser);
    console.log('User added:', newUser);
    console.log('Current users:', this.users);
    return newUser;
  }

  updateUser(updatedUser: User): User | null {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = {
          ...updatedUser,
          createdAt: this.users[index].createdAt
        };
      console.log('User updated:', this.users[index]);
      console.log('Current users:', this.users);
      return this.users[index];
    }
    console.log('User not found for update:', updatedUser.id);
    return null;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1);
      console.log('User deleted:', deletedUser[0]);
      console.log('Current users:', this.users);
      return true;
    }
    console.log('User not found for delete:', id);
    return false;
  }
}