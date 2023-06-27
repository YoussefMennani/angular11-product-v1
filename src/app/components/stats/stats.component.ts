import { ActionEvent } from './../../state/product.state';
import { EventDriverService } from './../../state/event.driver.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  counter=0;
  constructor(private eventDrivenService:EventDriverService){}

  ngOnInit():void{
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((event:ActionEvent)=>{
      console.log(" stats compnent detected !")
    this.counter++;
    })
  }
}
