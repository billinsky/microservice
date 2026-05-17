import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="crud-container">
      <h2>Orders</h2>
      <button (click)="showCreate = true">Add Order</button>

      <div *ngIf="showCreate" class="modal">
        <h3>Create Order</h3>
        <input [(ngModel)]="newOrder.numero" placeholder="Numero">
        <input [(ngModel)]="newOrder.montant" type="number" placeholder="Montant">
        <input [(ngModel)]="newOrder.clientId" placeholder="Client ID">
        <button (click)="create()">Save</button>
        <button (click)="showCreate = false">Cancel</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Numero</th><th>Montant</th><th>Client</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{order.numero}}</td><td>{{order.montant}}</td>
            <td>{{order.client?.nom}} {{order.client?.prenom}}</td>
            <td>
              <button (click)="delete(order.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  showCreate = false;
  newOrder = { numero: '', montant: 0, clientId: '' };

  constructor(private orderService: OrderService) {}

  ngOnInit() { this.load(); }
  load() { this.orderService.getAll().subscribe(data => this.orders = data); }
  create() {
    this.orderService.create(this.newOrder).subscribe(() => {
      this.load();
      this.showCreate = false;
    });
  }
  delete(id: string) { this.orderService.delete(id).subscribe(() => this.load()); }
}
