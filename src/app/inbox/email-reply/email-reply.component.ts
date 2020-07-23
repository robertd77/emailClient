import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: any;
  

  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: 'RE: ' + this.email.subject,
      text: `\n\n\n---------- ${this.email.from} wrote:\n> ${this.email.text.replace(/\n/gi, '\n> ')}`
    }
  }

  onSubmit(email: any) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
  

}
