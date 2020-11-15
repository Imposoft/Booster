import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.view.html',
  styleUrls: ['./job-offer.view.sass']
})
export class JobOfferView implements OnInit {
  public pathId: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Recibimos el id del url de la web o en su defecto utilizamos uno por defecto
    this.route.params.subscribe( params => {
        if (params.id) {
          this.pathId = params.id;
        } else {
          this.pathId = 'NKUHb5YBHaCDQmSpWUFh';
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
