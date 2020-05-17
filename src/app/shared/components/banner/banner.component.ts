import {Component, OnInit} from '@angular/core';
import {Banner, BannerService} from '../../../core/services/banner.service';
import {combineLatest, merge, Observable} from 'rxjs';
import {delay, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  closing: boolean[] = [];

  constructor(public bannerService: BannerService) {
  }

  close(banner: Banner, index: number) {
    this.closing[index] = true;
    new Promise(resolve => setTimeout(resolve, 650)).then(x => {
      this.bannerService.closeBanner(banner, index);
      this.closing[index] = undefined;
    });
  }
}
