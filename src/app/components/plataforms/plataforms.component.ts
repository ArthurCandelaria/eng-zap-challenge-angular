import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plataforms',
  templateUrl: './plataforms.component.html',
  styleUrls: ['./plataforms.component.css']
})
export class PlataformsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  reciverFeedback(event: any) {
    localStorage.setItem('plataform', event);
    this.router.navigate(['/home'])
  }

}
