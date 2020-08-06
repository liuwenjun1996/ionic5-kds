import { NgModule } from '@angular/core';
import { AbsoluteDragDirective } from './absolute-drag/absolute-drag';
import { OnlyNumberDirective } from './only-number/only-number';
import { AposPermissionDirective } from './permission/apos-permission';
import { BgColorDirective } from './bg-color/bg-color';
import { ZColorDirective } from './z-color/z-color';
import { ZWidthDirective } from './z-width/z-width';
import { StopPropagationDirective } from './stop-propagation/stop-propagation';
import { DisabledButtonDirective } from './disabled-button/disabled-button';
import { ImgErrorDirective } from './img-error/img-error';
import { SxylightDirective } from './sxylight/sxylight';
import { SxyunlessDirective } from './sxyunless/sxyunless';

// import { AbsoluteDragDirective } from '../directives/absolute-drag/absolute-drag';

@NgModule({
    declarations: [AbsoluteDragDirective, OnlyNumberDirective,
        AposPermissionDirective,
        SxylightDirective,
        SxyunlessDirective,
        BgColorDirective,
        BgColorDirective,
        ZColorDirective,
        ZWidthDirective,
        StopPropagationDirective,
        DisabledButtonDirective,
        ImgErrorDirective
    ],
    imports: [],
    exports: [AbsoluteDragDirective, OnlyNumberDirective,
        AposPermissionDirective,
        SxylightDirective,
        SxyunlessDirective,
        BgColorDirective,
        BgColorDirective,
        ZColorDirective,
        ZWidthDirective,
        StopPropagationDirective,
        DisabledButtonDirective,
        ImgErrorDirective]
})
export class DirectivesModule { }
