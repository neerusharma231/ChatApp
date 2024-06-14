import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() !== "" || img !== null) {
      console.log("Sending message:", text);

      if (data.chatId !== "" && data.chatId !== "null") {
        if (img != null && data.chatId !== "null") {
          const storageRef = ref(storage, uuid());
          uploadBytes(storageRef, img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: url,
                }),
              });
            });
          });
        } else if (text.trim() !== "" && data.chatId !== "null") {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        }
      } else {
        alert("No user selected");
      }

      setText("");
      setImg(null);
    }
  };

  const handleKeyDown = (e) =>{
    if(e.key ==="Enter") {
      handleSend();
    }
  }

  const handleAttachClick = () => {
    
    document.getElementById("file").click();
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="send">
        <img src={Attach} alt="" onClick={handleAttachClick} />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
