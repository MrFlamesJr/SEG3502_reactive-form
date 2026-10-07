import { Injectable } from '@angular/core';
import { UserData } from '../model/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user?: UserData;

  public setUser(u: UserData): void {
    this.user = u;
  }

  public getUser(): UserData | undefined {
    return this.user;
  }
}
