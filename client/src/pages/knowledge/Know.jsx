import React from "react";
import Action from "../../action/knowledge";
import { getSagaType } from "../../utils/sagaType";
import { dispatch } from "../../store";
import "./knowledge.css";
import { format } from "date-fns";
import { Input, Button, Icon } from "antd";
import { connect } from "react-redux";

class Know extends React.Component {
  componentDidMount() {
    let type = getSagaType(Action.GET_KNOW_LIST);
    let action = {
      type,
      param: {
        id: 0
      }
    };
    dispatch(action);
  }
  handleChange(key, e) {
    let name = e.target.value;
    let action = {
      type: Action.CHANGE_KNOW_VALUE,
      payload: { key, value: name }
    };
    dispatch(action);
  }
  addData() {
    let { name } = this.props.knowledge;
    let action = {
      type: getSagaType(Action.ADD_KNOW),
      param: { name }
    };
    dispatch(action);
  }
  updateData(id) {
    let { editName } = this.props.knowledge;
    let action = {
      type: getSagaType(Action.UPDATE_KNOW),
      param: { id, name: editName }
    };
    dispatch(action);
  }
  handleEdit(id) {
    let { data } = this.props.knowledge;
    let editName = "";
    data.forEach(item => {
      if (item.id === id) {
        editName = item.name;
        item.isEditing = true;
      } else {
        item.isEditing = false;
      }
    });
    let action = {
      type: Action.HANDLE_KNOW_EDIT,
      payload: { data, editName }
    };
    dispatch(action);
  }
  deleteData(id) {
    let action = {
      type: getSagaType(Action.DELETE_KNOW),
      param: { id }
    };
    dispatch(action);
  }
  render() {
    let { data, name, editName } = this.props.knowledge;
    return (
      <div className="knowledge-container">
        <h1>redux-saga 实现</h1>
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

const mapStateToProps = state => ({
  knowledge: state.knowledge
});

export default connect(
  mapStateToProps,
  null
)(Know);
