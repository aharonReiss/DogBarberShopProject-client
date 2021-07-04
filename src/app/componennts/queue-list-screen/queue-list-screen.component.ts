import { Component, OnInit } from '@angular/core';
import { QueuemanagementService } from 'src/app/shared/queuemanagement.service';

@Component({
  selector: 'app-queue-list-screen',
  templateUrl: './queue-list-screen.component.html',
  styleUrls: ['./queue-list-screen.component.css']
})
export class QueueListScreenComponent implements OnInit {

  constructor(private queuemanagement:QueuemanagementService) { }
  que:any
  disending = false
  NewQueueTime:any
  displayNonePopUp = false

  ngOnInit(): void {
    this.queuemanagement.getQue().subscribe(
      result => {
        this.que = result
         this.que.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1)
      }
    )
    
  }

  onClickItem(item:any){
    console.log(item)
    this.queuemanagement.QueueDetails(item)
  }

  onSortArray(fieald:any){
    if(fieald == 'queueTime')
      this.que.sort((a:any, b:any) => this.disending ? (new Date(a.fieald) > new Date(b.fieald)) ? 1 : -1 : (new Date(a.fieald) > new Date(b.fieald)) ? -1 : 1 )
    else
      this.que.sort((a:any, b:any) => this.disending ? (a.fieald > b.fieald) ? 1 : -1 : (a.fieald > b.fieald) ? -1 : 1 )
    this.disending = !this.disending
  }

  onAddItem(){
    this.queuemanagement.addItem(this.NewQueueTime).subscribe(
      result => {
        console.log(result)
        this.displayNonePopUp = false
      }
    )
  }

}
