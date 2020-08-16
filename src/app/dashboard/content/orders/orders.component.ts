import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { OrdersService } from 'src/app/_services/db/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public isLoading = false;
  public orders;
  public cols = [{ value: "id", title: "id", visible: true },{value:"email",title:"Email",visible:true}];

  constructor(private utilService:UtilsService,private orderService:OrdersService) { }

  ngOnInit() {
    this.fetch();
  }


  async fetch() {
    this.isLoading = true;
    try {
      this.orders = await this.orderService.getOrders();
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to fetch the orders");
    }
    this.isLoading = false;
  }

}
