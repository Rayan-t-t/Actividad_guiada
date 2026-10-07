import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts';

@Injectable({
providedIn: 'root'
})
export class StoreService {
// Utilizamos inyección de dependencias moderna en Angular
private http = inject(HttpClient);
private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
getStoreProducts(): Observable<Posts[]> {
return this.http.get<Posts[]>(this.apiUrl);
}
}
