import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Tags } from './tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tags = new BehaviorSubject<string[]>([]);

  baseApiUrl: string = "https://localhost:7166";

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.baseApiUrl + '/api/tags');
  }

  addTags(newTags: Tags): Observable<Tags> {
    newTags.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Tags>(this.baseApiUrl + '/api/tags', newTags);
  }

  updateTags(id: string, tags: Tags): Observable<Tags> {
    return this.http.put<Tags>(this.baseApiUrl + '/api/tags/' + id, tags);
  }

  deleteTags(id: string): Observable<Tags> {
    return this.http.delete<Tags>(this.baseApiUrl + '/api/tags/' + id);
  }

}
