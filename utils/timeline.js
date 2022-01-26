import { firestore } from "./firebase";

const getTimeline = async () => {
    var personinfo = '23_F_Frontend_developer'
    const snap = await firestore.collection('Timeline').doc(`${personinfo}`).collection('UserTimeline').get();
    snap.docs.forEach((docs) => console.log(docs.data()));
};



export {getTimeline}