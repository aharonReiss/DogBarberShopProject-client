import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { QueuemanagementService } from 'src/app/shared/queuemanagement.service';

@Component({
  selector: 'app-queue-detail-screen',
  templateUrl: './queue-detail-screen.component.html',
  styleUrls: ['./queue-detail-screen.component.css']
})
export class QueueDetailScreenComponent implements OnInit {

  displayNonePopUp = false
  QueueDetail:any
  NewQueueTime:any
  user:any
  isUpdateSituation = false

  constructor(private queuemanagement:QueuemanagementService,private router:Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.userSubject.subscribe(
      result => {
        this.user = result
        console.log(this.user.userId)
      }
    )
    this.queuemanagement.GetQueueDetailSub$.subscribe(
      result => {
        this.displayNonePopUp = true
        this.QueueDetail = result
        console.log(result)
      }
    )
  }

  onDeleteItem(){
    this.queuemanagement.deleteItem(this.QueueDetail.id).subscribe(
      result => {
        this.displayNonePopUp = false
        window.location.reload()
      }
    )
  }

  onUpdateItem(){
    console.log(this.NewQueueTime)
    this.queuemanagement.updateItem(this.QueueDetail.id,this.NewQueueTime).subscribe(
      result => {
        this.displayNonePopUp = false
        window.location.reload()
      }
    )
  }
}
