import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateOrEditPersonComponent } from './persons/create-or-edit-person/create-or-edit-person.component';
import { PersonsComponent } from './persons/persons.component';

const routes: Routes = [
  {
    path: '',
    component: PersonsComponent,
  },
  {
    path: 'create',
    component: CreateOrEditPersonComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOrEditPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
