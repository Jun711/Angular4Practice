import { Injectable } from '@angular/core';
import { Email } from '../model/email';
import { Phone } from '../model/phone';
import { EMAILS, PHONES } from '../mock-contacts';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ContactService {

  constructor() { }

  getEmails(): Observable<Email[]> {
    return of(EMAILS);
  }

  getPhones(): Observable<Phone[]> {
    return of(PHONES);
  }

  getEmail(id: number): Observable<Email> {
    return of(EMAILS[id]); // use array index because there is no deletion
  }

  getPhone(id: number): Observable<Phone> {
    return of(PHONES[id]); // use array index because there is no deletion
  }

  findEmail(email: String): boolean {
    let emailExist = EMAILS.find((emailItem) => {
      return emailItem.email === email;
    })

    return emailExist? true: false;
  }

  addEmail(email: string, id: number): Observable<boolean> {
    let emailExist = this.findEmail(email);

    if (emailExist) {
      return of(false);
    } else {
      if (id > -1) {
        EMAILS[id] = { email };
      } else {
        EMAILS.push({ email });
      }
      return of(true);
    }
  }

  findNumber(number: String): boolean {
    let numberExist = PHONES.find((phoneItem) => {
      return phoneItem.number === number;
    })

    return numberExist? true: false;
  }

  addPhone(phoneItem: Phone, id: number): Observable<boolean> {
    let phoneExist = this.findNumber(phoneItem.number);

    if (phoneExist) {
      return of(false);
    } else {
      if (id > -1) {
        PHONES[id] = phoneItem;
      } else {
        PHONES.push(phoneItem);
      }
      return of(true);
    }
  }
}
