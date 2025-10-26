import {Component, effect, input, model, output} from '@angular/core';

@Component({
  selector: 'my-slider',
  template: `
    <input
      (input)="onInputChange($event)"
      [max]="max()"
      [min]="min()"
      [value]="slider()"
      step="1"
      type="range"
    />
  `,
  styles: [``],
  providers: []
})
export class SliderComponent {
  constructor() {
  }

  slider = model<number>();
  onChange = output<number>();
  min = input<number>(0);
  max = input<number>(1);

  onInputChange(
    event: Event
  ) {
    const inputElement = event.target as HTMLInputElement;
    this.slider.set(inputElement.valueAsNumber);
    this.emitChange();
  }

  emitChange() {
    const value = this.slider();
    const clampedValue = Math.max(this.min(), Math.min(this.max(), value || 0));
    this.onChange.emit(clampedValue);
  }
}
