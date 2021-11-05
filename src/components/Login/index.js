import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { useHistory } from "react-router";
import loginAction from "../../app/action/loginAction";
import { connect } from "react-redux";
import userLogin from "../../app/action/loginAction";
import md5 from "md5";


const Login = (props) => {
  const history = useHistory()

  const onFinish = (values) => {
    console.log("Success:", values);
    axios
    .post("http://127.0.0.1:8080/login", {
      username: values.username,
      password: md5(values.password),
    })
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      props.userLogin(res)
      history.push('/')
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = dispatch => ({
  userLogin : userInfo => dispatch(userLogin(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);
