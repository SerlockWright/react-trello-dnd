import React from "react";
import Avatar from "./assets/images/personal.jpg";
import { Button, Card, Popconfirm, Tooltip } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TrelloCard from "./components/TrelloCard";

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
      <main>
        <div className="container">
          <div className="content">
            <Card
              title="List 1"
              extra={
                <>
                  <Tooltip title="Add a card">
                    <Button shape="circle" icon={<PlusOutlined />}></Button>
                  </Tooltip>
                  <Popconfirm
                    title="Delete the list"
                    description="Are you sure to delete this list?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Tooltip title="Delete this list">
                      <Button shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                  </Popconfirm>
                </>
              }
              className="cardList"
            >
              <TrelloCard />
              <TrelloCard />
            </Card>
            <Button type="text">
              <PlusOutlined /> Add another list
            </Button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
