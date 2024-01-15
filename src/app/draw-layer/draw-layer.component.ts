import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { DrawRectangleDirective, Rect } from '../directives/draw-rectangle.directive';
import { DrawingService } from '../services/drawing.service';

@Component({
  selector: 'draw-layer',
  standalone: true,
  imports: [CommonModule, CdkDrag, DrawRectangleDirective],
  templateUrl: './draw-layer.component.html',
  styleUrl: './draw-layer.component.scss',
})
export class DrawLayerComponent implements AfterViewInit, OnDestroy {
  #isHidden: boolean = false;
  @Input()
  set isHidden(val: boolean) {
    this.#isHidden = val;
    this.addRectToLayer();
  }

  get isHidden(): boolean {
    return this.#isHidden;
  }

  private observer?: MutationObserver;
  private drawnRectangle: Rect | null = null;

  constructor(
    private el: ElementRef,
    private drawSrv: DrawingService,
    private viewContainer: ViewContainerRef,
  ) {
    this.definePropertyHidden();
    this.drawSrv.allowDrawing$.subscribe(val => this.isHidden = !val);
  }

  ngAfterViewInit() {
    console.log('Init ngAfterViewInit for DrawLayerComponent');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
          this.definePropertyHidden();
        }
      });
    });

    this.observer.observe(this.el.nativeElement, {
      attributes: true, // Наблюдать за атрибутами
      // attributeFilter: ['style'] // Наблюдать только за изменениями атрибута style
    });
  }

  definePropertyHidden() {
    const { display } = getComputedStyle(this.el.nativeElement);
    this.isHidden = display === 'none';
  }

  onRectangleDrawn(rect: Rect) {
    this.drawnRectangle = rect;
  }

  addRectToLayer() {
    if (!this.drawnRectangle) {
      return;
    }

    this.drawSrv.addRectangleToNode(this.drawnRectangle, this.el.nativeElement, this.viewContainer, this.drawSrv.zoom());

    this.drawnRectangle = null;
  }

  ngOnDestroy() {
    console.log('Destroy DrawLayerComponent');
    this.observer?.disconnect();
  }
}
