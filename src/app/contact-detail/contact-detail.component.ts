import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
import {
  INVALID_EMAIL,
  EMAIL_DATABASE,
  INVALID_PHONE,
  PHONE_DATABASE
} from '../constants';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  display: string = 'email';
  emailId: number = -1;
  phoneId: number = -1;
  editEmail: string = '';
  editNumber: string = '';
  editCarrier: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.processRouteParam();
  }

  onDisplayChange(display): void {
    this.clearErrorMsg();
    this.display = display;
  }

  processRouteParam(): void {
    const id = this.route.snapshot.paramMap.has('id')?
      +this.route.snapshot.paramMap.get('id'): -1;

    this.display = this.route.snapshot.paramMap.has('phone')? 'phone': 'email';

    if (id > -1) {
      if (this.display === 'email') {
        this.getEmail(id);
        this.emailId = id;
      } else {
        this.getPhone(id);
        this.phoneId = id;
      }
    }
  }

  getEmail(id: number): void {
    this.contactService.getEmail(id)
      .subscribe(emailItem => {
        this.editEmail = emailItem.email;
      });
  }

  getPhone(id: number): void {
    this.contactService.getPhone(id)
      .subscribe(phone => {
        this.editNumber = phone.number;
        this.editCarrier = phone.carrier;
      });
  }

  onSubmit(): void {
    this.clearErrorMsg();
    if (this.display === 'email') {
      if (this.editEmail.trim().length <= 0) {
        this.errorMessage = INVALID_EMAIL;
        return;
      }

      this.contactService.addEmail(this.editEmail, this.emailId)
        .subscribe(succ => {
          if (!succ) {
            this.errorMessage = EMAIL_DATABASE;
          } else {
            this.goBack();
          }
        });
    } else {
      if (this.editNumber.trim().length <= 0 || this.editCarrier.trim().length <= 0) {
        this.errorMessage = INVALID_PHONE;
        return;
      }

      let phoneToAdd = { number: this.editNumber, carrier: this.editCarrier };
      this.contactService.addPhone(phoneToAdd, this.phoneId)
        .subscribe(succ => {

          if (!succ) {
            this.errorMessage = PHONE_DATABASE;
          } else {
            this.goBack();
          }
        });
    }
  }

  clearErrorMsg(): void {
    this.errorMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}
