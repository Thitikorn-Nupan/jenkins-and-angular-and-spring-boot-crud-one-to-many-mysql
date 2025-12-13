import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dog} from "../entities/dog";
import {Response} from "../entities/response";

@Injectable({
  providedIn: 'root'
})
export class DogHttpService {

  private readonly baseDogEndpoint: string = environment.baseUrl+'/dog';

  constructor(private readonly httpClient: HttpClient) { }

  public getSelectAll() : Observable<Response<Dog[]>> {
    return this.httpClient.get<Response<Dog[]>>(this.baseDogEndpoint+'/selectAll')
  }

  public getInsertOne(dog:Dog) : Observable<Response<boolean>> {
    return this.httpClient.post<Response<boolean>>(this.baseDogEndpoint+'/insertOne',dog)
  }

  public getDeleteAll(did:number) : Observable<Response<boolean>> {
    return this.httpClient.delete<Response<boolean>>(this.baseDogEndpoint+'/deleteOne?pk='+did)
  }

}
