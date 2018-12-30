import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() linkClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onLinkClick(link: HTMLElement) {
    this.linkClicked.emit(link.textContent);
  }

}
