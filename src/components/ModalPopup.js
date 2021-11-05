import { Modal } from "antd";
import React, { useEffect } from "react";
import dateFns from "date-fns";

const ModalPopup = (props) => {

  const date = dateFns.format(new Date(), "D-M-YYYY");
  const dateSetLesson = dateFns.format(new Date(), "YYYY-M-DD");

  const handleOk = () => {
    props.setVisible(false);
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  useEffect(() => {
    console.log(props);
    if (date === props.date) {
      props.setVisible(true);
      props.setLessons(dateSetLesson, props.dayAPI)
    }
  }, [dateSetLesson, props.dayAPI]);

  const renderLesson = () => {
    if (props.lessons.length > 0) {
      const data = props.lessons;
      let days = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        days.push(
          <h4 key={i}>
            {element.timer}---{element.subject_name}---{element.address}
          </h4>
        );
      }
      return days;
    } else {
      return <h4>Không có lịch học</h4>;
    }
  };
  return (
    <div>
      <Modal
        title={props.date}
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p></p>
        {renderLesson()}
      </Modal>
    </div>
  );
};

export default ModalPopup;
