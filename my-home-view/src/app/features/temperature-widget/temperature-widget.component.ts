import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {SensorsService} from '../../shared/sensors/sensors.service';

@Component({
  selector: 'my-temperature',
  template: `
    @let temp = temperature();

    <div class="temperature-data">
      <span class="temperature-data__item"><span>Temperature</span> <span>{{ temp.temperature }}
        <small>°C</small></span></span>
      <span class="temperature-data__item"><span>Humidity</span> <span>{{ temp.humidity }}
        <small>%</small></span></span>
    </div>
  `,
  host: {
    '[style]': 'getCCSValsForTempClass()'
  },
  imports: [],
  styles: [`
    :host {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at top left, transparent, var(--t-color-4)),
      linear-gradient(135deg, var(--t-color-1) 0%, var(--t-color-2) 20%, var(--t-color-3) 100%);
      border-radius: 4px;
    }

    .temperature-data {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 16px;
      color: #fff;
    }

    .temperature-data__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;

      span:first-child {

      }

      span:last-child {
        font-size: 56px;
      }
    }

  `]
})
export class TemperatureWidgetComponent
  implements OnInit {
  constructor() {
  }

  readonly tempMap = new Map([
    [[-100, 5], 'freezing'],
    [[5, 15], 'cold'],
    [[16, 21], 'cool'],
    [[22, 24], 'normal'],
    [[25, 27], 'warm'],
    [[28, 100], 'hot'],
  ]);
  readonly colorMap = new Map([
    ['freezing', ['#74ebd5', '#ACB6E5', '#74ebd5', '#ACB6E5']],
    ['cold', ['#4CA1AF', '#C4E0E5', '#4CA1AF', '#C4E0E5']],
    ['cool', ['#2193b0', '#6dd5ed', '#2193b0', '#6dd5ed']],
    ['normal', ['#56ab2f', '#a8e063', '#56ab2f', '#86ba46']],
    ['warm', ['#ff9966', '#ff5e62', '#ff9966', '#ff5e62']],
    ['hot', ['#ff416c', '#ff4b2b', '#ff416c', '#ff4b2b']],
  ]);
  readonly sensorsService = inject(SensorsService);
  readonly temperature = signal({
    temperature: null,
    humidity: null,
  });
  readonly tempClass = computed(() => {
    if (this.temperature().temperature === null) {
      return null
    }
    return this._getTempClass(this.temperature().temperature!);
  });
  readonly getCCSValsForTempClass = computed(() => {
    const colors = this.colorMap.get(this.tempClass() || '');
    if (!colors) {
      return '';
    }
    return colors.map((c, i) => `--t-color-${i + 1}: ${c}`).join('; ');
  });

  ngOnInit(): void {
    // this.sensorsService.listenTemperature((data => {
    //   this.temperature.set(data as any);
    // }));
  }

  private _getTempClass(temp: number): string {
    for (const [[min, max], cls] of this.tempMap) {
      if (temp >= min && temp <= max) {
        return cls;
      }
    }
    return 'normal';
  }
}
