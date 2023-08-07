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

  const handleCancel = () => {
    setOpenModalAddCard(false);
  };

  const onDragEnd = () => {
    // the only one that is required
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
                  {data.columns.map((listId, listIndex) => {
                    const listItem = data.lists[listId];
                    const cards = listItem.cards.map(
                      (cardId) => data.cards[cardId]
                    );
                    return (
                      <TrelloList
                        key={listItem.id}
                        index={listIndex}
                        listItem={listItem}
                        cards={cards}
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
