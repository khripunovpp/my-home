import {Component, effect, inject, input} from '@angular/core';
import {DeviceSingleModel} from '../../../../../shared/devices/device-single.model';
import {WidgetController} from './widget.controller';

@Component({
  selector: 'my-widget-slot',
  host: {
    'class': 'my-widget-slot'
  },
  template: `
    <div class="my-widget-slot__rename">
      Rename
    </div>
    <div class="my-widget-slot__content">
      <ng-content></ng-content>
    </div>
    <div class="my-widget-slot__delete">
      Delete
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }

    :host:hover .my-widget-slot__rename,
    :host:hover .my-widget-slot__delete {
      opacity: 1;
    }

    .my-widget-slot__content {
      width: 100%;
      height: 100%;
    }

    .my-widget-slot__rename, .my-widget-slot__delete {
      position: absolute;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
      border-radius: 4px;
      user-select: none;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .my-widget-slot__rename {
      top: 8px;
      left: 8px;
    }

    .my-widget-slot__delete {
      bottom: 8px;
      left: 8px;
    }
  `],
  providers: [
    WidgetController,
  ]
})
export class WidgetSlotComponent {
  constructor() {
  }

  widgetController = inject(WidgetController);
  device = input<DeviceSingleModel>();
  bindEffect = effect(() => {
    if (!this.device()) {
      return;
    }
    this.widgetController.bind(this.device()!);
  })
}
