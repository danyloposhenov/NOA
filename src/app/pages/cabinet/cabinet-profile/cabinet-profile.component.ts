import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressComponent } from 'src/app/components/address/address.component';
import { IRegister } from 'src/app/shared/interfaces/account/account.interface';
import { IUser } from 'src/app/shared/interfaces/account/user.interface';
import { IAddress } from 'src/app/shared/interfaces/address/address.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-cabinet-profile',
  templateUrl: './cabinet-profile.component.html',
  styleUrls: ['./cabinet-profile.component.scss']
})
export class CabinetProfileComponent {

  public userDataForm!: FormGroup;
  public currentUserData!: IUser;
  public currentUser: IUser = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  };
  public myAddress: IAddress[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private orderService: OrderService,
    private scroll: ScrollService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkData();
    this.initUserDataForm();
    this.loadAddress();
    this.scroll.scrollToTop();
  }

  initUserDataForm(): void {
    this.userDataForm = this.fb.group({
      firstName: [this.currentUserData.firstName, Validators.required],
      lastName: [this.currentUserData.lastName, Validators.required],
      phoneNumber: [this.currentUserData.phoneNumber, Validators.required],
      email: [this.currentUserData.email, Validators.required],
    })
  }

  checkData(): IUser {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
    return this.currentUserData = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      phoneNumber: this.currentUser.phoneNumber,
      email: this.currentUser.email
    }
  }

  changeUserData(): void {
    const auth = getAuth();
    this.accountService.updateUser(this.userDataForm.value, auth.currentUser?.uid as string).then(() => {
      this.toastr.success('Your data successfully updated');
    }).catch((error: any) => {
      this.toastr.error(error);
    });
  }

  loadAddress(): void {
    if(localStorage.getItem('currentUser')) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      let currentID = currentUser['uid'];
      this.orderService.getOrdersForUser(currentID).subscribe(data => {
        let user = data as IRegister;
        this.myAddress = user['address'] as IAddress[];
      })
    }
  }

  openAddressDialog(): void {
    this.dialog.open(AddressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'address-dialog',
      autoFocus: false,
    })
  }

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favoritesCurrentUser');
    this.accountService.isUserLogin$.next(true);
  }
}
