import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { ElementRef } from '@angular/core';
import { DialogService } from '../services/dialog.service';

describe('DialogComponent', () => {
  let dialogComponent: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: DialogService;
  let mockElementRef: ElementRef;

  beforeEach(async () => {
    const mockElementRef = {
      nativeElement: document.createElement('div')
    };

    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        {
          provide: ElementRef, 
          useValue: mockElementRef
        }
      ]
    })
      .compileComponents();

    dialogService = TestBed.inject(DialogService);
    
    fixture = TestBed.createComponent(DialogComponent);
    dialogComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close when the escape key is pressed', function () {
    spyOn(dialogService, 'close');
    dialogComponent.onEscape();
    expect(dialogService.close).toHaveBeenCalled();
  });

  it('should remove itself from the DOM when closed', function () {
    spyOn(mockElementRef.nativeElement, 'remove');
    dialogComponent.close();
    expect(mockElementRef.nativeElement.remove).toHaveBeenCalled();
  });

  it('should apply default styles when no options are provided', function () {
    dialogComponent.options = undefined;
    dialogComponent.addOptions();

    expect(dialogComponent.dialog.nativeElement.style.minWidth).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.width).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.maxWidth).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.minHeight).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.height).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.maxHeight).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.backgroundColor).toBe('white');
  });

  it('should handle missing size property in options gracefully', function() {
    dialogComponent.options = {};
    dialogComponent.addOptions();

    expect(dialogComponent.dialog.nativeElement.style.minWidth).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.width).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.maxWidth).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.minHeight).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.height).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.maxHeight).toBe('auto');
    expect(dialogComponent.dialog.nativeElement.style.backgroundColor).toBe('white');
  });
});

