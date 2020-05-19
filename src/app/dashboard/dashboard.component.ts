import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { isProtractorLocator } from 'protractor/built/locators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
interface IPort {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  ports: IPort[];
  btnSendTitle = 'Ligar';
  messageErro: string;
  @ViewChild('optPort') optPort: ElementRef;
  
  private  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getPort();
  }

  getPort() {
    // this.ports = [
    //   { name: 'COM9'}, { name: 'COM10'}, { name: 'COM11'}
    // ];
    // console.log('pesquisar');
    this.ports = undefined;
    this.http.get<IPort[]>('https://localhost:5001/port').pipe()
      .subscribe((result) => {
        this.ports = result;
      },
      (err) => this.messageErro = err.message);
  }
  sendPort(){
    console.log('enviado', this.optPort.nativeElement);
    this.http.post(`https://localhost:5001/port/SendPort?portName=${this.optPort.nativeElement.value}`, this.httpOptions).pipe()
    .subscribe((result) => {
     console.log('resultado', result);
     this.getButtonTitle();
    },
    (err) => this.messageErro = err);
  }
  private getButtonTitle() {
    this.btnSendTitle = this.btnSendTitle === 'Ligar' ? 'Desligar' : 'Ligar';
  }
}
