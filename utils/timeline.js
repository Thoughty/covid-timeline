import { firestore } from "./firebase";

const getTimeline = async () => {
    const snap = await firestore.collection('Timeline').get();
    snap.docs.forEach((docs) => console.log(docs.data()));
};



export {getTimeline}