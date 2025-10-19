import {Component, inject, OnInit, signal} from '@angular/core';
import {SensorsService} from '../../shared/sensors.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'my-presence',
  template: `
    <div [class.present]="presence()"
         class="square">
      <span>{{ presence() ? 'Сука детектед' : '' }}</span>
    </div>`,
  imports: [
    JsonPipe
  ],
  styles: [`
    :host {
      width: 100%;
    }

    .square {
      background-color: green;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 24px;
      color: white;
      padding-bottom: 100%;
      width: 100%;
      position: relative;

      span {
        position: absolute;
      }
    }

    .present {
      background-color: red;
    }
  `]
})
export class PresenceWidgetComponent
  implements OnInit {
  constructor() {
  }

  readonly sensorsService = inject(SensorsService);
  readonly presence = signal(false)

  ngOnInit(): void {
    this.sensorsService.listenPresence((data => {
      this.presence.set((data as any).presence);
    }));
  }
}
