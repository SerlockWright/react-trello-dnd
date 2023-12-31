import React from "react";
import ImagePersonal from "./assets/images/personal.jpg";
import { Avatar, Button, Form, Input, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloList from "./components/TrelloList";

//import data
import { data } from "./mocks/data";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const { Option } = Select;

const { TextArea } = Input;

function App() {
  const [form] = Form.useForm();
  const [openModalAddCard, setOpenModalAddCard] = React.useState(false);
  // const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [todos, setTodos] = React.useState(data);

  const handleCancel = () => {
    setOpenModalAddCard(false);
  };

  const handleAddCard = () => {
    setOpenModalAddCard(true);
  };

  const handleDeleteCard = (cardId) => {
    const cloneTodo = {
      ...todos,
      lists: {
        ...todos.lists,
      },
      cards: {
        ...todos.cards,
      },
    };

    console.log(cloneTodo);

    delete cloneTodo.cards[cardId];
    console.log(cloneTodo);

    Object.keys(cloneTodo.lists).forEach((listId) => {
      cloneTodo.lists[listId].cards = cloneTodo.lists[listId].cards.filter(
        (card) => card !== cardId
      );
    });

    setTodos(cloneTodo);
  };

  const onDragEnd = (result) => {
    // the only one that is required
    console.log("onDragEnd", result);
    const { type, source, destination } = result;

    //Case: nothing
    if (!destination) {
      alert("No happened!");
      return;
    }

    //Card
    //1. drag and drop same list
    if (source.droppableId === destination.droppableId) {
      // const listItem = todos.lists[destination.droppableId];
      // const cards = listItem.cards;
      // [cards[source.index], cards[destination.index]] = [
      //   cards[destination.index],
      //   cards[source.index],
      // ];
      // setTodos((prevState) => ({
      //   ...prevState,
      //   lists: {
      //     ...prevState.lists,
      //     [destination.droppableId]: {
      //       ...prevState.lists[destination.droppableId],
      //       cards: cards,
      //     },
      //   },
      // }));
      // return;
      const listId = destination.droppableId;
      const listItem = todos.lists[listId];
      const cardItem = listItem.cards.splice(source.index, 1)[0];
      listItem.cards.splice(destination.index, 0, cardItem);
      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [listId]: {
            ...prevState.lists[listId],
            cards: listItem.cards,
          },
        },
      }));
      return;
    }
    //2. drag and drop card between lists
    if (source.droppableId !== destination.droppableId) {
      const sourceId = source.droppableId;
      const destId = destination.droppableId;
      const sourceItem = todos.lists[sourceId];
      const destItem = todos.lists[destId];
      const cardItem = sourceItem.cards.splice(source.index, 1)[0];
      destItem.cards.splice(destination.index, 0, cardItem);
      setTodos((prevState) => ({
        ...prevState,
        lists: {
          ...prevState.lists,
          [sourceId]: {
            ...prevState.lists[sourceId],
            cards: sourceItem.cards,
          },
          [destId]: {
            ...prevState.lists[destId],
            cards: destItem.cards,
          },
        },
      }));
    }
    //drag and drop list
    if (type === "LIST") {
      const updatedColumnOrder = todos.columns;
      const [draggedList] = updatedColumnOrder.splice(source.index, 1);
      updatedColumnOrder.splice(destination.index, 0, draggedList);
      console.log(updatedColumnOrder);

      setTodos((prevState) => ({
        ...prevState,
        columns: updatedColumnOrder,
      }));
    }
  };

  return (
    <React.Fragment>
      <header>
        <div className="header__container">
          <div className="header__logo"></div>
          <div className="header__right">
            <div className="header__avatar">
              <img src={ImagePersonal} alt="Avatar" />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="LIST"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="listContainer"
                >
                  {todos.columns.map((listId, listIndex) => {
                    const listItem = todos.lists[listId];
                    const cards = listItem.cards.map(
                      (cardId) => todos.cards[cardId]
                    );
                    return (
                      <TrelloList
                        key={listItem.id}
                        index={listIndex}
                        listItem={listItem}
                        cards={cards}
                        openModalAddCard={openModalAddCard}
                        handleAddCard={handleAddCard}
                        onDeleteCard={handleDeleteCard}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <Button type="text">
                    <PlusOutlined /> Add another list
                  </Button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      <Modal
        title="Add Card"
        open={openModalAddCard}
        onCancel={handleCancel}
        onOk={form.submit}
        // confirmLoading={confirmLoading}
      >
        <br />
        <Form
          name="basic"
          form={form}
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          autoComplete="off"
          initialValues={{ status: "new" }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Member"
            name="member"
            rules={[{ required: true, message: "Please choose member!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              optionLabelProp="label"
            >
              <Option value="tony123" label="tony 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Tony Nguyen</span>
                </div>
              </Option>
              <Option value="phuong123" label="phuong 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Phuong Nguyen</span>
                </div>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "inprocess",
                  label: "In process",
                },
                {
                  value: "done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default App;
