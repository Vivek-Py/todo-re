import "./App.css";
import { useState, useEffect } from "react";
import firebase from "firebase";
import fire from "./Connect";
import TaskList from "./TaskList";
import Auth from "./Auth";

const db = fire.firestore();

function App() {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [Task, setTask] = useState([]);
  const [Input, setInput] = useState("");

  var Check = "Incomplete";


  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const hadnleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const hadnleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  });

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTask(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            status: doc.data().status,
          }))
        );
      });
  }, []);

  function addTask() {
    db.collection("todos").add({
      todo: Input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: Check,
    });
    setInput("");
  }

  return (
    <div>

      {
        user ? (

          <div className="main-container base">
        <header className="app-header base">Simply Todo</header>

        <div className="input-div base">
          <input
            id="inputbox"
            className="input-box"
            type="text"
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" disabled={!Input} onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="task-container base">
          {Task.map((todo) => (
            <TaskList name={todo} />
          ))}
        </div>
      </div>

        ) : (
          <Auth 
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        hadnleLogin = {hadnleLogin}
        handleLogout = {handleLogout}
        hasAccount = {hasAccount}
        setHasAccount = {setHasAccount}
        emailError = {emailError}
        passwordError = {passwordError}
        hadnleSignup = {hadnleSignup}
      />
        )
      }

    </div>
  );
}

export default App;
