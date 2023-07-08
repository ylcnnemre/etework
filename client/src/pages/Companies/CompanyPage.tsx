import {
  Table,
  Button,
  Space,
  Input,
  TableColumnType,
  Modal,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import "./CompanyPage.scss";
import { useState, useMemo, useCallback, useEffect } from "react";
import { httpClient } from "../../api/HttpClien";
import { toast } from "react-toastify";
export interface Company {
  _id: number;
  companyName: string;
  registrationNumber: number;
  country: string;
  website: string;
  newCompany: boolean;
}

const CompanyPage = () => {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [tempData, setTempData] = useState<Company[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    control: boolean;
    id: number | null;
  }>({
    control: false,
    id: null,
  });
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Company>({
    _id: 0,
    companyName: "",
    registrationNumber: 0,
    country: "",
    website: "",
    newCompany: false,
  });
  const [dataSource, setDataSource] = useState<Company[]>([]);

  useEffect(() => {
    httpClient.get("/company/getAll").then((val) => {
      const response: Company[] = val.data.value.map((item) => {
        return {
          ...item,
          newCompany: false,
        };
      });
      setDataSource(response);
      setTempData(response);
    });
  }, []);

  const columns: TableColumnType<Company>[] = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a: Company, b: Company) =>
        a.companyName.localeCompare(b.companyName),
      width: "20%",
      render: (text: string, record: Company) =>
        editingRow === record._id ? (
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
      sorter: (a: Company, b: Company) =>
        a.registrationNumber - b.registrationNumber,
      width: "20%",
      render: (text: number, record: Company) =>
        editingRow === record._id ? (
          <Input
            placeholder="Registration Number"
            value={editedData.registrationNumber}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                handleEditInputChange(
                  Number(e.target.value),
                  "registrationNumber"
                );
              }
            }}
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
        editingRow === record._id ? (
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
        editingRow === record._id ? (
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
        if (record.newCompany) {
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
          return editingRow === record._id ? (
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
                onClick={async () => {
                  setDeleteModal({
                    control: true,
                    id: record._id,
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

  const handleEdit = async (record: Company) => {
    if (dataSource[0].newCompany) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
      setEditingRow(record._id);
      setEditedData(record);
    } else {
      setEditingRow(record._id);
      setEditedData(record);
    }
  };

  const handleEditInputChange = (value: any, field: keyof Company) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("editing ==>", editingRow);
  }, [editingRow]);

  const handleSave = async (record: Company) => {
    console.log("recordd ==>", record);
    if (record.newCompany) {
      const { _id, newCompany, ...rest } = editedData;

      try {
        const response = await httpClient.post("/company/save", {
          ...rest,
        });
        console.log("response ==>", response);
        if (response.data.success) {
          toast.success("the addition process was successfull ", {
            autoClose: 2000,
            position: "top-right",
          });

          const result = dataSource.map((item) => {
            if (item._id === editedData._id) {
              return {
                ...editedData,
                newCompany: false,
              };
            }
            return item;
          });

          setDataSource(result);
          setTempData(result);
          setEditingRow(null);
        }
      } catch (err) {
        toast.error("form values are incorrect", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      try {
        const { newCompany, ...rest } = editedData;
        const response = await httpClient.post("/company/update", {
          ...rest,
        });
        if (response.data.success) {
          toast.success("Successfull", {
            position: "top-right",
            autoClose: 2000,
          });

          const result = dataSource.map((item) => {
            if (item._id === editedData._id) {
              return {
                ...editedData,
                newCompany: false,
              };
            }
            return item;
          });

          console.log("resultt123213 ==<", result);

          setDataSource(result);

          setTempData(
            tempData.map((item) => {
              const final = result.find((el) => el._id === item._id);
              if (final) {
                return {
                  ...final,
                };
              }
              return item;
            })
          );

          setEditingRow(null);
        }
      } catch (err) {
        toast.error("form values are incorrect", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const handleCancel = (record: Company) => {
    if (record.newCompany) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
    }
    setEditingRow(null);
  };

  const handleAddNewCompany = () => {
    const newCompany: Company = {
      _id: dataSource.length + 1,
      companyName: "",
      registrationNumber: 0,
      country: "",
      website: "",
      newCompany: true,
    };

    setDataSource((prevDataSource) => [newCompany, ...prevDataSource]);
    setTempData((prevDataSource) => [newCompany, ...prevDataSource]);
    setEditingRow(newCompany._id);
    setEditedData(newCompany);
  };

  const addNewCompanyControl = useMemo(() => {
    return editingRow != null;
  }, [editingRow]);

  const searchCompany = useCallback(
    (value: string) => {
      setSearchValue(value);
      const filterData = tempData.filter(
        (item) =>
          item.companyName.toLowerCase().search(value.toLowerCase()) != -1
      );

      setDataSource(filterData);
    },
    [tempData]
  );

  const confirmDelete = async () => {
    setDeleteModal({
      control: false,
      id: null,
    });

    const response = await httpClient.delete(`/company/${deleteModal.id}`);

    if (response.data.success) {
      const result = dataSource.filter((item) => item._id !== deleteModal.id);
      setDataSource(result);
      setTempData(result);

      toast.success("Successfull", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <MainLayout>
      <div className="companyContainer">
        <div className="newCompanyTab">
          <h3>Companies</h3>
          <div className="buttonWrapper">
            <Input
              placeholder="Search"
              className="searchArea"
              disabled={editingRow != null}
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
          onOk={confirmDelete}
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
