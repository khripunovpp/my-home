import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PresenceSensorService} from '../../shared/sensors/presence-sensor.service';
import {DeviceSingleModel} from '../../../../../shared/devices/device-single.model';

@Component({
  selector: 'my-presence',
  template: `
    <div [class.present]="presence()"
         class="square">
      <span>{{ presence() ? 'Сука детектед' : 'Тишь да гладь' }}</span>
    </div>`,
  imports: [],
  styles: [`
    :host {
      width: 100%;
    }

    .square {
      background-color: #e7fdff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: clamp(14px, 2.5vw, 24px);
      padding-bottom: 100%;
      width: 100%;
      position: relative;
      color: #565656;
      white-space: nowrap;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .present {
      color: white;
      background-color: #ff9800;
    }
  `],
})
export class PresenceWidgetComponent
  implements OnInit {
  constructor() {
  }

  device = input<DeviceSingleModel>();
  readonly sensorsService = inject(PresenceSensorService);
  readonly presence = signal(false)

  ngOnInit(): void {
    this.sensorsService.listen(this.device()!.device!.ieee_address, (data => {
      this.presence.set((data as any).presence);
    }));
  }
}
