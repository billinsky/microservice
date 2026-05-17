import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="crud-container">
      <h2>Clients</h2>
      <button (click)="showCreate = true">Add Client</button>

      <div *ngIf="showCreate" class="modal">
        <h3>Create Client</h3>
        <input [(ngModel)]="newClient.nom" placeholder="Nom">
        <input [(ngModel)]="newClient.prenom" placeholder="Prenom">
        <input [(ngModel)]="newClient.telephone" placeholder="Telephone">
        <input [(ngModel)]="newClient.email" placeholder="Email">
        <button (click)="create()">Save</button>
        <button (click)="showCreate = false">Cancel</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Prenom</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let client of clients">
            <td>{{client.nom}}</td><td>{{client.prenom}}</td><td>{{client.email}}</td>
            <td>
              <button (click)="delete(client.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  showCreate = false;
  newClient = { nom: '', prenom: '', telephone: '', email: '' };

  constructor(private clientService: ClientService) {}

  ngOnInit() { this.load(); }
  load() { this.clientService.getAll().subscribe(data => this.clients = data); }
  create() {
    this.clientService.create(this.newClient).subscribe(() => {
      this.load();
      this.showCreate = false;
    });
  }
  delete(id: string) { this.clientService.delete(id).subscribe(() => this.load()); }
}
