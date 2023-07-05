import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import "./Dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/reducers/TestSlice";
import { IDataTypes } from "../../redux/Store";
import { httpClient } from "../../api/HttpClien";
const Dashboard = () => {
  const data = useSelector((state: IDataTypes) => state.test);

  useEffect(() => {
    httpClient.get("/test").then((val) => {
      console.log("vall ==>", val);
    });
  }, []);

  return (
    <MainLayout>
      <div className="dashboardContainer">
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Şirketler" className="stat-card">
              {/* Şirketlerle ilgili istatistiksel veriler */}
              <p>Sistemde X adet şirket var.</p>
              <p>Son eklenen şirketler:</p>
              {/* Şirketlerin listesi */}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Ürünler" className="stat-card">
              {/* Ürünlerle ilgili istatistiksel veriler */}
              <p>Toplam X adet ürün bulunmaktadır.</p>
              <p>En çok satan ürünler:</p>
              {/* Ürünlerin listesi */}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Ürünler" className="stat-card">
              {/* Ürünlerle ilgili istatistiksel veriler */}
              <p>Toplam X adet ürün bulunmaktadır.</p>
              <p>En çok satan ürünler:</p>
              {/* Ürünlerin listesi */}
            </Card>
          </Col>
          {/* Diğer istatistiksel paneller */}
        </Row>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
