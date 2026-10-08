import { ChangeDetectionStrategy, Component } from '@angular/core';

const COLS = 110

// a column of random bits
const stream = () => Array.from({ length: 25 + Math.floor(Math.random() * 35) }, () => Math.round(Math.random())).join('\n');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // drawn once, the css does the falling
  selector: 'app-binary-rain',
  styleUrl: './binary-rain.css',
  templateUrl: './binary-rain.html',
})
export class BinaryRain {
  columns = Array.from({ length: COLS }, () => {
    const speed = 18 + Math.random() * 22;
    return { speed, delay: -speed * Math.random(), text: stream() };
  });
}
