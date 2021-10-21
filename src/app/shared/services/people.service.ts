import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.remoteServiceBaseUrl;
  }

  getPersons(): Observable<Person[]> {
    return this.http
      .get(`${this.baseUrl}/people`)
      .pipe(map((p) => p as Person[]));
  }

  getPerson(personId: number): Observable<Person> {
    return this.http
      .get(`${this.baseUrl}/people/${personId}`)
      .pipe(map((p) => p as Person));
  }

  addPerson(person: Person) {
    return this.http.post(`${this.baseUrl}/people`, person);
  }

  updatePerson(personId: number, person: Person) {
    return this.http.patch(`${this.baseUrl}/people/${personId}`, person);
  }
}
