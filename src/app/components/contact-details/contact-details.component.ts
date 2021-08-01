import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  currentContact: Contact = {
    name: '',
    phone_number: '',
    published: false
  };
  message = '';

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getContact(this.route.snapshot.params.id);
  }

  getContact(id: string): void {
    this.contactService.get(id)
      .subscribe(
        data => {
          this.currentContact = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentContact.name,
      phone_number: this.currentContact.phone_number,
      published: status
    };

    this.message = '';

    this.contactService.update(this.currentContact.id, data)
      .subscribe(
        response => {
          this.currentContact.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateContact(): void {
    this.message = '';

    this.contactService.update(this.currentContact.id, this.currentContact)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This contact was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteContact(): void {
    this.contactService.delete(this.currentContact.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/contacts']);
        },
        error => {
          console.log(error);
        });
  }
}
