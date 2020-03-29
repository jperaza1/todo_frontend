import React, { useState, useEffect } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/actions/fetch/fetchActions";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import EditTodo from "./EditTodo";
import NewTodo from "./NewTodo";

export default function TodoList(props) {
  const data = useFetch("http://localhost:3000/api/todo");
  const [todoState, setTodo] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);

  const dispatch = useDispatch();
  const fetch = useSelector(state => state.fetch);

  const closeModal = () => {
    setVisible(false);
    setVisibleCreate(false);
  };

  useEffect(() => {
    if (fetch.refreshData) {
      data.doFetch();
    }
    if (fetch.response != null) {
      alert(fetch.response);
      closeModal();
      dispatch(reset());
    }

    if (fetch.error != null) {
      alert(fetch.error);
    }
  }, [fetch.refreshData, fetch.response, fetch.error]);

  return (
    <div>
      <Button
        color="primary"
        style={{ marginBottom: 10 }}
        onClick={() => setVisibleCreate(true)}
      >
        Nueva Tarea
      </Button>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Pendientes" bordered={false} loading={data.isloading}>
            {data.result && (
              <>
                {data.result
                  .filter(todo => {
                    return todo.estado === "Pendiente";
                  })
                  .map((todo, index) => (
                    <Card
                      key={index}
                      style={{ marginBottom: 10 }}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => {
                            dispatch(reset());
                            setTodo(todo);
                            setVisible(true);
                          }}
                        />
                      ]}
                    >
                      <h3>
                        <strong>{todo.descripcion}</strong>
                      </h3>
                      <p>
                        Tiempo Estimado: <strong>{todo.tiempo} horas</strong>
                      </p>
                      <p>
                        Valor: <strong>{todo.valor}</strong>
                      </p>
                      <p>
                        Fecha:{" "}
                        <strong>
                          {moment(todo.fecha).format("DD/MM/YYYY")}
                        </strong>
                      </p>
                    </Card>
                  ))}
              </>
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Activo" bordered={false} loading={data.isloading}>
            {data.result && (
              <>
                {data.result
                  .filter(todo => {
                    return todo.estado === "Activo";
                  })
                  .map((todo, index) => (
                    <Card
                      key={index}
                      style={{ marginBottom: 10 }}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => {
                            dispatch(reset());
                            setTodo(todo);
                            setVisible(true);
                          }}
                        />
                      ]}
                    >
                      <h3>
                        <strong>{todo.descripcion}</strong>
                      </h3>
                      <p>
                        Tiempo Estimado: <strong>{todo.tiempo} horas</strong>
                      </p>
                      <p>
                        Valor: <strong>{todo.valor}</strong>
                      </p>
                      <p>
                        Fecha:{" "}
                        <strong>
                          {moment(todo.fecha).format("DD/MM/YYYY")}
                        </strong>
                      </p>
                    </Card>
                  ))}
              </>
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Finalizado" bordered={false} loading={data.isloading}>
            {data.result && (
              <>
                {data.result
                  .filter(todo => {
                    return todo.estado === "Finalizado";
                  })
                  .map((todo, index) => (
                    <Card
                      key={index}
                      style={{ marginBottom: 10 }}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => {
                            dispatch(reset());
                            setTodo(todo);
                            setVisible(true);
                          }}
                        />
                      ]}
                    >
                      <h3>
                        <strong>{todo.descripcion}</strong>
                      </h3>
                      <p>
                        Tiempo Estimado: <strong>{todo.tiempo} horas</strong>
                      </p>
                      <p>
                        Valor: <strong>{todo.valor}</strong>
                      </p>
                      <p>
                        Fecha:{" "}
                        <strong>
                          {moment(todo.fecha).format("DD/MM/YYYY")}
                        </strong>
                      </p>
                    </Card>
                  ))}
              </>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title={todoState.descripcion}
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Regresar
          </Button>
        ]}
      >
        <EditTodo id={todoState._id} />
      </Modal>
      <Modal
        title="Crear Tarea"
        onCancel={() => {
          setVisibleCreate(false);
        }}
        visible={visibleCreate}
        footer={[
          <Button key="back" onClick={() => setVisibleCreate(false)}>
            Regresar
          </Button>
        ]}
      >
        <NewTodo />
      </Modal>
    </div>
  );
}
