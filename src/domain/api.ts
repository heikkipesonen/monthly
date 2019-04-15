import { initializeApp } from 'firebase'

const config = {
  apiKey: "AIzaSyCUn84CifU6Dt31BUkBTnqoNWx5IrT-kuY",
  authDomain: "noita-dcdff.firebaseapp.com",
  databaseURL: "https://noita-dcdff.firebaseio.com",
  projectId: "noita-dcdff",
  storageBucket: "noita-dcdff.appspot.com",
  messagingSenderId: "208431019801"
}

export const api = initializeApp(config)