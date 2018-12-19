import {Component, ViewChild} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts;
  images;
  image = null;
  @ViewChild('myImage') myImage;
  uploadError = "";

  constructor(private db: AngularFirestore, private storage: AngularFireStorage,) {
    this.images = {};
    this.db.collection('posts', ref => ref.limit(10)).snapshotChanges().subscribe((next) => {
      this.images = {};
      this.posts = [];

      next.forEach(post => {

        let obj = post.payload.doc.data();
        obj["id"] = post.payload.doc.id;
        this.posts.push(obj);

        this.loadImage(post.payload.doc.id);
      })
    })
  }

  imageChanged(event) {
    if (!event.target.files.length) {
      this.image = null;
      return;
    }

    let reader = new FileReader();
    this.image = event.target.files[0];

    reader.onload = (e) => {
      this.myImage.nativeElement.src = e.target["result"];
    };
    reader.readAsDataURL(event.target.files[0]);

    let filesize = ((this.image.size / 1024) / 1024); // MB
    if (filesize > 2)
      this.uploadError = `File too large, max size is 2 MB but yours is ${Number(filesize).toFixed(2)} MB.`;
    else
      this.uploadError = "";
  }

  submit() {
    let now = new Date();
    let nowUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));

    this.db.collection(`posts/`).add({timestamp: nowUtc}).then(docRef => {
      this.storage.upload(`posts/${docRef.id}`, this.image).then(() => {
        this.myImage.nativeElement.src = "#";
      });

    }, err => {
      console.error(err);
    });
  }

  loadImage(post) {
    const ref = this.storage.ref(`posts/${post}`);
    ref.getMetadata().toPromise().then(data => {
      this.images[post] = ref.getDownloadURL();
    }, err => {
      console.error(err);
    });
  }
}