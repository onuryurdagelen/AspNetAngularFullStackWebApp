import { Component } from '@angular/core';

// @Component ==> c#'ta [Component] yani attribute'tur.İmzasını veriririz.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
//AppComponent'in bir Component olduğunu belirtiyoruz.
export class AppComponent {
  title: string = 'northwindFE';
  user: string = 'Onur Yurdagelen';
  
}
