import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserData } from '../model/user-data';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  user: UserData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };
}
