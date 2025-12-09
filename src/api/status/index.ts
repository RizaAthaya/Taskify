import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import type { ICreateStatus, IStatus, IUpdateStatus } from "./type";
import { db } from "../../libs/firebase";

// COLLECTION HELPERS
const getStatusesCollection = (userId: string) => collection(db, "users", userId, "statuses");
const getStatusDoc = (userId: string, statusId: string) =>
  doc(db, "users", userId, "statuses", statusId);

// CREATE
export const createStatus = async (userId: string, data: ICreateStatus) => {
  const statusesRef = getStatusesCollection(userId);
  const newStatusRef = doc(statusesRef);

  await setDoc(newStatusRef, {
    ...data,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newStatusRef.id;
};

// READ ALL STATUSES BY USER
export const getStatusesByUser = async (userId: string) => {
  const statusesRef = getStatusesCollection(userId);
  const q = query(statusesRef, orderBy("createdAt", "asc"));

  const snapshot = await getDocs(q);

  const statuses: IStatus[] = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<IStatus, "id">),
  }));

  return statuses;
};

// READ ONE STATUS BY ID
export const getStatusById = async (userId: string, statusId: string) => {
  const ref = getStatusDoc(userId, statusId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<IStatus, "id">),
  };
};

// UPDATE STATUS
export const updateStatus = async (userId: string, statusId: string, data: IUpdateStatus) => {
  const ref = getStatusDoc(userId, statusId);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return true;
};

// DELETE STATUS (WITHOUT TASKS)
export const deleteStatus = async (userId: string, statusId: string) => {
  const ref = getStatusDoc(userId, statusId);
  await deleteDoc(ref);
  return true;
};

// DELETE STATUS + ALL TASKS THAT USE ITS VALUE
export const deleteStatusAndTasks = async (userId: string, statusId: string) => {
  // Get status to know its value
  const statusRef = getStatusDoc(userId, statusId);
  const statusSnap = await getDoc(statusRef);
  if (!statusSnap.exists()) return true;

  const statusData = statusSnap.data() as Omit<IStatus, "id">;
  const statusValue = statusData.value;

  const tasksRef = collection(db, "users", userId, "tasks");
  const tasksQuery = query(tasksRef, where("status", "==", statusValue));
  const tasksSnap = await getDocs(tasksQuery);

  const batch = writeBatch(db);

  // delete tasks with this status
  tasksSnap.forEach((taskDoc) => {
    batch.delete(taskDoc.ref);
  });

  // delete the status itself
  batch.delete(statusRef);

  await batch.commit();

  return true;
};
