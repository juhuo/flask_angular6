import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartjsComponent }      from './chartjs/chartjs.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/week', pathMatch: 'full' },
  { path: 'week', component: ChartjsComponent },
  { path: 'month', component: DashboardComponent },
  { path: 'month/:id', component: DashboardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {}
