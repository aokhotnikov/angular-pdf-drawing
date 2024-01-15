import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawLayerComponent } from './draw-layer.component';

describe('EditorLayerComponent', () => {
  let component: DrawLayerComponent;
  let fixture: ComponentFixture<DrawLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
