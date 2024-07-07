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

const updateAnnouncement = (id, message) => {
  const ref = doc(db, "Announcements", id);

  return updateDoc(ref, { announcement: message });
};

const deleteAnnouncement = (id) => {
  return deleteDoc(doc(db, "Announcements", id));
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

const getFeedbacks = () => {
  const ref = collection(db, "Feedbacks");

  return query(ref, orderBy("postedAt", "asc"));
};

const deleteFeedback = (id) => {
  return deleteDoc(doc(db, "Feedbacks", id));
};

export {
  getUser,
  addAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  onSnapshot,
  addSchedule,
  getSchedules,
  getFeedbacks,
  deleteSchedule,
  deleteFeedback,
};
