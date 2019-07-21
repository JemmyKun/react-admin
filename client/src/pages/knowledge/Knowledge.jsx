import React from "react";
import Apis from "../../api/knowledge";
import { format } from "date-fns";
import { Input, Button, message, Icon } from "antd";
import "./knowledge.css";

class Knowledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      editName: ""
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    Apis.getData()
      .then(res => {
        if (res.data.status === "200") {
          let data = res.data.content || [];
          this.setState({
            data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  addData() {
    let { name } = this.state;
    Apis.addData({ name })
      .then(res => {
        if (res.data.status === "200") {
          message.success("添加成功");
          this.getData();
          this.setState({
            name: ""
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteData(id) {
    Apis.deleteData({ id })
      .then(res => {
        if (res.data.status === "200") {
          message.success("删除成功");
          this.getData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateData(id) {
    let { editName } = this.state;
    let param = {
      name: editName,
      id
    };
    Apis.updateData(param)
      .then(res => {
        if (res.data.status === "200") {
          message.success("修改成功");
          this.getData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  handleEdit(id) {
    let { data } = this.state;
    data.forEach(item => {
      if (item.id === id) {
        let editName = item.name;
        item.isEditing = true;
        this.setState({
          editName
        });
      } else {
        item.isEditing = false;
      }
    });
  }
  render() {
    let { data, name, editName } = this.state;
    return (
      <div className="knowledge-container">
        <h1>state 实现</h1>
        <div className="add-box">
          <Input
            value={name}
            onChange={this.handleChange.bind(this, "name")}
            placeholder="add.."
          />
          <Button onClick={this.addData.bind(this)} type="primary">
            添加
          </Button>
        </div>
        <ul className="knowledge-list">
          {data.map((item, index) => {
            let { name, updateTime, id, isEditing } = item;
            let time = updateTime
              ? format(updateTime, "YYYY-MM-DD HH:mm:ss")
              : "--";
            return (
              <li key={index}>
                {isEditing ? (
                  <Input
                    value={editName}
                    onChange={this.handleChange.bind(this, "editName")}
                    onBlur={this.updateData.bind(this, id)}
                  />
                ) : (
                  <span className="name">{name}</span>
                )}
                <span className="time">{time}</span>
                <Icon type="edit" onClick={this.handleEdit.bind(this, id)}>
                  修改
                </Icon>
                <Icon type="delete" onClick={this.deleteData.bind(this, id)}>
                  删除
                </Icon>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Knowledge;
