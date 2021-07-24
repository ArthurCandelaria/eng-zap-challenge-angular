import { Component, OnInit } from '@angular/core';
import { GrupozapService } from '../../services/grupozap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  immobileList!: any;
  page = 1;
  isList: boolean;
  plataform: string;

  constructor(
    private grupozapService: GrupozapService
  ) {

    const currentPage = localStorage.getItem('page')

    if (currentPage !== undefined && currentPage !== null) {
      this.page = parseInt(currentPage);
    } else {
      this.page = 1
    }

    if (localStorage.getItem('plataform') === 'zap' || localStorage.getItem('isList') === null) {
      this.plataform = 'zap'
    } else {
      this.plataform = 'vivareal'
    }

    if (localStorage.getItem('isList') === 'true' || localStorage.getItem('isList') === null) {
      this.isList = true
    } else {
      this.isList = false
    }

  }

  ngOnInit(): void {
    this.getImmobles();
    this.blockButtom();
    this.imgFormater();
  }

  getImmobles() {
    this.grupozapService.immobileList().subscribe(
      success => {
        const res: any = success;
        if (this.plataform.toLocaleLowerCase() === 'zap') {
          const saleZap = res.filter((immobile: any) => immobile.pricingInfos.businessType === 'SALE' && immobile.pricingInfos.price >= 600000);
          const rentalZap = res.filter((immobile: any) => immobile.pricingInfos.businessType === 'RENTAL' && immobile.pricingInfos.rentalTotalPrice >= 3500);
          this.immobileList = [...saleZap, ...rentalZap];
        } else if (this.plataform.toLocaleLowerCase() === 'vivareal') {
          const saleVivareal = res.filter((immobile: any) => immobile.pricingInfos.businessType === 'SALE' && immobile.pricingInfos.price <= 700000);
          const rentalVivareal = res.filter((immobile: any) => immobile.pricingInfos.businessType === 'RENTAL' && immobile.pricingInfos.rentalTotalPrice <= 4000);
          this.immobileList = [...saleVivareal, ...rentalVivareal];
        }
      }, error => {
        // console.warn(error);
      }
    );
  }

  reciverFeedback(event: any) {
    localStorage.setItem('plataform', event);
  }

  blockButtom() {
    document.querySelector(`#logo-${this.plataform}`)?.classList.add('disabled');
  }

  changeView(value: boolean) {
    this.isList = value
    localStorage.setItem('isList', value.toString());
  }

  pageChanged(event: any) {
    localStorage.setItem('page', event.toString());
    this.imgFormater();
  }

  imgFormater() {
    setTimeout(() => {
      document.querySelectorAll('.cardImmoble img').forEach(element => {
        element.setAttribute("style", "height: 200px;");
      });
    }, 100);
  }

}
