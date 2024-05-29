import { Component } from '@angular/core';
import {GitdbService} from '../../services/gitdb.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.less'
})
export class ImageUploadComponent {

  currentFile: File | null = null;

  constructor(private readonly dbService: GitdbService) {}

  selectImage(event: Event): void {
    // Set current file
    this.currentFile = (event.target as unknown as FileTarget).files[0];
    console.log(this.currentFile);
  }

  uploadImage() {
    this.dbService.uploadImage(this.currentFile!, 'SheriffTest').subscribe((res) => {
      console.log(res);
    });
  }

  hasFile(): boolean {
    return this.currentFile !== null;
  }

  cancel() {
    this.currentFile = null;
  }
}

interface FileTarget {
  result: string;
  files: File[];
}
