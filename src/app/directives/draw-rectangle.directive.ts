import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[drawRectangle]',
  standalone: true,
})
export class DrawRectangleDirective implements AfterViewInit {
  @Output() rectangleDrawn = new EventEmitter<Rect>();

  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private rect: Rect | null = null;

  constructor(private el: ElementRef) {
    console.log('Init DrawRectangleDirective');
  }


  ngAfterViewInit(): void {
    const canvas = this.el.nativeElement.querySelector('canvas');
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.ctx = canvas.getContext('2d');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    const { x, y } = this.getMousePos(this.ctx!.canvas, event);
    this.rect = {
      x,
      y,
      width: 0,
      height: 0,
    };
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!(this.isDrawing && this.rect && this.ctx)) {
      return;
    }
    const { x, y } = this.getMousePos(this.ctx.canvas, event);
    this.rect.width = x - this.rect.x;
    this.rect.height = y - this.rect.y;

    this.ctx.strokeStyle = 'red';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clear canvas
    this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDrawing = false;
    if (this.rect) {
      this.rectangleDrawn.emit(this.rect);
    }
  }

  private getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    }
  }
}
