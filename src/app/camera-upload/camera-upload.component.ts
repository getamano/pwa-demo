import { Component } from '@angular/core';

@Component({
  selector: 'app-camera-upload',
  template: `
    <div class="container">
      <h1>Take or Upload a Photo</h1>

      <!-- File Input -->
      <input
        type="file"
        accept="image/*,video/*"
        capture="environment"
        (change)="onFileSelected($event)"
      />

      <!-- Preview -->
      @if(photo){
      <div class="preview">
        <h3>Preview:</h3>
        <img [src]="photo" alt="Selected Photo" />
      </div>
      }

      <!-- Upload Button -->
      <button (click)="uploadPhoto()" [disabled]="!selectedFile">
        Upload Photo
      </button>
    </div>
  `,
  styles: [
    `
      .container {
        text-align: center;
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
    `,
  ],
})
export class CameraUploadComponent {
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

      alert('Photo uploaded successfully!');
    }
  }
}
