import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'my-home-grid',
  host: {
    'class': 'home-grid-component'
  },
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    .home-grid-component {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      gap: 16px;
      padding: 16px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class HomeGridComponent {
  constructor() {
  }
}
