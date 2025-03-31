// my-infos.component.ts
import { Component, OnInit } from '@angular/core';
import { MyInfoServices } from '../../../core/services/myInfosServices';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-my-infos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HeaderComponent
],
  templateUrl: './my-infos.component.html',
  styleUrls: ['./my-infos.component.css']
})
export class MyInfosComponent implements OnInit {
  userInfo: any;
  isLoading = true;
  error: string | null = null;

  constructor(private infoServices: MyInfoServices) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this.isLoading = true;
    this.error = null;
    
    this.infoServices.currentUser().subscribe({
      next: (response) => {
        this.userInfo = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Failed to load user information';
        console.error('Error:', err);
      }
    });
  }
}