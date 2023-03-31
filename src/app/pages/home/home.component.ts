import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public isActive: boolean = false;

  openMoreText(): void {
    this.isActive = !this.isActive;
    if (this.isActive == false) {
      window.scrollBy({
        top: -1500,
        behavior: 'smooth'
      })
    }
  }

}
