import { Component } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public isActive: boolean = false;

  constructor(private scroll: ScrollService) { }

  ngOnInit(): void {
    this.scroll.scrollToTop();
  }

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
