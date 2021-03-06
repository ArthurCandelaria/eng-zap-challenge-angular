import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() cardImmoble: any;
  @Input() indexList: any;
  @Input() isList: any;

  constructor() { }

  ngOnInit(): void {
  }

  getImmoble(immoble: any) {
    localStorage.setItem('immobleDetails', JSON.stringify(immoble));
  }

}
