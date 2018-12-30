import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = 'Recipes';

  changePage(linkName: string) {
    this.page = linkName;
  }
}
