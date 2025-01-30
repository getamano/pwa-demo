import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-camera-upload',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="my-app-card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>Take or Upload a Photo</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="container">
          <!-- File Input -->
          <input
            #fileUpload
            type="file"
            accept="image/*"
            capture="environment"
            (change)="onFileSelected($event)"
            class="file-input"
          />

          <input
            #fileUpload2
            type="file"
            accept="image/*"
            (change)="onFileSelected($event)"
            class="file-input"
          />

          <button type="button" mat-raised-button (click)="fileUpload.click()">
            Open Camera Roll
            <mat-icon>camera</mat-icon>
          </button>

          <button type="button" mat-raised-button (click)="fileUpload2.click()">
            Upload Photo
            <mat-icon>cloud_upload</mat-icon>
          </button>

          <!-- Preview -->
          @if(photo){
          <div class="preview">
            <img [src]="photo" alt="Selected Photo" />
          </div>
          }
        </div>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-flat-button color="primary" (click)="uploadPhoto()">
          Upload
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .container {
        margin: 20px;
      }
      .preview img {
        max-width: 100%;
        max-height: 300px;
        margin-top: 10px;
        border: 1px solid #ccc;
      }
      button {
        margin-top: 10px;
      }

      .file-input {
        display: none; /* Hide the file input */
      }
    `,
  ],
})
export class CameraUploadComponent {
  private readonly snackBar = inject(MatSnackBar);
  selectedFile: File | null = null;
  photo: string | null = null;

  // Handle File Selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Upload Photo (Stub - Replace with real API call)
  uploadPhoto(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);

      // Simulate upload (Replace with actual HTTP request)
      console.log('Uploading...', this.selectedFile);
      this.snackBar.open('Photo uploaded successfully!', 'Ok');
    }
  }
}
