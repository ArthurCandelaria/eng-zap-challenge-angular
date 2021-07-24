import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  @Output() listener = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  feedback(event: any) {
    this.listener.emit(event)    
  }

}
