import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query } from '@angular/fire/firestore';
import { Tasks } from '../domain/Tasks';
import { users } from '../domain/users';




@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private firestore: Firestore){}

  addTask(task: Tasks){
    addDoc(collection(this.firestore, 'tareas'),Object.assign({},task))
  }

  getTasks(){
    return getDocs(query(collection(this.firestore, 'tareas')))
  }

  deleteTasks(taskId: string) {
    return deleteDoc(doc(this.firestore, 'tareas', taskId))
  }

  addTask1(us: users){
    addDoc(collection(this.firestore, 'users'),Object.assign({},us))
  }

  getTasks1(){
    return getDocs(query(collection(this.firestore, 'users')))
  }
  deleteTasks1(usid: string) {
    return deleteDoc(doc(this.firestore, 'users', usid))
  }
}
