import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'overview', component: OverviewComponent, data: { title: extract('Overview') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OverviewRoutingModule {}
