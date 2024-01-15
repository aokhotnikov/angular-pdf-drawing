import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedPdfViewerComponent } from './extended-pdf-viewer.component';

describe('ExtendedPdfViewerComponent', () => {
  let component: ExtendedPdfViewerComponent;
  let fixture: ComponentFixture<ExtendedPdfViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendedPdfViewerComponent]
    });
    fixture = TestBed.createComponent(ExtendedPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
