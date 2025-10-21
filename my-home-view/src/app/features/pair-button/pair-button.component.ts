import {Component, inject} from '@angular/core';
import {SensorsService} from '../../shared/sensors/sensors.service';

@Component({
  selector: 'my-home-pair-button',
  template: `
    <button (click)="pairDevice()" class="pair-button">
      Pair New Device
    </button>
  `,
  styles: [`
    .pair-button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;

      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;

    }

    .pair-button:hover {
      background-color: #45a049;
    }
  `]
})
export class PairButtonComponent {

  private readonly _sensorsService = inject(SensorsService);

  pairDevice(): void {
    this._sensorsService.pairDevice();
  }
}
