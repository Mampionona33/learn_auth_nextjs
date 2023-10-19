import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export type FieldConfig = {
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
  name?: string;
  options?: string[];
};

const CustomModal_2 = ({
  id,
  title,
  body,
  labelButtonShow,
  fields,
  handleSubmit,
  initialValues,
}: {
  id: string;
  title: string;
  labelButtonShow: string;
  body: React.ReactNode;
  fields: FieldConfig[];
  initialValues?: { [key: string]: any };
  handleSubmit: (formData: { [key: string]: string }) => void;
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [checkboxValues, setCheckboxValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const formData: { [key: string]: string } = {};

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i] as HTMLInputElement;

      if (element.tagName === "INPUT") {
        if (element.type === "radio" && element.checked) {
          formData[element.name] = element.value;
        } else if (element.type === "checkbox") {
          formData[element.id] = checkboxValues[element.id] || "";
        } else if (element.type !== "radio") {
          formData[element.id] = element.value;
        }
      }
      if (element.tagName === "SELECT") {
        formData[element.id] = selectedOptions[element.id];
      }
    }

    console.log(formData);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {labelButtonShow}
      </Button>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body ? body : null}
          {fields && fields.length > 0 ? (
            <div className="row g-3">
              {fields.map((item, key) => {
                if (item.type === "select") {
                  if (!selectedOptions[item.id]) {
                    setSelectedOptions({
                      ...selectedOptions,
                      [item.id]: item.options[0],
                    });
                  }
                }
                return (
                  <div className="col-md-6" key={key}>
                    <label htmlFor={item.id} className="visually-hidden">
                      {item.placeholder}
                    </label>

                    {(() => {
                      switch (item.type) {
                        case "text":
                        case "password":
                        case "email":
                          return (
                            <input
                              type={item.type}
                              name={item.name || ""}
                              className="form-control"
                              id={item.id}
                              placeholder={item.placeholder}
                              required={item.required}
                              defaultValue={
                                initialValues ? initialValues[item.id] : ""
                              }
                            />
                          );

                        case "textarea":
                          return (
                            <textarea
                              className="form-control"
                              id={item.id}
                              placeholder={item.placeholder}
                              required={item.required}
                              defaultValue={initialValues[item.id] || ""}
                            />
                          );

                        case "select":
                          return (
                            <div className="input-group mb-3">
                              <label
                                htmlFor={item.id}
                                className="input-group-text"
                              >
                                {item.placeholder}
                              </label>
                              <select
                                className="form-control"
                                id={item.id}
                                required={item.required}
                                value={selectedOptions[item.id]}
                                onChange={(e) => {
                                  setSelectedOptions({
                                    ...selectedOptions,
                                    [item.id]: e.target.value,
                                  });
                                }}
                              >
                                {item.options.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );

                        case "radio":
                          return (
                            <fieldset className="form-group">
                              <div className="row">
                                <legend className="col-form-label col-sm-2 pt-0">
                                  {item.placeholder}
                                </legend>
                                <div className="col-sm-10">
                                  {item.options.map((option, index) => (
                                    <div key={index} className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={item.name}
                                        id={`${item.id}-${index}`}
                                        value={option}
                                        defaultChecked={
                                          initialValues &&
                                          item.id in initialValues
                                            ? initialValues[item.id] === option
                                            : option === item.options[0] // Check le premier bouton par défaut s'il n'y a pas de valeur initiale
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`${item.id}-${index}`}
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </fieldset>
                          );

                        case "checkbox":
                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={item.id}
                                // checked={checkboxValues[item.id] || false}
                                defaultChecked={
                                  initialValues ? initialValues[item.id] : false
                                }
                                onChange={(e) => {
                                  setCheckboxValues({
                                    ...checkboxValues,
                                    [item.id]: e.target.checked,
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={item.id}
                              >
                                {item.placeholder}
                              </label>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal_2;
