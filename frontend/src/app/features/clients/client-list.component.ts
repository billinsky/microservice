import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <h2>Client Management</h2>
      <button class="btn btn-primary" (click)="openCreate()">+ Add Client</button>
    </div>

    <div *ngIf="showForm" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEdit ? 'Edit Client' : 'Create Client' }}</h3>
        <div class="form-group">
          <label>Nom</label>
          <input [(ngModel)]="currentClient.nom" placeholder="Nom">
        </div>
        <div class="form-group">
          <label>Prenom</label>
          <input [(ngModel)]="currentClient.prenom" placeholder="Prenom">
        </div>
        <div class="form-group">
          <label>Telephone</label>
          <input [(ngModel)]="currentClient.telephone" placeholder="Telephone">
        </div>
        <div class="form-group">
          <label>Address</label>
          <input [(ngModel)]="currentClient.adresse" placeholder="Address">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input [(ngModel)]="currentClient.email" placeholder="Email">
        </div>
        <div class="modal-actions">
          <button class="btn btn-success" (click)="save()">Save</button>
          <button class="btn btn-secondary" (click)="closeForm()">Cancel</button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let client of clients">
            <td>{{client.nom}}</td>
            <td>{{client.prenom}}</td>
            <td>{{client.telephone}}</td>
            <td>{{client.email}}</td>
            <td>{{client.adresse}}</td>
            <td class="actions">
              <button class="btn btn-sm btn-info" (click)="openEdit(client)">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="delete(client.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; color: #333; font-weight: 600; }
    tr:hover { background-color: #f1f1f1; }
    .actions { display: flex; gap: 5px; }

    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);
                     display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 8px; width: 400px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
    .form-group input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }

    .btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; transition: background 0.2s; }
    .btn-sm { padding: 4px 8px; font-size: 12px; }
    .btn-primary { background: #007bff; color: white; }
    .btn-primary:hover { background: #0056b3; }
    .btn-success { background: #28a745; color: white; }
    .btn-success:hover { background: #218838; }
    .btn-info { background: #17a2b8; color: white; }
    .btn-info:hover { background: #138496; }
    .btn-danger { background: #dc3545; color: white; }
    .btn-danger:hover { background: #c82333; }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-secondary:hover { background: #5a6268; }
  `]
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  showForm = false;
  isEdit = false;
  currentClient: any = {};

  constructor(private clientService: ClientService) {}

  ngOnInit() { this.load(); }
  load() {
    this.clientService.getAll().subscribe({
        next: (data) => this.clients = data,
        error: () => this.clients = [] // Fallback to empty if error
    });
  }

  openCreate() {
    this.isEdit = false;
    this.currentClient = { nom: '', prenom: '', telephone: '', email: '', adresse: '' };
    this.showForm = true;
  }

  openEdit(client: any) {
    this.isEdit = true;
    this.currentClient = { ...client };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  save() {
    if (this.isEdit) {
      this.clientService.update(this.currentClient.id, this.currentClient).subscribe(() => {
        this.load();
        this.showForm = false;
      });
    } else {
      this.clientService.create(this.currentClient).subscribe(() => {
        this.load();
        this.showForm = false;
      });
    }
  }

  delete(id: string) {
    if(confirm('Are you sure you want to delete this client?')) {
        this.clientService.delete(id).subscribe(() => this.load());
    }
  }
}
