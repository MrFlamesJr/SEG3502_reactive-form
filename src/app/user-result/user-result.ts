import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/user-service';
import { BinaryRain } from '../binary-rain/binary-rain';

@Component({
  imports: [RouterLink, BinaryRain],
  selector: 'app-user-result',
  styleUrl: './user-result.css',
  templateUrl: './user-result.html',
})
export class UserResult {
  private userService = inject(UserService);
  user = this.userService.getUser();
}
