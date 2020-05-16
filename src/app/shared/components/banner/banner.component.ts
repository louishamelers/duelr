import { Component, OnInit } from '@angular/core';
import {BannerService} from '../../../core/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  constructor(public bannerService: BannerService) { }

}
