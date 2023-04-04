import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressComponent } from 'src/app/components/address/address.component';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IRegister } from 'src/app/shared/interfaces/account/account.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet-profile',
  templateUrl: './cabinet-profile.component.html',
  styleUrls: ['./cabinet-profile.component.scss']
})
export class CabinetProfileComponent {

  public currentUser!: IRegister;

  constructor (
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.unloadUser();
  }

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favoritesCurrentUser');
    this.accountService.isUserLogin$.next(true);
  }

  unloadUser(): void {
    let user: IRegister = JSON.parse(localStorage.getItem('currentUser') as string);
    if (user.role === ROLE.USER) {
      this.currentUser = user;
    }
  }

  openAddressDialog(): void {
    this.dialog.open(AddressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'address-dialog',
      autoFocus: false,
    })
  }
}
