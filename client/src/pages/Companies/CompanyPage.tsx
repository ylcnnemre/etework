import { Table, Button, Space, Input, TableColumnType, Modal } from "antd";
import { SaveOutlined, PlusOutlined } from "@ant-design/icons";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import "./CompanyPage.scss";
import { useState, useMemo, useCallback } from "react";

interface Company {
  id: number;
  companyName: string;
  registrationNumber: string;
  country: string;
  website: string;
  new: boolean;
}

const firstData = [
  {
    id: 1,
    companyName: "ABC Company",
    registrationNumber: "12345",
    country: "USA",
    website: "https://www.abc.com",
    new: false,
  },
  {
    id: 2,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 3,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 4,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 5,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 6,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 7,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 8,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 9,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
  {
    id: 10,
    companyName: "DEF Company",
    registrationNumber: "67890",
    country: "UK",
    website: "https://www.def.com",
    new: false,
  },
];

const CompanyPage = () => {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [tempData, setTempData] = useState<Company[]>(firstData);
  const [deleteModal, setDeleteModal] = useState<{
    control: boolean;
    id: number | null;
  }>({
    control: false,
    id: null,
  });
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Company>({
    id: 0,
    companyName: "",
    registrationNumber: "",
    country: "",
    website: "",
    new: false,
  });
  const [dataSource, setDataSource] = useState<Company[]>(firstData);

  const columns: TableColumnType<Company>[] = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a: Company, b: Company) => a.companyName.localeCompare(b.companyName),
      width: "20%",
      render: (text: string, record: Company) =>
        editingRow === record.id ? (
          <Input
            value={editedData.companyName}
            placeholder="Company Name"
            onChange={(e) =>
              handleEditInputChange(e.target.value, "companyName")
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Registration Number",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
      sorter: (a: Company, b: Company) =>   a.registrationNumber.localeCompare(b.registrationNumber),
      width: "20%",
      render: (text: string, record: Company) =>
        editingRow === record.id ? (
          <Input
            placeholder="Registration Number"
            value={editedData.registrationNumber}
            onChange={(e) =>
              handleEditInputChange(e.target.value, "registrationNumber")
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: "20%",
      render: (text: string, record: Company) =>
        editingRow === record.id ? (
          <Input
            placeholder="Country"
            value={editedData.country}
            onChange={(e) => handleEditInputChange(e.target.value, "country")}
          />
        ) : (
          text
        ),
    },
    {
      title: "Web Site",
      dataIndex: "website",
      key: "website",
      width: "20%",
      render: (text: string, record: Company) =>
        editingRow === record.id ? (
          <Input
            placeholder="Web Site"
            value={editedData.website}
            onChange={(e) => handleEditInputChange(e.target.value, "website")}
          />
        ) : (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_: any, record: Company) => {
        if (record.new) {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  handleSave(record);
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  handleCancel(record);
                }}
              >
                Cancel
              </Button>
            </Space>
          );
        } else {
          return editingRow === record.id ? (
            <Space>
              <Button type="primary" onClick={() => handleSave(record)}>
                Save
              </Button>
              <Button onClick={() => handleCancel(record)}>Cancel</Button>
            </Space>
          ) : (
            <Space>
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setDeleteModal({
                    control: true,
                    id: record.id,
                  });
                }}
              >
                Delete
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  const handleEdit = (record: Company) => {
    setEditingRow(record.id);
    setEditedData(record);
  };

  const handleEditInputChange = (value: string, field: keyof Company) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = (record: Company) => {
    if (searchValue == "") {
      const result = dataSource.map((item) => {
        if (item.id === editedData.id) {
          return {
            ...editedData,
            new: false,
          };
        }
        return item;
      });

      setDataSource(result);
      setTempData(result);
      setEditingRow(null);
    } else {
      const result = tempData.map((item) => {
        if (item.id === editedData.id) {
          return {
            ...editedData,
            new: false,
          };
        }
        return item;
      });
      setDataSource(
        dataSource.map((item) => {
          if (item.id === editedData.id) {
            return {
              ...editedData,
              new: false,
            };
          }
          return item;
        })
      );

      setTempData(result);
      setEditingRow(null);
    }
  };

  const handleCancel = (record: Company) => {
    if (record.new) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
    }
    setEditingRow(null);
  };

  const handleAddNewCompany = () => {
    const newCompany: Company = {
      id: dataSource.length + 1,
      companyName: "",
      registrationNumber: "",
      country: "",
      website: "",
      new: true,
    };

    setDataSource((prevDataSource) => [newCompany, ...prevDataSource]);
    setTempData((prevDataSource) => [newCompany, ...prevDataSource]);
    setEditingRow(newCompany.id);
    setEditedData(newCompany);
  };



  const addNewCompanyControl = useMemo(() => {
    const firsData = dataSource.slice(0, 1);

    return firsData[0]?.new || searchValue != "";
  }, [dataSource, searchValue]);

  const searchCompany = useCallback((value: string) => {
    setSearchValue(value);
    const filterData = tempData.filter(
      (item) => item.companyName.toLowerCase().search(value.toLowerCase()) != -1
    );

    setDataSource(filterData);
  }, [tempData]);

  return (
    <MainLayout>
      <div className="companyContainer">
        <div className="newCompanyTab">
          <Input
            placeholder="Search"
            className="searchArea"
            onChange={({ target: { value } }) => searchCompany(value)}
          />
          <Button
            type="primary"
            onClick={handleAddNewCompany}
            disabled={addNewCompanyControl}
          >
            <PlusOutlined /> Add new company
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 6, position: ["bottomRight"] }}
        />
      </div>
      {deleteModal && (
        <Modal
          title="Confirm"
          open={deleteModal.control}
          onOk={() => {
            setDeleteModal({
              control: false,
              id: null,
            });
            const result = dataSource.filter(
              (item) => item.id !== deleteModal.id
            );
            setDataSource(result);
            setTempData(result);
          }}
          onCancel={() => {
            setDeleteModal({
              control: false,
              id: null,
            });
          }}
        >
          <p>are you sure you want to delete ? </p>
        </Modal>
      )}
    </MainLayout>
  );
};

export default CompanyPage;
