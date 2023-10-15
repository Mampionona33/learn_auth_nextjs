import React, {useRef} from 'react';

type FieldConfig = {
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

const CustomModal_1 = ({
  id,
  title,
  body,
  fields,
  handleSubmit
}: {
  id: string;
  title: string;
  body: React.ReactNode;
  fields: FieldConfig[];
  handleSubmit: (formData: { [key: string]: string }) => void;
}) => {
	const formRef = useRef(null);

	const handleFormSubmit =(ev)=>{
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;

	 	const formData: { [key: string]: string } = {};

	  for (let i = 0; i < form.elements.length; i++) {
	    const element = form.elements[i] as HTMLInputElement;

	    if (element.tagName === 'INPUT') {
	      formData[element.id] = element.value;
	    }
	  }

  	console.log(formData);
	}

  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{title}</h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleFormSubmit}>
            	
	            <div className="modal-body">
	              {body ? body : null}
	              {fields && fields.length > 0 ? (
	                <div className="row g-3">
	                  {fields.map((item, key) => (
	                    <div className="col-md-6" key={key}>
	                      <label htmlFor={item.id} className="visually-hidden">{item.placeholder}</label>
	                      <input
	                        type={item.type}
	                        className="form-control"
	                        id={item.id}
	                        placeholder={item.placeholder}
	                        required={item.required}
	                      />
	                    </div>
	                  ))}
	                </div>
	              ) : null}
	            </div>
	            <div className="modal-footer">
	              <button type="button" data-bs-dismiss="modal" className="btn btn-secondary">Annuler</button>
	              {/*<button type="button" className="btn btn-primary" onClick={handleSubmit}>Valider</button>*/}
	              <input type="submit" value="Save" />
	            </div>
            
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomModal_1;
