import React, { useRef, useState } from "react";

type FieldConfig = {
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
  name?: string;
  options?: string[];
};

const CustomModal_1 = ({
  id,
  title,
  body,
  fields,
  handleSubmit,
}: {
  id: string;
  title: string;
  body: React.ReactNode;
  fields: FieldConfig[];
  handleSubmit: (formData: { [key: string]: string }) => void;
}) => {
  const formRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const formData: { [key: string]: string } = {};

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i] as HTMLInputElement;

      if (element.tagName === "INPUT") {
        if (element.type === "radio" && element.checked) {
          formData[element.name] = element.value;
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
      <div className="modal" id={id}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{title}</h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
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
                                    className="form-control"
                                    id={item.id}
                                    placeholder={item.placeholder}
                                    required={item.required}
                                  />
                                );

                              case "textarea":
                                return (
                                  <textarea
                                    className="form-control"
                                    id={item.id}
                                    placeholder={item.placeholder}
                                    required={item.required}
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
                                const defaultOption = item.options[0];
                                return (
                                  <fieldset className="form-group">
                                    <div className="row">
                                      <legend className="col-form-label col-sm-2 pt-0">
                                        {item.placeholder}
                                      </legend>
                                      <div className="col-sm-10">
                                        {item.options.map((option, index) => (
                                          <div
                                            key={index}
                                            className="form-check"
                                          >
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name={item.name}
                                              id={`${item.id}-${index}`}
                                              value={option}
                                              defaultChecked={
                                                defaultOption === option
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

                              default:
                                return null;
                            }
                          })()}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                {/*<button type="button" className="btn btn-primary" onClick={handleSubmit}>Valider</button>*/}
                <input type="submit" className="btn btn-primary" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal_1;
