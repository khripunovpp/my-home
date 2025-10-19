import {Component, inject, OnInit, signal} from '@angular/core';
import {SensorsService} from './sensors.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'my-light',
  template: `
    <div>
      {{ light() | json }}
    </div>`,
  imports: [
    JsonPipe
  ],
  styles: [`
  `]
})
export class LightComponent
  implements OnInit {
  constructor() {
  }

  readonly sensorsService = inject(SensorsService);
  readonly light = signal({
    state: 'OFF',
  });

  ngOnInit(): void {
    this.sensorsService.listenOfficeLight((data => {
      this.light.set(data as any);
    }));
  }
}
