import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]',
})
export class AutofocusDirective {
    constructor(private elt: ElementRef<HTMLInputElement>) {}
    ngAfterViewInit(): void {
        this.elt.nativeElement.select();
    }
}
