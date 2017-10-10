import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetePage } from './compete';

@NgModule({
  declarations: [
    CompetePage,
  ],
  imports: [
    IonicPageModule.forChild(CompetePage),
  ],
})
export class CompetePageModule {}
