import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Banner {
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  text: string;
  icon?: string;
  onClose?: () => void;
  onClick?: (index: number) => void;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor() {
  }

  private banners$: BehaviorSubject<Banner[]> = new BehaviorSubject<Banner[]>([]);
  private banners: Banner[] = [];

  get _banners() {
    return this.banners$.asObservable();
  }

  addBanner(banner: Banner) {
    if (banner.icon === undefined) {
      switch (banner.type) {
        case 'error':
          banner.icon = 'priority_high';
          break;
        case 'success':
          banner.icon = 'verified_user';
          break;
        case 'warning':
          banner.icon = 'notification_important';
          break;
        default:
          banner.icon = 'public';
      }
    }
    this.banners.push(banner);
    this.banners$.next(this.banners);
  }

  closeBanner(banner: Banner, index: number) {
    try {banner.onClose(); } catch (e) {}
    this.banners.splice(index, 1);
    this.banners$.next(this.banners);
  }
}
