import React, { Fragment } from "react";
import Modal from "react-modal";

const MyModal = (props) => {
  const closeModal = () => {
    props.clearModal();
  };

  return (
    <Fragment>
      <Modal isOpen={props.team}>
        <button onClick={closeModal}>Close Modal</button>{" "}
        {
          <div>
            <h3>{props.team?.name}</h3>
            <hr />
            <div>
              <div
                className="modal_content"
                dangerouslySetInnerHTML={{
                  __html: props.team?.content,
                }}
              ></div>
            </div>
          </div>
        }
      </Modal>
    </Fragment>
  );
};

export default MyModal;
