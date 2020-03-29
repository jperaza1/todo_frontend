import React from "react";
import useFetch from "../hooks/useFetch";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../redux/actions/fetch/fetchActions";
const { Option } = Select;

export default function EditTodo(props) {
  const { id } = props;
  const dataResult = useFetch(`http://localhost:3000/api/todo/${id}`);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  function handleChange(value) {
    dispatch(
      fetchRequest(
        `http://localhost:3000/api/todo/${id}`,
        { estado: value },
        {},
        "PUT"
      )
    );
    form.resetFields();
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <>
      {dataResult.result ? (
        <Form {...layout} form={form}>
          <Form.Item>
            <p>Estado Actua: {dataResult.result.estado}</p>
          </Form.Item>
          <Form.Item label="Estado" name="estado">
            <Select style={{ width: 120 }} onChange={handleChange}>
              <Option value="Pendiente">Pendiente</Option>
              <Option value="Activo">Activo</Option>
              <Option value="Finalizado">Finalizado</Option>
            </Select>
          </Form.Item>
        </Form>
      ) : (
        "Cargando..."
      )}
    </>
  );
}
