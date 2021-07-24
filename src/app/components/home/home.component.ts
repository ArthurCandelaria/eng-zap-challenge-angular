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
  boundingBox = [
    { 'minlon': -46.693419 },
    { 'minlat': -23.568704 },
    { 'maxlon': -46.641146 },
    { 'maxlat': -23.546686 }
  ]

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
  }

  getImmobles() {
    this.grupozapService.immobileList().subscribe(
      success => {

        const res: any = success;

        if (localStorage.getItem('plataform') === 'zap') {
          const saleZap = res.filter((immobile: any) => {
            return immobile.pricingInfos.businessType === 'SALE'
              && immobile.pricingInfos.price >= 600000
              && immobile.address.geoLocation.location.lat != 0
              && immobile.address.geoLocation.location.lon != 0
              && immobile.usableAreas > 0
              && (immobile.pricingInfos.price / immobile.pricingInfos.price) > 3500
          });
          const saleZap2 = saleZap.filter((immobile: any) => {
            return immobile.address.geoLocation.location.lon >= this.boundingBox[0] 
            && immobile.address.geoLocation.location.lon <= this.boundingBox[2]
            && immobile.address.geoLocation.location.lat >= this.boundingBox[1] 
            && immobile.address.geoLocation.location.lat <= this.boundingBox[3]
            && (immobile.pricingInfos.price / immobile.pricingInfos.price) > 3850
          });

          const rentalZap = res.filter((immobile: any) => {
            return immobile.pricingInfos.businessType === 'RENTAL'
              && immobile.pricingInfos.rentalTotalPrice >= 3500
              && immobile.address.geoLocation.location.lat != 0
              && immobile.address.geoLocation.location.lon != 0
          });

          this.immobileList = [...saleZap2, ...rentalZap];

        } else if (localStorage.getItem('plataform') === 'vivareal') {
          const saleVivareal = res.filter((immobile: any) => {
            return immobile.pricingInfos.businessType === 'SALE'
              && immobile.pricingInfos.price <= 700000
              && immobile.address.geoLocation.location.lat != 0
              && immobile.address.geoLocation.location.lon != 0
          });
          const rentalVivareal = res.filter((immobile: any) => {
            return immobile.pricingInfos.businessType === 'RENTAL'
              && immobile.pricingInfos.rentalTotalPrice <= 4000
              && immobile.address.geoLocation.location.lat != 0
              && immobile.address.geoLocation.location.lon != 0
              && immobile.pricingInfos.monthlyCondoFee != 0
              && immobile.pricingInfos.monthlyCondoFee != ''
              && (immobile.pricingInfos.monthlyCondoFee < (immobile.pricingInfos.rentalTotalPrice * 0.3))
          });

          const rentalVivareal2 = rentalVivareal.filter((immobile: any) => {
            return immobile.address.geoLocation.location.lon >= this.boundingBox[0] 
            && immobile.address.geoLocation.location.lon <= this.boundingBox[2]
            && immobile.address.geoLocation.location.lat >= this.boundingBox[1] 
            && immobile.address.geoLocation.location.lat <= this.boundingBox[3]
            && (immobile.pricingInfos.monthlyCondoFee < (immobile.pricingInfos.rentalTotalPrice * 0.5))
          });

          this.immobileList = [...saleVivareal, ...rentalVivareal2];
        }
      }, error => {
        // console.warn(error);
      }
    );

    this.blockButtom();
    this.imgFormater();

  }

  reciverFeedback(event: any) {
    localStorage.setItem('plataform', event);
    this.page = 1
    this.immobileList = [];
    this.getImmobles();
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
