import { ChangeDetectionStrategy, Component, ElementRef, HostListener, viewChild } from '@angular/core';

// the pattern from public/binary.svg: 20 columns, two alternating lines
const ROWS = ['0001 1100 1010 1000 ', '0100 1110 1001 1100 '];
const COLS = 96; // one element per digit, so keep these small
const LINES = 30; // the css lays out the same grid, change both
const REACH_X = 7; // how far the cursor reaches, in cells
const REACH_Y = 4;

// same number every time for a cell, so no table to keep. Cells share a number along a run of 5
// across or 3 down, which is what makes the lit ones streak
const noise = (a: number, b: number) => Math.abs((Math.sin(a * 127.1 + b * 311.7) * 43758.5) % 1);
const roll = (x: number, y: number) => 1 - (1 - Math.min(noise(x, (y / 3) | 0), noise((x / 5) | 0, y + 0.5))) ** 2;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // drawn once
  selector: 'app-binary-background',
  styleUrl: './binary-background.css',
  templateUrl: './binary-background.html',
})
export class BinaryBackground {
  digits = Array.from({ length: COLS * LINES }, (_, n) => ROWS[((n / COLS) | 0) % 2][n % COLS % 20]);
  private grid = viewChild.required<ElementRef<HTMLElement>>('grid');
  private cell = -1;

  // the grid is fixed to the window, so the cell under the cursor is arithmetic. Measuring it here
  // would lay out every digit again on every move
  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    const col = Math.floor((e.clientX / innerWidth) * COLS);
    const row = Math.floor((e.clientY / innerHeight) * LINES);
    if (row * COLS + col === this.cell) return; // same digit as last move
    this.cell = row * COLS + col;
    const grid = this.grid().nativeElement;
    grid.querySelectorAll('.lit').forEach((el) => el.classList.remove('lit')); // starts the fade
    for (let y = row - REACH_Y; y <= row + REACH_Y; y++) {
      for (let x = col - REACH_X; x <= col + REACH_X; x++) {
        const level = 1 - Math.hypot((x - col) / REACH_X, (y - row) / REACH_Y); // 1 at the cursor
        if (x < 0 || x >= COLS || y < 0 || y >= LINES || roll(x, y) >= level) continue;
        const el = grid.children[y * COLS + x] as HTMLElement;
        el.style.setProperty('--level', `${level}`);
        el.classList.add('lit');
      }
    }
  }
}
