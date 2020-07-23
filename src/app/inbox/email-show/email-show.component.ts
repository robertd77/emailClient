import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: any;

  constructor(private route: ActivatedRoute) { 
    this.email = route.snapshot.data.email;  
    this.route.data.subscribe(({ email }) => {
        this.email = email;
      })
    }

  ngOnInit(): void {
   
  }

}
