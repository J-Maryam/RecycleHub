import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestDetailsComponent } from './collection-request-details.component';

describe('CollectionRequestDetailsComponent', () => {
  let component: CollectionRequestDetailsComponent;
  let fixture: ComponentFixture<CollectionRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
