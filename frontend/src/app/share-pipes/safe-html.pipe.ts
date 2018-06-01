import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

    constructor(private domSanitized: DomSanitizer){}

  transform(value: any, args?: any): any {
    return this.domSanitized.bypassSecurityTrustHtml(value);
  }

}
