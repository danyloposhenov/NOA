import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from './vacancies.component';
import { SharedModule } from '../../shared/shared.module';
import { VacanciesRoutingModule } from './vacancies-routing.module';


@NgModule({
  declarations: [
    VacanciesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VacanciesRoutingModule
  ]
})
export class VacanciesModule { }
