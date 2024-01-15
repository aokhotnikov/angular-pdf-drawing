import { EmbeddedViewRef, Injectable, Renderer2, signal, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DragLayerComponent } from '../drag-layer/drag-layer.component';
import { Rect } from '../directives/draw-rectangle.directive';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  allowDrawing$ = new BehaviorSubject(false);
  allowDragging$ = new BehaviorSubject(false);
  zoom = signal(0.4);

  constructor() {
  }

  addRectangleToNode(rect: Rect, parent: HTMLElement, viewContainer: ViewContainerRef, origScale = 1) {
    const componentRef = viewContainer.createComponent(DragLayerComponent);
    const scale = origScale == this.zoom() ? 1 : this.zoom();
    // remove 1px for border
    const x = rect.x * scale;
    const y = rect.y * scale;
    const w = rect.width * scale;
    const h = rect.height * scale;
    componentRef.instance.left = Math.abs((w > 0 ? x : x + w) - 1);
    componentRef.instance.top = Math.abs((h > 0 ? y : y + h) - 1);
    componentRef.instance.width = Math.abs(w) - 1;
    componentRef.instance.height = Math.abs(h) - 1;
    componentRef.instance.color = 'blue';
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    parent.appendChild(domElem); // this.renderer.appendChild(parent, domElem);
  }

  getLeftTopPosition(el: HTMLElement) {
    const { transform, left, top } = getComputedStyle(el);

    // Извлекаем значения смещения из матрицы трансформации
    const matrixValues = transform.match(/matrix.*\((.+)\)/);
    if (matrixValues && matrixValues.length > 1) {
      const parts = matrixValues[1].split(', ');
      const x = parseFloat(parts[4]);
      const y = parseFloat(parts[5]);

      // Применяем значения к свойствам left и top
      return [left + x, top + y];
    } else {
      return [left, top];
    }
  }
}
