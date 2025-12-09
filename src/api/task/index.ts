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
} from "firebase/firestore";

import type { ICreateTask, IUpdateTask, ITask } from "./type";
import { db } from "../../libs/firebase";

// CREATE
export const createTask = async (userId: string, data: ICreateTask) => {
  const tasksRef = collection(db, "users", userId, "tasks");
  const newTaskRef = doc(tasksRef);

  await setDoc(newTaskRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newTaskRef.id;
};

// READ ALL TASKS BY USER
export const getTasksByUser = async (userId: string) => {
  const tasksRef = collection(db, "users", userId, "tasks");
  const q = query(tasksRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  const tasks: ITask[] = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ITask, "id">),
  }));

  return tasks;
};

// READ ONE TASK BY ID
export const getTaskById = async (userId: string, taskId: string) => {
  const ref = doc(db, "users", userId, "tasks", taskId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<ITask, "id">),
  };
};

// UPDATE TASK
export const updateTask = async (userId: string, taskId: string, data: IUpdateTask) => {
  const ref = doc(db, "users", userId, "tasks", taskId);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return true;
};

// DELETE TASK
export const deleteTask = async (userId: string, taskId: string) => {
  const ref = doc(db, "users", userId, "tasks", taskId);
  await deleteDoc(ref);
  return true;
};
