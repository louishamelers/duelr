import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {

  constructor(private http: HttpClient) { }

  findCards(name: string): Observable<string[]> {
    return this.http.get<any>(`${environment.scryfallConfig.base}/cards/autocomplete?q=${name}`).pipe(
      map( results => {
      return results.data as string[];
    }));
  }
}
