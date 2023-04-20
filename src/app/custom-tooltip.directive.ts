import { Directive } from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective {

  constructor() { }

  customTooltipPosition: String = 'top';

}