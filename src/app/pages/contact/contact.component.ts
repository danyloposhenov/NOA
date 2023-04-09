import { Component } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(private scroll: ScrollService) { }

  ngOnInit(): void {
    this.scroll.scrollToTop();
  }
}
