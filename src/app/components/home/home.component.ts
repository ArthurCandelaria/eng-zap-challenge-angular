import { Component, OnInit } from '@angular/core';
import { GrupozapService } from '../../services/grupozap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  immobileList!: any;
  paginaAtual = 1;

  constructor(
    private grupozapService: GrupozapService
  ) { }

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

}
