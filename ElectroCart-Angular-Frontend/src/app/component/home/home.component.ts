import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  logo:string="../../../assets/Images/Logo.jpg";
  images = [
     '../../../assets/Images/pic3.jpg',
     '../../../assets/Images/tv_image.webp',
     '../../../assets/Images/onur-binay-yvcGXgc14rE-unsplash.jpg',
     '../../../assets/Images/michal-kubalczyk-WecngmAT-KY-unsplash.jpg'
 ];
 
   constructor(
     config: NgbCarouselConfig,
     private route: Router
   ) {
     config.interval = 2000;
     config.keyboard = false;
     config.pauseOnHover = false;
   }
 
   ngOnInit(): void {
   }
 
   gotoLogin(): void {
     this.route.navigate(['/customer-login'])
   }
 
 }

