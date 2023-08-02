import { Card, Popconfirm, Tooltip } from "antd";
import React from "react";
import {
  FileTextOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function TrelloCard() {
  return (
    <div>
      <Card
        cover={<img alt="example" src="https://picsum.photos/265/160" />}
        actions={[
          <Tooltip title="View">
            <FileTextOutlined />
          </Tooltip>,
          <Tooltip title="Edit">
            <EditOutlined />
          </Tooltip>,
          <Popconfirm
            title="Delete the card"
            description="Are you sure to delete this card?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Delete">
              <DeleteOutlined key="ellipsis" />
            </Tooltip>
          </Popconfirm>,
        ]}
      ></Card>
    </div>
  );
}

export default TrelloCard;
