import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../entities/response";
import {Breed} from "../entities/breed";

@Injectable({
  providedIn: 'root'
})
export class BreedHttpService {

  private readonly baseBreedEndpoint: string = environment.baseUrl+'/breed';

  constructor(private readonly httpClient: HttpClient) { }

  public getSelectOne(bid:number) : Observable<Response<Breed>> {
    return this.httpClient.get<Response<Breed>>(this.baseBreedEndpoint+'/selectOne?pk='+bid)
  }

}
