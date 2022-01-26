import { firestore } from "./firebase";

const getTimeline = async () => {
    var personinfo = '23_F_Frontend_developer'
    const snap = await firestore.collection('Timeline').doc(`${personinfo}`).get();
    //snap.docs.forEach((docs) => console.log(docs.data()));
    console.log(snap.data())
};



export {getTimeline}