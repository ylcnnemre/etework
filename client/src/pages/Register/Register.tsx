import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import "./Register.scss";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

const Register: React.FC = () => {
  const onFinish = (values: any) => {
    // Register logic here
    console.log("Received values:", values);
  };

  const confirmPasswordValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      const password = getFieldValue("password");

      if (password && value !== password) {
        return Promise.reject("Passwords do not match");
      } else {
        return Promise.resolve();
      }
    },
  });

  const emailValidator = (_: any, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && !emailRegex.test(value)) {
      return Promise.reject("Invalid email format");
    } else {
      return Promise.resolve();
    }
  };

  return (
    <MainLayout>
      <div className="register-page">
        <div className="form-wrapper">
          <h2 className="form-title">Register</h2>
          <Form
            name="registerForm"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
              ]}
              className="form-item"
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  validator: emailValidator,
                },
              ]}
              className="form-item"
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
              className="form-item"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                confirmPasswordValidator,
              ]}
              className="form-item"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <div className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
