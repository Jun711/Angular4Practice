import { Component, OnInit } from '@angular/core';
import { Email } from '../model/email';
import { Phone } from '../model/phone';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  emails: Email[];
  phones: Phone[];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmails();
    this.getPhones();
  }

  onEditEmail(email: Email, idx: number) {
    this.router.navigate(['/contact-detail', idx]);
  }

  onEditPhone(phone: Phone, idx: number) {
    this.router.navigate(['/contact-detail', idx , { phone: true }]);
  }

  getEmails(): void {
    this.contactService.getEmails()
      .subscribe(emails => this.emails = emails);
  }

  getPhones(): void {
    this.contactService.getPhones()
      .subscribe(phones => this.phones = phones);
  }
}
