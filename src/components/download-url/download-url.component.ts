import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-download-url',
  templateUrl: './download-url.component.html',
  styleUrls: ['./download-url.component.sass']
})
  export class DownloadUrlComponent implements OnChanges {
  @Input() urlToDownload: string;
  public filename: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filename = this.urlToDownload.split('/').pop();
  }

}
