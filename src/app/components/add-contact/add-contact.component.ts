import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: Contact = {
    name: '',
    phone_number: '',
    published: false
  };
  submitted = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  saveContact(): void {
    const data = {
      name: this.contact.name,
      phone_number: this.contact.phone_number
    };

    this.contactService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      name: '',
      phone_number: '',
      published: false
    };
  }
}
