import {
  doc,
  collection,
  setDoc,
  addDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";
import { db } from "../../firebase";

const getUser = (userId) => {
  return getDoc(doc(db, "Users", userId));
};

const addAnnouncement = (message) => {
  return setDoc(doc(collection(db, "Announcements")), {
    announcement: message,
    postedAt: Timestamp.now(),
  });
};

const addSchedule = (form) => {
  var sched = form;
  sched["addedAt"] = Timestamp.now();
  return setDoc(doc(collection(db, "Schedules")), sched);
};

const deleteSchedule = (scheds) => {
  return runTransaction(db, async (transaction) => {
    scheds.map(async (item) => {
      const ref = doc(db, "Schedules", item);

      transaction.delete(ref);
    });
  });
};

const getAnnouncements = () => {
  const ref = collection(db, "Announcements");

  return ref;
};

const getSchedules = () => {
  const ref = collection(db, "Schedules");

  return query(ref, orderBy("addedAt", "asc"));
};

export {
  getUser,
  addAnnouncement,
  getAnnouncements,
  onSnapshot,
  addSchedule,
  getSchedules,
  deleteSchedule,
};
