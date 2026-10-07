import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../model/user-data';
import { UserService } from '../service/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  private builder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  userForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.pattern('[1-9]\\d{2}[1-9]\\d{6}')],
    email: ['', Validators.email],
  });

  get firstName(): AbstractControl<string> { return <AbstractControl>this.userForm.get('firstName'); }
  get lastName(): AbstractControl<string> { return <AbstractControl>this.userForm.get('lastName'); }
  get phone(): AbstractControl<string> { return <AbstractControl>this.userForm.get('phone'); }
  get email(): AbstractControl<string> { return <AbstractControl>this.userForm.get('email'); }

  onSubmit(): void {
    const user: UserData = {
      firstName: <string>this.userForm.value.firstName,
      lastName: <string>this.userForm.value.lastName,
      phone: <string>this.userForm.value.phone,
      email: <string>this.userForm.value.email,
    };
    this.userService.setUser(user);
    this.router.navigate(['/result']).then(() => {});
  }
}
