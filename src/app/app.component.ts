import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

// components
import { CameraUploadComponent } from './camera-upload/camera-upload.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    // material
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,

    // components
    CameraUploadComponent,
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button class="example-icon">
        <mat-icon style="color:" #fff;>menu</mat-icon>
      </button>
      <span>My App</span>
      <span class="example-spacer"></span>
    </mat-toolbar>

    @if(isLoading) {
    <div class="loading">Fetching location...</div>
    } @if(!isLoading) {
    <div>
      <h1>Your Location:</h1>
      <p>Latitude: {{ location?.latitude }}</p>
      <p>Longitude: {{ location?.longitude }}</p>
      <p>Accuracy: {{ location?.accuracy }} meters</p>
    </div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    }

    <app-camera-upload></app-camera-upload>
  `,
  styles: `
      .loading {
        font-size: 18px;
        color: #555;
      }
      .error {
        color: red;
      }
    `,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pwa-demo';

  location: { latitude: number; longitude: number; accuracy: number } | null =
    null;
  errorMessage = '';
  isLoading: boolean = true;

  selectedFile: File | null = null;
  photo: string | null = null;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = this.getErrorMessage(error);
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by your browser.';
      this.isLoading = false;
    }
  }

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

  getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Permission denied. Please allow location access.';
      case error.POSITION_UNAVAILABLE:
        return 'Position unavailable. Please check your settings.';
      case error.TIMEOUT:
        return 'Request timed out. Try again.';
      default:
        return 'An unknown error occurred.';
    }
  }
}
