import React from "react";
import useFetch from "../hooks/useFetch";
import { Form, Select, Button, Input, InputNumber, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../redux/actions/fetch/fetchActions";
const { Option } = Select;
export default function NewTodo(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };

  const onFinish = values => {
    dispatch(
      fetchRequest(`http://localhost:3000/api/todo`, values, {}, "POST")
    );
    form.resetFields();
  };

  return (
    <>
      <Form {...layout} onFinish={onFinish} form={form}>
        <Form.Item
          label="Descripcion"
          name="descripcion"
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tiempo"
          name="tiempo"
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Valor"
          name="valor"
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Fecha"
          name="fecha"
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          label="Estado"
          name="estado"
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Select style={{ width: 120 }}>
            <Option value="Pendiente">Pendiente</Option>
            <Option value="Activo">Activo</Option>
            <Option value="Finalizado">Finalizado</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
