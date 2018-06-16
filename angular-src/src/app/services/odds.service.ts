import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OddsService {
  environment: string;

  constructor(private http: Http) {

  }

  getMLBOdds(){
    var environment = 'Prod';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(environment = 'Dev'){
      return this.http.get('http://localhost:8080/odds/mlb')
        .map(res => res.json());
    } else {
      return this.http.get('odds/mlb')
        .map(res => res.json());
    }
  }

}
