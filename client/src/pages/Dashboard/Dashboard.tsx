import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import "./Dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/reducers/TestSlice";
import { IDataTypes } from "../../redux/Store";
import { httpClient } from "../../api/HttpClien";
import { login } from "../../redux/reducers/AuthSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState<{
    companyCount: number;
    productCount: number;
    stockCount: number;
    countryData: {
      name: string;
      totalCompanies: number;
    };
    lastCompany: any;
    lastProduct: any;
  }>({
    companyCount: 0,
    productCount: 0,
    stockCount: 0,
    countryData: {
      totalCompanies: 0,
      name: "",
    },
    lastCompany: null,
    lastProduct: null,
  });

  useEffect(() => {
    httpClient
      .get("/dashboard/get", {
        headers: { Authorization: `bearer ${localStorage.getItem("token")} ` },
      })
      .then((val) => {
        console.log("vall ==>", val);
        setDashboardData({
          ...val.data.value,
        });
      })
      .catch((err) => {
        console.log("errr ==>", err);
      });
  }, []);

  return (
    <MainLayout>
      <div className="dashboardContainer">
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={12}>
            <Card title="Companies" className="stat-card">
              <p>
                There are <strong>{dashboardData.companyCount}</strong>{" "}
                companies in total.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card title="Products" className="stat-card">
              <p>
                There are <strong>{dashboardData.productCount}</strong> products
                in total.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card title="Stocks" className="stat-card">
              <p>
                There are <strong>{dashboardData.stockCount}</strong> stocks
                products in total.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card
              title="The country with the most companies"
              className="stat-card"
            >
              <p>
                There are{" "}
                <strong>{dashboardData.countryData.totalCompanies}</strong>{" "}
                companies in the country of{" "}
                <strong>{dashboardData.countryData.name}</strong>
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card title="Last added company" className="stat-card">
              <p>
                The last added company is{" "}
                <strong> {dashboardData.lastCompany?.companyName} </strong>
              </p>
              <p>
                Country :<strong> {dashboardData.lastCompany?.country} </strong>
              </p>
              <p>
                Registration Number:
                <strong style={{ marginLeft: "5px" }}>
                  {dashboardData.lastCompany?.registrationNumber}
                </strong>
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Card title="Last added product" className="stat-card">
              <p>
                The last added company is{" "}
                <strong> {dashboardData.lastProduct?.productName} </strong>
              </p>
              <p>
                Category :{" "}
                <strong> {dashboardData.lastProduct?.category} </strong>
              </p>
              <p>
                Quantity :
                <strong> {dashboardData.lastProduct?.quantity} </strong>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
