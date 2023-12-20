import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog/services/dialog.service';


@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent {
  constructor(private dialogService: DialogService) {}
  
  close() {
    this.dialogService.close();
  }
}
