import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { PeopleService } from 'src/app/shared/services/people.service';

@Component({
  selector: 'app-create-or-edit-person',
  templateUrl: './create-or-edit-person.component.html',
  styleUrls: ['./create-or-edit-person.component.scss'],
})
export class CreateOrEditPersonComponent implements OnInit {
  submitted: boolean = false;
  personForm: FormGroup = new FormGroup({});
  id: number | undefined;

  constructor(
    private activatedRout: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private peopleService: PeopleService
  ) {}

  // [TODO] Min and max validation for date of birth

  ngOnInit(): void {
    this.id = this.activatedRout.snapshot.params.id;

    this.personForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      dob: [null, Validators.required],
      country: [null, Validators.required],
      avatar: [null, Validators.required],
    });
    new Date();
    if (this.id)
      this.peopleService.getPerson(this.id).subscribe((res) => {
        this.personForm.patchValue({
          id: res.id,
          name: res.name,
          email: res.email,
          dob: !!res.dob ? new Date(res.dob) : null,
          country: res.country,
          avatar: res.avatar,
        });
      });
  }

  get f() {
    return this.personForm.controls;
  }

  get avatarURL() {
    return (this.personForm.value as Person)?.avatar;
  }

  onSubmit() {
    this.submitted = true;

    if (this.personForm.invalid) return;

    let result;
    if (this.id)
      result = this.peopleService.updatePerson(this.id, this.personForm.value);
    else result = this.peopleService.addPerson(this.personForm.value);

    result.subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }
}
