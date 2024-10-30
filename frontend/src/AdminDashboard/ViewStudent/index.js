import { Button, Card } from 'react-bootstrap';
import ajax from "../../services/fetchService";
import { useUser } from "../../UserProvider/index";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import styles from "../../styles/Card.module.scss";

const ViewStudent = () => {
  const [datas, setDatas] = useState([]);
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    ajax('/api/students/all', 'GET', user.jwt)
      .then((data) => setDatas(data));
  }, []);

  return (
    <div>
      <Header />
      <h1 className={styles.tocards}>List of Students</h1>
      {datas.length > 0 ? (
        <div className={styles.cards}>
          {datas.map((data) => (
            <Card key={data.id} style={{ width: "100%", height: "30rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title className={styles.card_title}>{data.department.name}</Card.Title>
                <Card.Text className={styles.card_text}>
                  <p><b>Name</b>: {data.fname + " " + data.mname}</p>
                  <p><b>Email</b>: {data.email}</p>
                  <p><b>ID</b>: {data.id}</p>
                </Card.Text>
                <Button className={styles.btn} variant="primary" onClick={() => navigate(`/view_student/${data.id}`)}>
                  More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ViewStudent;
