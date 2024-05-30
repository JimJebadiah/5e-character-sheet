import {Component, EventEmitter, Output} from '@angular/core';
import {GitdbService} from '../../services/gitdb.service';

export type ImageState = 'select' | 'upload' | 'success';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.less'
})
export class ImageUploadComponent {

  currentFile: File | null = null;

  state: ImageState = 'select';

  @Output() uploadComplete = new EventEmitter();

  constructor(private readonly dbService: GitdbService) {}

  selectImage(event: Event): void {
    // Set current file
    this.currentFile = (event.target as unknown as FileTarget).files[0];
    console.log(this.currentFile);
    this.state = 'upload';
  }

  uploadImage() {
    this.dbService.uploadImage(this.currentFile!, 'SheriffTest').subscribe((res) => {
      console.log('asdf');
      console.log(res);
      this.state = 'success';
      this.uploadComplete.emit();
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
