import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'my-grid-cell',
  host: {
    'class': 'grid-cell-component'
  },
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    .grid-cell-component {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class GridCellComponent {
  constructor() {
  }
}
