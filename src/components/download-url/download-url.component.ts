import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-download-url',
  templateUrl: './download-url.component.html',
  styleUrls: ['./download-url.component.sass']
})
  export class DownloadUrlComponent implements OnChanges {
  @Input() urlToDownload: string;
  public filename: string;
  public finalUrl: any;

  public loggedId: string;

  constructor(public storage: AngularFireStorage, public afAuth: AngularFireAuth) {
    this.loggedId = '';
    // Si hemos iniciado sesion, loggedId sera nuestro id
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.loggedId = user.uid;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ref = this.storage.ref(this.urlToDownload);
    this.finalUrl = ref.getDownloadURL();
    this.filename = this.urlToDownload.split('/').pop();
  }

  download(): any {
    const ref = this.storage.ref(this.urlToDownload);
    this.finalUrl = ref.getDownloadURL().subscribe(url => {
      console.log(url);
      const win = window.open(url, '_blank');
      win.focus();
    });
  }
}
