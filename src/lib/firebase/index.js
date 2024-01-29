import firebase from 'firebase/app';
import { features } from '@config';
import { getAppEnv } from '@helpers/env';

require('firebase/auth');
require('firebase/messaging');
require('firebase/firestore');

const { firebaseConfig } = features;
const appEnv = getAppEnv();

export const googleProviderId = firebase.auth.GoogleAuthProvider.PROVIDER_ID;

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig[appEnv] ? firebaseConfig[appEnv] : firebaseConfig.prod) : firebase.app();
