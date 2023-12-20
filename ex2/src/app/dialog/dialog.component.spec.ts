import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { ElementRef } from '@angular/core';
import { DialogService } from './services/dialog.service';

describe('DialogComponent', () => {
  let dialogComponent: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: DialogService;
  let mockElementRef: ElementRef;
  let nativeElemenetMock: any;
  let mockDialogElementRef: any;

  beforeEach(async () => {
    nativeElemenetMock = {
      remove: jasmine.createSpy('remove')
    }

    mockElementRef = {
      nativeElement: nativeElemenetMock
    };

    mockDialogElementRef = {
      nativeElement: jasmine.createSpyObj("div", ['style'])
    }

    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    })
      .compileComponents();

    dialogService = TestBed.inject(DialogService);
    dialogComponent = new DialogComponent(dialogService, mockElementRef)
    dialogComponent.dialog = mockDialogElementRef as ElementRef<HTMLElement>;

    fixture = TestBed.createComponent(DialogComponent);
    fixture.detectChanges();
  });

  it('should close when the escape key is pressed', function () {
    spyOn(dialogService, 'close');
    dialogComponent.onEscape();
    expect(dialogService.close).toHaveBeenCalled();
  });

  it('should remove itself from the DOM when closed', function () {
    dialogComponent.close();
    expect(nativeElemenetMock.remove).toHaveBeenCalled();
    expect(dialogService.config).toBeUndefined();
  });

  it('should apply default styles when no options are provided', function () {
    dialogComponent.config = undefined;
    dialogComponent.configure();

    expect(mockDialogElementRef.nativeElement.style.minWidth).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.width).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.maxWidth).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.minHeight).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.height).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.maxHeight).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.backgroundColor).toBe('white');
  });

  it('should handle empty config gracefully', function () {
    dialogComponent.config = {};
    dialogComponent.configure();

    expect(mockDialogElementRef.nativeElement.style.minWidth).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.width).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.maxWidth).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.minHeight).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.height).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.maxHeight).toBe('auto');
    expect(mockDialogElementRef.nativeElement.style.backgroundColor).toBe('white');
  });

  it('should tkae the config from user config', function () {
    dialogComponent.config = {
      width: '200px',
      height: '400px',
      backgroundColor: 'red'
    };
    dialogComponent.configure();

    expect(mockDialogElementRef.nativeElement.style.width).toBe('200px');
    expect(mockDialogElementRef.nativeElement.style.height).toBe('400px');
    expect(mockDialogElementRef.nativeElement.style.backgroundColor).toBe('red');
  });

});

