import { Component } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private scroll: ScrollService) { }

  ngOnInit(): void {
    this.scroll.scrollToTop();
  }
}
