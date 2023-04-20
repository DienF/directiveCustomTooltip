import { ContentChild, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  @ContentChild('customTooltipContent')
  customTooltipContent!: ElementRef;

  @Input('customTooltipPosition')
  customTooltipPosition: string = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.customTooltipContent.nativeElement, "visibility", "visible");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.customTooltipContent.nativeElement, "visibility", "hidden");
  }

  ngAfterContentInit(): void {
    this.renderer.setStyle(this.customTooltipContent.nativeElement, "visibility", "hidden");
    if (this.customTooltipPosition == '') {
      let domRectDiv = this.el.nativeElement.getBoundingClientRect(),
          domRectTooltip = this.customTooltipContent.nativeElement.getBoundingClientRect();
      if (domRectDiv.y > domRectTooltip.height ) {
        this.customTooltipPosition = "top";
      } else {
        this.customTooltipPosition = "bottom";
      }
      if (domRectDiv.x > domRectTooltip.width ) {
        this.customTooltipPosition = "left";
      } else {
        this.customTooltipPosition = "right";
      }
    }
    switch (this.customTooltipPosition) {
      case "top":
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "left", "-5%");
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "top", "-20px");
        break;
      case "bottom":
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "left", "-5%");
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "bottom", "-20px");
        break;
      case "left":
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "left", "0%");
        break;
      case "right":
        this.renderer.setStyle(this.customTooltipContent.nativeElement, "right", "0%");
        break;
      default:
        break;
    }
  }
}