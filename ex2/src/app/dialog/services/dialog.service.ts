import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, ViewContainerRef, TemplateRef, Type, createComponent } from "@angular/core";
import { DialogConfig } from "../models/dialog-config";
import { DialogComponent } from "../dialog.component";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogInstance!: ComponentRef<DialogComponent>;
  config!: DialogConfig | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open(
    vcrOrComponent: ViewContainerRef,
    content: TemplateRef<Element>,
    config?: DialogConfig
  ): void;

  open<C>(vcrOrComponent: Type<C>, config?: DialogConfig): void;

  open<C>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    param2?: TemplateRef<Element> | DialogConfig,
    config?: DialogConfig
  ) {
    if (vcrOrComponent instanceof ViewContainerRef) {
      this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
      this.config = config;
    } else {
      this.openWithComponent(vcrOrComponent);
      this.config = param2 as DialogConfig | undefined;
    }
  }

  private openWithTemplate(
    vcr: ViewContainerRef,
    content: TemplateRef<Element>
  ) {
    vcr.clear();

    const innerContent = vcr.createEmbeddedView(content);

    this.dialogInstance = vcr.createComponent(DialogComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });
  }

  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.dialogInstance = createComponent(DialogComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.dialogInstance.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.dialogInstance.hostView);
  }

  close() {
    this.dialogInstance.instance.close();
  }
}