import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { BannerplanesComponent } from './bannerplanes/bannerplanes.component';
import { LoadingComponent } from './loading/loading.component';
import { BackbreadcumComponent } from './backbreadcum/backbreadcum.component';
import { Breadc2Component } from './breadc2/breadc2.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

// Pipes
//import { PipesModule } from '../pipes/pipes.module';





@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        BannerplanesComponent,
        LoadingComponent,
        BackbreadcumComponent,
        ProgressBarComponent,
        Breadc2Component
    ],
    exports: [
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        BannerplanesComponent,
        LoadingComponent,
        BackbreadcumComponent,
        Breadc2Component
    ]
})

export class SharedModule {}
