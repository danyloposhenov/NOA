import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor ( public dialog: MatDialog ) { }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }
  openSideBar(): void {
    this.dialog.open(SideBarComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'side-bar-dialog',
      autoFocus: false
    })
  }
}
