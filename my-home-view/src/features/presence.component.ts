import {Component, inject, OnInit, signal} from '@angular/core';
import {SensorsService} from './sensors.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'my-presence',
  template: `
    <div>
      <div [class.present]="presence()"
           class="square">
        {{ presence() ? 'Сука детектед' : '' }}
      </div>
    </div>`,
  imports: [
    JsonPipe
  ],
  styles: [`
    .square {
      width: 300px;
      height: 300px;
      background-color: green;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 24px;
      color: white;
    }

    .present {
      background-color: red;
    }
  `]
})
export class PresenceComponent
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
