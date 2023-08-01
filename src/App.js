import React from "react";
import Avatar from "./assets/images/personal.jpg";

function App() {
  return (
    <React.Fragment>
      <header>
        <div className="header__container">
          <div className="header__logo"></div>
          <div className="header__right">
            <div className="header__avatar">
              <img src={Avatar} alt="Avatar" />
            </div>
          </div>
        </div>
      </header>
      <main></main>
    </React.Fragment>
  );
}

export default App;
