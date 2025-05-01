import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() userToEdit: User | null = null;
  @Output() formSubmit = new EventEmitter<Omit<User, 'id' | 'createdAt'>>();
  @Output() formCancel = new EventEmitter<void>();

  userForm: FormGroup;
  isEditMode = false;
  roles: User['role'][] = ['Admin', 'Editor', 'Viewer'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Viewer', Validators.required]
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit']) {
      if (this.userToEdit) {
        this.isEditMode = true;
        this.userForm.patchValue({
          name: this.userToEdit.name,
          email: this.userToEdit.email,
          role: this.userToEdit.role
        });
      } else {
        this.isEditMode = false;
        this.userForm.reset({ role: 'Viewer' });
      }
    }
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get role() { return this.userForm.get('role'); }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      this.formSubmit.emit(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    console.log('Form cancelled');
    this.formCancel.emit();
  }
}