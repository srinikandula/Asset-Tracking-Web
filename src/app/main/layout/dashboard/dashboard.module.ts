import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
// import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
// import {SlickCarouselModule} from 'ngx-slick-carousel';
// import {PipesDirectivesModule} from '../pipes-directives/pipes-directives.module';


@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgSelectModule,
        FormsModule,
        // BsDatepickerModule,
        // SlickCarouselModule,
        // PipesDirectivesModule
    ],
})
export class DashboardModule {
}
