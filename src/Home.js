import React, { useState } from "react";
import "./App.css";
import { useHistory } from "react-router";
import { db } from "./fbase";

const Home = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    return (
      year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-" + second
    );
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const emailObj = { email, createdAt: getToday() };
    console.log(emailObj);
    await db.collection("emails").add(emailObj);
    setEmail("");
    const ok = window.confirm(
      "신청해주셔서 감사합니다 🙂 상다미 커뮤니티가 출시되면 메일로 알려드리겠습니다."
    );
    if (ok) {
      history.go("/");
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
    console.log(email);
  };

  return (
    <div className="App">
      <h4> 안녕하세요 :) </h4>
      <div class="desc">커뮤니티에 대한 설명을 넣으세요</div>
      <form onSubmit={onSubmit}>
        <div class="email-input">
          <input
            type="email"
            placeholder="이메일"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input type="submit" value="작성완료" />
        </div>
      </form>
    </div>
  );
};

export default Home;
