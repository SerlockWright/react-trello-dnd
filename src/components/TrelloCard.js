import { Avatar, Card, Modal, Popconfirm, Tooltip } from "antd";
import React from "react";
import {
  FileTextOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

const { Meta } = Card;

function TrelloCard({ card, index, onDeleteCard }) {
  //view Card
  const handleViewDetail = () => {
    Modal.info({
      title: "Card Detail",
      content: (
        <>
          <div>
            <h4>Title</h4>
            <div>{card.title}</div>
          </div>
          <br />
          <div>
            <h4>Description</h4>
            <div>{card.description}</div>
          </div>
          <br />
        </>
      ),
      onOk() {},
    });
  };

  //delete Card
  const handleDeleteCard = () => {
    onDeleteCard(card.id);
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          <Card
            cover={<img alt="example" src="https://picsum.photos/265/160" />}
            actions={[
              <Tooltip title="View">
                <FileTextOutlined onClick={handleViewDetail} />
              </Tooltip>,
              <Tooltip title="Edit">
                <EditOutlined />
              </Tooltip>,
              <Popconfirm
                title="Delete the card"
                description="Are you sure to delete this card?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onClick={handleDeleteCard}
              >
                <Tooltip title="Delete">
                  <DeleteOutlined key="ellipsis" />
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            <Meta
              title={card.title}
              description={
                <>
                  <div>{card.description}</div>
                  <Avatar.Group
                    maxCount={2}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                    }}
                    className="avatarGroup"
                  >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{ backgroundColor: "#1890ff" }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                </>
              }
            ></Meta>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default TrelloCard;
