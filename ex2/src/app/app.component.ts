import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog/services/dialog.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('template', { read: ViewContainerRef })
  vcr!: ViewContainerRef;

  @ViewChild('formTemplate', { read: ViewContainerRef })
  formVcr!: ViewContainerRef;

  constructor(private dialogService: DialogService) {}

  submitForm(form: NgForm) {
    console.log(form.value)
    this.dialogService.close()
  }

  openDialogTemplate(view: TemplateRef<Element>) {
    this.dialogService.open(this.vcr, view, {
        width: '400px',
        height: '400px'
    });
  }

  openDialogFormTemplate(view: TemplateRef<Element>) {
    this.dialogService.open(this.formVcr, view, {
        width: '400px',
        height: '400px'
    });
  }

  openDialogComponent() {
    this.dialogService.open(DialogContentComponent, {
        width: '400px',
        height: '400px'
    });
  }

  close() {
    this.dialogService.close();
  }
}
