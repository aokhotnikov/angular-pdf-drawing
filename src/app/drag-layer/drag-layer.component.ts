import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { DrawingService } from '../services/drawing.service';
import { map } from 'rxjs';
import { AngularDraggableModule } from 'angular2-draggable';

@Component({
  selector: 'drag-layer',
  standalone: true,
  imports: [CommonModule, CdkDrag, AngularDraggableModule],
  templateUrl: './drag-layer.component.html',
  styleUrl: './drag-layer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragLayerComponent implements AfterViewInit, OnInit {
  @ViewChild('divElement', { static: true }) divElement!: ElementRef;

  private _top: number = 0;
  private _left: number = 0;
  private _width: number = 200;
  private _height: number = 400;
  private _color: string = 'yellow';

  @Input()
  set width(value: number) {
    this._width = value;
    // this.cdr.detectChanges();
    this.renderer.setStyle(this.divElement.nativeElement, 'width', `${value}px`);
    console.log('Width set to:', value);
  }

  get width() {
    return this._width;
  }

  @Input()
  set height(value: number) {
    this._height = value;
    // this.cdr.detectChanges();
    this.renderer.setStyle(this.divElement.nativeElement, 'height', `${value}px`);
    console.log('Height set to:', value);
  }

  get height() {
    return this._height;
  }

  @Input()
  set left(value: number) {
    this._left = value;
    this.renderer.setStyle(this.divElement.nativeElement, 'left', `${value}px`);
    console.log('Left set to:', value);
  }

  get left(): number {
    return this._left;
  }

  @Input()
  set top(value: number) {
    this._top = value;
    this.renderer.setStyle(this.divElement.nativeElement, 'top', `${value}px`);
    console.log('Top set to:', value);
  }

  get top(): number {
    return this._top;
  }

  @Input()
  set color(value: string) {
    this.renderer.setStyle(this.divElement.nativeElement, 'border-color', value);
    console.log('Border set to:', value);
    this._color = value;
  }

  get color(): string {
    return this._color;
  }

  dragDisabled = true;
  resizeMode = false;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, public drawSrv: DrawingService) {

  }

  ngOnInit(): void {
    console.log('Init DragLayerComponent');
  }

  ngAfterViewInit(): void {
    this.drawSrv.allowDragging$.pipe(
      map(val => !val),
    ).subscribe(val => {
      this.dragDisabled = val;
      this.resizeMode = !this.dragDisabled;
      if (this.dragDisabled) {
        this.renderer.removeClass(this.divElement.nativeElement, 'allow-drag');
      } else {
        this.renderer.addClass(this.divElement.nativeElement, 'allow-drag');
      }
      this.cdr.detectChanges();
    })
  }
}
