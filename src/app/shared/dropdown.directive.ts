import { Directive, HostListener, HostBinding, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // My solution
  // open = false;
  // @HostListener('click', ['$event']) toggleOpen() {
  //   const action = this.open ? 'removeClass' : 'addClass';
  //   this.renderer[action](this.el.nativeElement, 'open');
  //   this.open = !this.open;
  // }

  // constructor(
  //   private el: ElementRef,
  //   private renderer: Renderer2
  // ) { }

  // Max's solution
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
