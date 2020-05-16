import { Component, OnInit } from '@angular/core';
import {BannerService} from '../../../core/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(public bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerService.addBanner(
      {
        type: 'error',
        title: 'Shit, you fucked up!',
        text: 'Your account is now on the FBI watchlist.'
      });
    this.bannerService.addBanner(
      {
        type: 'success',
        title: 'Wonderful!',
        text: 'Your account has been verified!'
      });
    this.bannerService.addBanner(
      {
        type: 'info',
        title: 'Heads up!',
        text: 'You are now online, part of the global Magic: The gathering community!'
      });
    this.bannerService.addBanner(
      {
        type: 'warning',
        title: 'Hey you!',
        text: 'Yeah you, turn on you notification!'
      });
  }

  close() {

  }

}
