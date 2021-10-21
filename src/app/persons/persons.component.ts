import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/models/person';
import { PeopleService } from '../shared/services/people.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnInit {
  constructor(private peopleService: PeopleService) {}
  people: Person[] = [];
  ngOnInit(): void {
    this.peopleService.getPersons().subscribe((res) => (this.people = res));
  }
}
