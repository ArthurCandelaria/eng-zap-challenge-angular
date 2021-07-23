import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GrupozapService } from '../../services/grupozap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  immobileList!: any;
  page = 1;
  isList: boolean;

  constructor(
    private grupozapService: GrupozapService
  ) {
    if (localStorage.getItem('isList') === 'true' || localStorage.getItem('isList') === null) {
      this.isList = true
    } else {
      this.isList = false
    }
  }

  ngOnInit(): void {

    this.grupozapService.immobileList().subscribe(
      success => {
        console.log(success);
        this.immobileList = success
      }, error => {
        console.log(error);
      }
    );

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelectorAll('.cardImmoble img').forEach(element => {
        element.setAttribute("style", "height: 200px;");
        console.log(element)
      });
    }, 100);
  }

  changeView(value: boolean) {
    this.isList = value
    localStorage.setItem('isList', value.toString());
  }

  pageChanged(event: any) {
    localStorage.setItem('page', event.toString());
  }

}
