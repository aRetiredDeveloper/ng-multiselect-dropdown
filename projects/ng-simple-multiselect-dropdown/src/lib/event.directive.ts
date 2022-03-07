import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[eventClickOutside]'
})
export class EventClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public eventClickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.eventClickOutside.emit(event);
        }
    }
}