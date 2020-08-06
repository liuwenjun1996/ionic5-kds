import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DomController, NavController } from '@ionic/angular';
import { AppCache } from '../../app/app.cache';

/**
 * Generated class for the AbsoluteDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
    selector: '[absolute-drag]'
})

export class AbsoluteDragDirective {
    public isDown = false;
    public disX: number = 0; // 记录鼠标点击事件的位置 X
    public disY: number = 0; // 记录鼠标点击事件的位置 Y

    private offsetX: number = 0; // 记录总偏移量 X轴
    private offsetY: number = 0; // 记录总偏移量 Y轴
    constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController, public appCache: AppCache) {
    }

    ngAfterViewInit() {
        this.element.nativeElement.style.right = this.appCache.startRight + 'px';
        this.element.nativeElement.style.bottom = this.appCache.startBottom + 'px';
    }

    @HostListener('touchstart', ['$event']) ontouchstart(event) {
        this.isDown = true;
        this.offsetX = this.appCache.startRight;
        this.offsetY = this.appCache.startBottom;
        this.disX = event['targetTouches'][0].clientX;
        this.disY = event['targetTouches'][0].clientY;
        // console.log("touchstart");
    }

    @HostListener('touchmove', ['$event']) ontouchmove(event) {
        // 判断该元素是否被点击了。
        if (this.isDown) {
            this.appCache.startRight = this.offsetX + this.disX - event['targetTouches'][0].clientX;
            if (this.appCache.startRight < 0) {
                this.appCache.startRight = 0;
            }
            if (this.appCache.startRight + 56 > screen.availWidth) {
                this.appCache.startRight = screen.availWidth - 56;
            }
            this.element.nativeElement.style.right = this.appCache.startRight + 'px';
            this.appCache.startBottom = this.offsetY + this.disY - event['targetTouches'][0].clientY;
            if (this.appCache.startBottom < 0) {
                this.appCache.startBottom = 0;
            }
            if (this.appCache.startBottom + 230 > screen.availHeight) {
                this.appCache.startBottom = screen.availHeight - 230;
            }
            this.element.nativeElement.style.bottom = this.appCache.startBottom + 'px';
            // console.log("touchmove");
            return false;
        }
    }
    // 监听document离开事件
    @HostListener('touchend', ['$event']) ontouchend(event) {
        // 只用当元素移动过了，离开函数体才会触发。
        this.isDown = false;
        // console.log("touchend");
    }


    // ngAfterViewInit() {

    //     this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    //     this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    //     this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

    //     let hammer = new window['Hammer'](this.element.nativeElement);
    //     hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

    //     hammer.on('pan', (ev) => {
    //         this.handlePan(ev);
    //     });

    // }

    // handlePan(ev) {

    //     let newLeft = ev.center.x + this.startLeft;
    //     let newTop = ev.center.y + this.startTop;
    //     let height = document.body.clientHeight;
    //     let see_heiht = height - 200;

    //     this.domCtrl.write(() => {
    //         this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');

    //         if (newTop <= 50) {
    //             this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + '0px');
    //         }
    //         else if (newTop >= see_heiht) {
    //             this.renderer.setElementStyle(this.element.nativeElement, 'top', see_heiht + 'px');
    //         }
    //         else {
    //             this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    //         }

    //     });

    // }


    // public isDown = false;
    // public disX; // 记录鼠标点击事件的位置 X
    // public disY; // 记录鼠标点击事件的位置 Y

    // private totalOffsetX = 0; // 记录总偏移量 X轴
    // private totalOffsetY = 0; // 记录总偏移量 Y轴
    // constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {

    // }
    // @HostListener('mousedown', ['$event']) onMousedown(event) {
    //     this.isDown = true;
    //     this.disX = event.clientX;
    //     this.disY = event.clientY;
    // }
    // // 监听document移动事件事件
    // @HostListener('document:mousemove', ['$event']) onMousemove(event) {
    //     // 判断该元素是否被点击了。
    //     if (this.isDown) {
    //         this.element.nativeElement.style.left = this.totalOffsetX + event.clientX - this.disX + 'px';
    //         this.element.nativeElement.style.top = this.totalOffsetY + event.clientY - this.disY + 'px';
    //     }
    // }

    // // 监听document离开事件
    // @HostListener('document:mouseup', ['$event']) onMouseup(event) {
    //     // 只用当元素移动过了，离开函数体才会触发。
    //     if (this.isDown) {
    //         console.log('fail');
    //         this.totalOffsetX += event.clientX - this.disX;
    //         this.totalOffsetY += event.clientY - this.disY;
    //         this.isDown = false;
    //     }
    // }

    // ngOnInit() {
    //     this.element.nativeElement.style.position = 'relative';
    // }
}

