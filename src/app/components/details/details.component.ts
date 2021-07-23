import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {

  immobleDetails: any;
  idRoute: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.immobleDetails = localStorage.getItem('immobleDetails');
    this.immobleDetails = JSON.parse(this.immobleDetails)

    this.idRoute = this.route.snapshot.paramMap.get('id');

    if (this.idRoute != this.immobleDetails.id) {
      this.router.navigate(['error']);
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelectorAll('.detailsImmoble img').forEach(element => {
        element.setAttribute("style", "height: 550px;");
      });
    }, 100);
  }

}
