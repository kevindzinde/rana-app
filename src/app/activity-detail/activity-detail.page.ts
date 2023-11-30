import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Activity } from '../types';
import { Firestore } from '@angular/fire/firestore';

import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ModalController, ToastController } from '@ionic/angular';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;

  constructor(
    private _toastController: ToastController,
    private _angularFireStore:Firestore,
    private _modalController:ModalController,activityService:ActivityService,activatedRoute: ActivatedRoute) {
    const activityID= activatedRoute.snapshot.params["activityID"];
    console.log(activityID);
    this.activityDetail= activityService.getActivity(activityID);

   }

  ngOnInit() {
  }
  async openModal(){

const videoModal = await this._modalController.create({component:ActivityVideoPage});
return await this.activityDetail.subscribe(activityDetail =>{
  videoModal.componentProps={videoURL:activityDetail.video_url};
  return  videoModal.present();
});

  }
  addToFavorites(){
  // Add to favorites via firestore
  const toast = this._toastController.create({
    message:"The Activity was added "+ this.activityDetail+ "to your favorites",
    duration:3500,
    position:"top"
  });
  toast.then((toastMessage)=>toastMessage.present())
  }

}
