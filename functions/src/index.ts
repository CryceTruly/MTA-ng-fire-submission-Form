import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

exports.sendEmailFunction=functions.firestore.document("formsubmissions")
  .onCreate((snap,ctx)=>{
const formData=snap.data();
console.log(formData)
  })
