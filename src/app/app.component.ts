import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedIn = false;

constructor(private authService: AuthService,
            private elementRef: ElementRef) {}

ngOnInit() {
  this.authService.signedIn$.subscribe((signedIn) => {
    this.signedIn = signedIn;
  })

  this.authService.checkAuth().subscribe(() => {
    
  });
}

ngAfterViewInit(){
  this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#c2b9ed';
}
}
