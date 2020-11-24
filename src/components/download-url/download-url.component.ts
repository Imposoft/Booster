import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-download-url',
  templateUrl: './download-url.component.html',
  styleUrls: ['./download-url.component.sass']
})
  export class DownloadUrlComponent implements OnChanges {
  @Input() urlToDownload: string;
  public filename: string;
  public finalUrl: any;

  constructor(public storage: AngularFireStorage) {  }

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
