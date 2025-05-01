import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserFormComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  showForm = false;
  userToEdit: User | null = null;
  searchTerm: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
    this.filterUsers();
    console.log('Users loaded and filtered in component:', this.filteredUsers);
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }
  }

  onSearchChange(): void {
     this.filterUsers();
  }

  onAddNewUser(): void {
    console.log('Add New User button clicked');
    this.userToEdit = null;
    this.showForm = true;
  }

  onEditUser(user: User): void {
    console.log('Edit button clicked for user:', user);
    this.userToEdit = { ...user };
    this.showForm = true;
  }

  onDeleteUser(id: number): void {
    console.log('Delete button clicked for id:', id);
    if (confirm(`Ви впевнені, що хочете видалити користувача з ID ${id}?`)) {
      const deleted = this.userService.deleteUser(id);
      if (deleted) {
        this.loadUsers();
      } else {
        alert(`Не вдалося видалити користувача з ID ${id}.`);
      }
    }
  }

  handleFormSubmit(formData: Omit<User, 'id' | 'createdAt'>): void {
    console.log('Form submit event received in list component:', formData);
    try {
      if (this.userToEdit && this.userToEdit.id) {
        const userToUpdate: User = {
            ...formData,
            id: this.userToEdit.id,
            createdAt: this.userToEdit.createdAt
        };
        this.userService.updateUser(userToUpdate);
      } else {
        this.userService.addUser(formData);
      }
      this.loadUsers();
      this.closeForm();
    } catch (error) {
        console.error("Error processing form submit:", error);
        alert("Сталася помилка при обробці форми.");
    }
  }

  handleFormCancel(): void {
    console.log('Form cancel event received in list component');
    this.closeForm();
  }

  private closeForm(): void {
      this.showForm = false;
      this.userToEdit = null;
  }
}