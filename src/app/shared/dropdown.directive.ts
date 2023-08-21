import { Directive, HostBinding, HostListener,ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    // Line 10-18 is the basic toggle of clicking on the dropdpwn itself as oppose to the code beneath it
    //  that allows you to click anywhere on the screen to close the dropdown
    // @HostBinding('class.open') isOpen = false;

    // constructor() {

    // }

    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // }


    @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}

}