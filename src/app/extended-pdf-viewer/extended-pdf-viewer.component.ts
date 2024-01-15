import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { DecimalPipe } from '@angular/common';
import { PDFDocumentProxy, PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';

import { DraggableDirective } from '../directives/draggable.directive';
import { DrawLayerComponent } from '../draw-layer/draw-layer.component';
import { DrawingService } from '../services/drawing.service';

@Component({
  selector: 'app-extended-pdf-viewer',
  templateUrl: './extended-pdf-viewer.component.html',
  styleUrls: ['./extended-pdf-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkDrag, DraggableDirective, PdfViewerModule, DrawLayerComponent, DecimalPipe],
})
export class ExtendedPdfViewerComponent {

  isDrawEnabled = signal(false);
  isDragEnabled = signal(false);

  @ViewChild('pdfviewer', { static: false }) pdfviewer!: PdfViewerComponent;
  drawOverlayMap = new Map<number, ComponentRef<DrawLayerComponent>>();

  constructor(private viewContainer: ViewContainerRef, public drawSrv: DrawingService) {

  }

  onPageRendered(e: any) {
    const view = e.source; // view.viewport.width, view.viewport.height
    const pageNumber = e.pageNumber;
    // console.log(this.pdfviewer.pdfViewerContainer);
    const pageElement = this.pdfviewer.pdfViewerContainer.nativeElement.querySelector(`.page[data-page-number="${pageNumber}"]`);

    const componentRef = this.viewContainer.createComponent(DrawLayerComponent);
    componentRef.setInput('isHidden', !this.isDrawEnabled());
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    pageElement?.appendChild(domElem);

    this.drawSrv.addRectangleToNode({
      x: 20,
      y: 40,
      width: 50,
      height: 30,
    }, domElem, this.viewContainer)

    // destroy previous component to avoid memory leaks
    if (this.drawOverlayMap.has(pageNumber)) {
      const previousRef = this.drawOverlayMap.get(pageNumber);
      previousRef?.destroy();
    }

    this.drawOverlayMap.set(pageNumber, componentRef);
  }

  enableDrawing() {
    this.isDrawEnabled.set(!this.isDrawEnabled());
    this.drawSrv.allowDrawing$.next(this.isDrawEnabled());
  }

  enableDragging() {
    this.isDragEnabled.set(!this.isDragEnabled());
    this.drawSrv.allowDragging$.next(this.isDragEnabled());
  }

  async loadComplete(pdfData: PDFDocumentProxy) {
    console.log((await pdfData.getPage(1)).getViewport({ scale: 1 }));
  }
}
