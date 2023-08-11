import React from "react";
import { Button, Card, Popconfirm, Tooltip } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TrelloCard from "./TrelloCard";
import { Draggable, Droppable } from "react-beautiful-dnd";

function TrelloList({
  cards,
  listItem,
  index,
  openModalAddCard,
  handleAddCard,
  onDeleteCard,
}) {
  return (
    <Draggable index={index} draggableId={String(listItem.id)}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todoList"
        >
          <Droppable type="CARD" droppableId={String(listItem.id)}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Card
                  title={listItem.title}
                  extra={
                    <>
                      <Tooltip title="Add a card">
                        <Button
                          shape="circle"
                          icon={<PlusOutlined />}
                          onClick={handleAddCard}
                        />
                      </Tooltip>
                      <Popconfirm
                        title="Delete the list"
                        description="Are you sure to delete this list?"
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                        className="ml-10"
                      >
                        <Tooltip title="Delete this list">
                          <Button shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                      </Popconfirm>
                    </>
                  }
                  className="cardList"
                >
                  {cards.map((card, cardIndex) => (
                    <TrelloCard
                      key={card.id}
                      index={cardIndex}
                      card={card}
                      onDeleteCard={onDeleteCard}
                    />
                  ))}
                </Card>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default TrelloList;
