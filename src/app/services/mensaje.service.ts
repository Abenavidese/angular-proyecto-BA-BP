import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query } from '@angular/fire/firestore';
import { Tasks } from '../domain/Tasks';




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
}
