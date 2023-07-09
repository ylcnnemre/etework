import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  TableColumnType,
  List,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { useState, useMemo, useCallback, useEffect } from "react";
import { httpClient } from "../../api/HttpClien";
import "./ProductContainer.scss";
import { Company } from "../Companies/CompanyPage";
import { toast } from "react-toastify";

interface Product {
  _id: number;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  company: Company;
  newProduct: boolean;
}

const ProductsPage = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [tempData, setTempData] = useState<Product[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    control: boolean;
    id: number | null;
  }>({ control: false, id: null });
  const [companyData, setCompanyData] = useState<{
    control: boolean;
    value: Company[];
  }>({
    control: false,
    value: [],
  });

  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Product>({
    _id: 0,
    productName: "",
    category: "",
    quantity: 0,
    unit: "",
    company: null,
    newProduct: false,
  });
  const [dataSource, setDataSource] = useState<Product[]>([]);

  const getCompanyList = async () => {
    const val = await httpClient.get("/company/getAll");
    const response: Company[] = val.data.value.map((item) => {
      return {
        ...item,
        newProduct: false,
      };
    });
    setCompanyData({
      control: true,
      value: response,
    });
  };

  useEffect(() => {
    httpClient.get("/product/getall",{headers:{"Authorization":`bearer ${localStorage.getItem("token")}`}}).then((val) => {
      const { success, value } = val.data;
      console.log("vall ==>", val);
      setDataSource(value);
      setTempData(value);
    });
  }, []);

  const columns = useMemo<TableColumnType<Product>[]>(
    () => [
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
        width: "20%",
        sorter: (a: Product, b: Product) =>
          a.productName.localeCompare(b.productName),
        render: (text: string, record: Product) =>
          editingRow === record._id ? (
            <Input
              value={editedData.productName}
              placeholder="Product Name"
              onChange={(e) =>
                handleEditInputChange(e.target.value, "productName")
              }
            />
          ) : (
            text
          ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "20%",
        sorter: (a: Product, b: Product) =>
          a.category.localeCompare(b.category),
        render: (text: string, record: Product) =>
          editingRow === record._id ? (
            <Input
              value={editedData.category}
              placeholder="Category"
              onChange={(e) =>
                handleEditInputChange(e.target.value, "category")
              }
            />
          ) : (
            text
          ),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: "20%",
        sorter: (a: Product, b: Product) => a.quantity - b.quantity,
        render: (text: number, record: Product) =>
          editingRow === record._id ? (
            <Input
              value={editedData.quantity}
              placeholder="Quantity"
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleEditInputChange(Number(e.target.value), "quantity");
                }
              }}
            />
          ) : (
            text
          ),
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        width: "20%",
        sorter: (a: Product, b: Product) => a.unit.localeCompare(b.unit),
        render: (text: string, record: Product) =>
          editingRow === record._id ? (
            <Input
              value={editedData.unit}
              placeholder="Unit"
              onChange={(e) => handleEditInputChange(e.target.value, "unit")}
            />
          ) : (
            text
          ),
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        width: "20%",
        sorter: (a: Product, b: Product) =>
          a.company.companyName.localeCompare(b.company.companyName),
        render: (item: Company, record: Product) => {
          return editingRow === record._id ? (
            <div>
              <p className="companyName">{editedData.company?.companyName}</p>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  if (companyData.value.length == 0) {
                    getCompanyList();
                  } else {
                    setCompanyData({
                      ...companyData,
                      control: true,
                    });
                  }
                }}
              >
                Change
              </Button>
            </div>
          ) : (
            item?.companyName
          );
        },
      },
      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (_: any, record: Product) => {
          if (record.newProduct) {
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
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
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
    ],
    [editingRow, editedData]
  );

  const handleEdit = (record: Product) => {
    console.log("rec ==>", dataSource);
    if (dataSource[0]?.newProduct) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
      setEditingRow(record._id);
      setEditedData(record);
    } else {
      console.log("record ==>", record);
      setEditingRow(record._id);
      setEditedData(record);
    }

    /* setEditingRow(record._id);
    setEditedData(record); */
    /* if (dataSource[0].newProduct) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
      setEditingRow(record._id);
      setEditedData(record);
    } else {
      setEditingRow(record._id);
      setEditedData(record);
    } */
  };

  const handleEditInputChange = (value: any, field: keyof Product) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async (record: Product) => {
    if (record.newProduct) {
      const { _id, newProduct, ...rest } = editedData;
      try {
        console.log("edited ==>", editedData);
        const response = await httpClient.post("/product/create", {
          ...rest,
          company: rest.company._id,
        });

        if (response.data.success) {
          toast.success("the addition process was successfull ", {
            autoClose: 2000,
            position: "top-right",
          });

          const result = dataSource.map((item) => {
            if (item._id === editedData._id) {
              return {
                ...editedData,
                newProduct: false,
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
        const { newProduct, ...rest } = editedData;
        console.log("rest t))< ", rest);
        const response = await httpClient.post("/product/update", {
          ...rest,
          company: rest.company._id,
        });
        if (response.data.success) {
          toast.success("the update process was Successfull", {
            position: "top-right",
            autoClose: 2000,
          });
          const result = dataSource.map((item) => {
            if (item._id === editedData._id) {
              return {
                ...editedData,
                newProduct: false,
              };
            }
            return item;
          });
         
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

  const handleCancel = (record: Product) => {
    if (record.newProduct) {
      const result = dataSource.slice(1, dataSource.length);
      setDataSource(result);
    }
    setEditingRow(null);
  };

  const confirmDelete = () => {
    const result = dataSource.filter((item) => item._id !== deleteModal.id);
    setDataSource(result);
    setTempData(result);
    setDeleteModal({ control: false, id: null });
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      _id: dataSource.length + 1,
      productName: "",
      category: "",
      quantity: 0,
      unit: "",
      company: null,
      newProduct: true,
    };

    setDataSource((prevDataSource) => [newProduct, ...prevDataSource]);
    setTempData((prevDataSource) => [newProduct, ...prevDataSource]);
    setEditingRow(newProduct._id);
    setEditedData(newProduct);
  };

  const searchProduct = useCallback(
    (value: string) => {
      setSearchValue(value);
      const filterData = tempData.filter((item) =>
        item.productName.toLowerCase().includes(value.toLowerCase())
      );

      setDataSource(filterData);
    },
    [tempData]
  );

  const addNewProductControl = useMemo(() => {
    return editingRow != null;
  }, [editingRow]);

  const deleteConfirm = async () => {
    setDeleteModal({
      control: false,
      id: null,
    });
    console.log("deletemodal 0=>", deleteModal);
    const response = await httpClient.delete(`/product/${deleteModal.id}`);
    console.log("response =>", response);
    if (response.data.success) {
      const result = dataSource.filter((item) => item._id !== deleteModal.id);
      setDataSource(result);
      setTempData(result);

      toast.success("The delete process was successfull", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("the delete process was unsuccessfull", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const selectCompanyColorControl = useCallback(
    (id: number) => {
      if (editedData.company?._id === id) {
        return "#4096FF";
      } else {
        return "white";
      }
    },
    [editedData, companyData]
  );

  return (
    <MainLayout>
      <div className="productContainer">
        <div className="newProductTab">
          <h3>Products</h3>
          <div className="producWrapper">
            <Input
              placeholder="Search"
              className="searchArea"
              value={searchValue}
              disabled={editingRow != null}
              onChange={(e) => searchProduct(e.target.value)}
            />
            <Button
              type="primary"
              onClick={addNewProduct}
              disabled={addNewProductControl}
            >
              <PlusOutlined /> Add new product
            </Button>
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 6, position: ["bottomRight"] }}
        />
      </div>

      {deleteModal.control && (
        <Modal
          open={deleteModal.control}
          title="Confirm"
          onOk={deleteConfirm}
          onCancel={() => setDeleteModal({ control: false, id: null })}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      )}
      {companyData.control && (
        <Modal
          title="Company List"
          open={companyData.control}
          footer={null}
          onCancel={() => {
            console.log("çalıştıııı");
            setCompanyData({ control: false, value: [] });
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={companyData.value}
            size="default"
            renderItem={(item, index) => {
              const desc =
                `RegNumber: ${item.registrationNumber}` +
                "  " +
                `Country :  ${item.country}`;
              return (
                <List.Item
                  onClick={() => {
                    setCompanyData({
                      ...companyData,
                      control: false,
                    });
                    setSelectedCompanyId(item._id);
                    setEditedData({
                      ...editedData,
                      company: companyData.value.find(
                        (el) => el._id == item._id
                      ),
                    });
                  }}
                >
                  <List.Item.Meta
                    title={`${item.companyName}`}
                    style={{
                      color: "pink",
                      backgroundColor: selectCompanyColorControl(item._id),
                      borderRadius: "5px",
                      padding: "5px",
                      paddingLeft: "10px",
                    }}
                    description={`${desc}`}
                    className="companyListItem"
                  />
                </List.Item>
              );
            }}
          />
        </Modal>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
