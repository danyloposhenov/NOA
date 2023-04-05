import { Component } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  
  constructor(private scroll: ScrollService) { }

  ngOnInit(): void {
    this.scroll.scrollToTop();
  }
}
