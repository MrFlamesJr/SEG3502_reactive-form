import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-result',
  styleUrl: './user-result.css',
  templateUrl: './user-result.html',
})
export class UserResult {
  // TODO: inject UserService and get the submitted user with getUser()
}
