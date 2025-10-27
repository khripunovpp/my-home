import {Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from '@angular/core';
import iro from '@jaames/iro';

@Component({
  selector: 'my-color-picker',
  template: `
    <div #colorPickerContainer></div>`,
  styles: [`
    :host {
      display: block;
      width: 200px; /* можно менять через Input */
      height: 200px;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef, private ngZone: NgZone) {
  }

  @Input() color: { r: number, g: number, b: number } = {r: 255, g: 0, b: 0};
  @Output() colorChange = new EventEmitter<{ r: number, g: number, b: number }>();
  private colorPicker!: iro.ColorPicker;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.colorPicker = new (iro as any).ColorPicker(this.el.nativeElement.querySelector('div'), {
        width: this.el.nativeElement.offsetWidth || 200,
        color: this.color,
        layout: [
    {
      component: iro.ui.Slider,
      options: {
        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
        sliderType: 'hue'
      }
    },
  ]
      });

      this.colorPicker.on('color:change', (c: any) => {
        this.ngZone.run(() => {
          this.color = {r: c.red, g: c.green, b: c.blue};
          this.colorChange.emit(this.color);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.colorPicker) {
      this.colorPicker.off('color:change', () => {
      });
    }
  }

  // метод для внешнего изменения цвета
  setColor(newColor: string) {
    if (this.colorPicker) {
      this.colorPicker.color.set(newColor);
    }
  }
}
