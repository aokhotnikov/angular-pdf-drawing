import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

// Attempt to create own DragDrop directive
@Directive({
  selector: '[appDragDrop]',
  standalone: true,
})
export class DraggableDirective {
  // @Input() dragParent: string | HTMLElement = this.el.nativeElement.parentElement; // Селектор или сам элемент
  //
  // private isDragging = false;
  // private startX: number | null = null;
  // private startY: number | null = null;
  // private originalX: number | null = null;
  // private originalY: number | null = null;
  // private parentRect: DOMRect | null = null;
  //
  // constructor(private el: ElementRef, private renderer: Renderer2) {
  //   // Установка начальной позиции элемента
  //   this.renderer.setStyle(this.el.nativeElement, 'position', 'relative'); // or 'absolute'
  // }
  //
  // @HostListener('mousedown', ['$event'])
  // onMousedown(event: MouseEvent): void {
  //   this.isDragging = true;
  //   this.startX = event.clientX;
  //   this.startY = event.clientY;
  //   const rect = this.el.nativeElement.getBoundingClientRect();
  //   this.originalX = rect.left;
  //   this.originalY = rect.top;
  //   // Определение родительского элемента
  //   let parentEl = this.dragParent instanceof HTMLElement
  //     ? this.dragParent
  //     : document.querySelector(this.dragParent);
  //   this.parentRect = parentEl ? parentEl.getBoundingClientRect() : null;
  //
  //   this.renderer.addClass(this.el.nativeElement, 'dragging');
  // }
  //
  // @HostListener('document:mousemove', ['$event'])
  // onMousemove(event: MouseEvent): void {
  //   if (!this.isDragging || this.startX === null || this.startY === null || this.originalX === null || this.originalY === null || !this.parentRect) {
  //     return;
  //   }
  //   const deltaX = event.clientX - this.startX;
  //   const deltaY = event.clientY - this.startY;
  //   let newLeft = this.originalX + deltaX;
  //   let newTop = this.originalY + deltaY;
  //
  //   // Ограничение перемещения в пределах родительского элемента
  //   if (newLeft < this.parentRect.left) {
  //     newLeft = this.parentRect.left;
  //   } else if (newLeft + this.el.nativeElement.offsetWidth > this.parentRect.right) {
  //     newLeft = this.parentRect.right - this.el.nativeElement.offsetWidth;
  //   }
  //
  //   if (newTop < this.parentRect.top) {
  //     newTop = this.parentRect.top;
  //   } else if (newTop + this.el.nativeElement.offsetHeight > this.parentRect.bottom) {
  //     newTop = this.parentRect.bottom - this.el.nativeElement.offsetHeight;
  //   }
  //
  //   this.renderer.setStyle(this.el.nativeElement, 'left', `${newLeft - this.parentRect.left}px`);
  //   this.renderer.setStyle(this.el.nativeElement, 'top', `${newTop - this.parentRect.top}px`);
  // }
  //
  // @HostListener('document:mouseup')
  // onMouseup(): void {
  //   this.isDragging = false;
  //   this.renderer.removeClass(this.el.nativeElement, 'dragging');
  // }
}
