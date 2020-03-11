 //---------------------------------------------------------------------
        // Your web app's Firebase configuration (9 lines of code)
        // Replace the configuration with YOUR project's API information
        // copied from the firebase console (settings) of your project.
        //---------------------------------------------------------------------
        var firebaseConfig = {
          apiKey: "AIzaSyA8Jic6dgBKQNaqsHuW4EBt4KySf1afaP0",
          authDomain: "helloworld-6e913.firebaseapp.com",
          databaseURL: "https://helloworld-6e913.firebaseio.com",
          projectId: "helloworld-6e913",
          storageBucket: "helloworld-6e913.appspot.com",
          messagingSenderId: "313537133379",
          appId: "1:313537133379:web:87e39f4ccb9422d0e68df6",
          measurementId: "G-W5146XQT0H"
        };
        //------------------------------------------------
        // Initialize Firebase and Firestore reference
        // Do not delete!
        //------------------------------------------------
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();