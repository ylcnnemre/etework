import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import "./Login.scss";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { httpClient } from "../../api/HttpClien";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const response = await httpClient.post("/user/login", {
        ...values,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(login())
        navigate("/");
      }
    } catch (err) {
      console.log("err =>", err);
    }
  };

  useEffect(()=>{
      const token = localStorage.getItem("token")

      if(token)
      {
        navigate("/")
      }

  },[])


  return (
    <MainLayout>
      <div className="login-page">
        <div className="form-wrapper">
          <h2 className="form-title">Login</h2>
          <Form
            name="loginForm"
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
            <p className="register-link">
              Don't have an account? <Link to="/register">Register now</Link>
            </p>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
