import React from 'react';

const CustomModal = ({ title, body, id }: {  title: string, body: string | React.ReactNode , id:string}) => {
  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{title}</h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {body}
            </div>
            <div className="modal-footer">
              <button type="button" data-bs-dismiss="modal" className="btn btn-secondary">Annuler</button>
              <button type="button" className="btn btn-primary">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
