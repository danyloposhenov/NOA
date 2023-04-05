import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getAuth, updatePassword, User } from "firebase/auth";
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-cabinet-password',
  templateUrl: './cabinet-password.component.html',
  styleUrls: ['./cabinet-password.component.scss']
})
export class CabinetPasswordComponent {

  public changePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private scroll: ScrollService
  ) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
    this.scroll.scrollToTop();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: [null, Validators.required],
      password: [null, Validators.required],
      repeatNewPassword: [null, Validators.required],
    })
  }

  changePassword(): void {
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = this.changePasswordForm.value;
    if (newPassword.password === newPassword.repeatNewPassword) {
      updatePassword(user as User, newPassword.password).then(() => {
        this.toastr.success("Your password successfully updated");
        this.changePasswordForm.reset();
      }).catch((error) => {
        this.toastr.error(error)
      });
    } else {
      this.toastr.success("The entered passwords don't match");
    }
  }
}
