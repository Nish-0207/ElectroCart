import { Component, OnInit } from '@angular/core';
import { ElectroCartService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  userName: string = '';
  constructor(private eservice: ElectroCartService) {
    if (this.eservice.getAdminName() !== null) {
      this.userName = this.eservice.getAdminName();
    }
    this.eservice.isAdminLoginPresent();
  }

  ngOnInit(): void {}
}
