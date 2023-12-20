import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DialogConfig } from './models/dialog-config';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('dialog') dialog!: ElementRef<HTMLElement>;
  config!: DialogConfig | undefined;

  constructor(
    private dialogService: DialogService,
    private element: ElementRef
  ) { }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.dialogService.close();
  }

  ngAfterViewInit() {
    this.config = this.dialogService.config;
    this.configure();
  }

  configure() {
    this.dialog.nativeElement.style.minWidth =
      this.config?.minWidth || 'auto';
    this.dialog.nativeElement.style.width = this.config?.width || 'auto';
    this.dialog.nativeElement.style.maxWidth =
      this.config?.maxWidth || 'auto';
    this.dialog.nativeElement.style.minHeight =
      this.config?.minHeight || 'auto';
    this.dialog.nativeElement.style.height =
      this.config?.height || 'auto';
    this.dialog.nativeElement.style.maxHeight =
      this.config?.maxHeight || 'auto';
    this.dialog.nativeElement.style.backgroundColor =
      this.config?.backgroundColor || 'white';
  }

  close() {
    this.element.nativeElement.remove();
    this.dialogService.config = undefined;
  }
}