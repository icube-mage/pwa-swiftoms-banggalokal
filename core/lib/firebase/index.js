import firebase from 'firebase/app';
import { features } from '@config';

require('firebase/auth');
require('firebase/messaging');
require('firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = features.pushNotification.config;
const firebaseConfig = features.chatSystem.config;

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
