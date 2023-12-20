import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { ApplicationRef, Type, EnvironmentInjector, createComponent } from '@angular/core';
import { DialogComponent } from '../dialog.component';

describe('DialogService', () => {
  let dialogService: DialogService;
  let appRefMock: Partial<ApplicationRef>;
  let injectorMock: EnvironmentInjector;

  beforeEach(() => {
    appRefMock = jasmine.createSpyObj('ApplicationRef', ['attachView', 'detachView']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationRef, useValue: appRefMock },
        { provide: EnvironmentInjector, useValue: injectorMock }
      ]
    });

    injectorMock = TestBed.inject(EnvironmentInjector);
    dialogService = TestBed.inject(DialogService);

  });

  it('should create the component and then append to body', function () {
    const component = DialogComponent;
    const newComponent = createComponent(component, {
      environmentInjector: injectorMock,
    });
    const dialogInstance = createComponent(DialogComponent, {
      environmentInjector: injectorMock,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    const appendChildSpy = spyOn(document.body, 'appendChild');

    dialogService.open(component)

    expect(appRefMock.attachView).toHaveBeenCalledTimes(2)
    expect(appendChildSpy).toHaveBeenCalledWith(dialogInstance.location.nativeElement);

  });

  it('should throw an error if the component parameter is not a valid Angular component', function () {
    const component: Type<unknown> = undefined as any;;

    expect(function () { return dialogService['openWithComponent'](component); }).toThrowError();
  });
})