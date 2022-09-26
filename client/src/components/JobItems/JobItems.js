import React, { Fragment, useState } from "react";

import IconEdit from '../../images/icon-edit.png';
import IconPhone from '../../images/icon-phone.png';
import IconEmail from '../../images/icon-email.png';

import './JobItems.scss';
import Jobform from "../Jobform/Jobform";
import Modal from "react-modal"
import IconClose from "../../images/icon-close.png";

function JobItems (props) {
  const {_id, name, phone, email, title, status, note} = props.item;
  const statusClassList = status && `job-item-status status-${status.replace(' ','-').toLowerCase()}` ;
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  const updateJob = (_id) => {
    setModalIsOpen(true)

  }
  return (
    <Fragment>
      <div className="item job-item" key={props.index}>
        <div className="job-item-header">
          <div className="job-item-title">
            <h3>{title}</h3>
            <button onClick={()=> { updateJob(_id) }} className="button-icon"><img src={IconEdit} alt="Edit icon" /></button>
          </div>
          <span className={statusClassList}>{status}</span>
        </div>
        <div className="job-item-meta">
          <span><strong>Client</strong>{name}</span>
          {phone && (
            <span><img className="icon monogram-title" src={IconPhone} alt="Phone icon" />{phone}</span>
          )}
          {email && (
            <span><img className="icon monogram-title" src={IconEmail} alt="Email icon" />{email}</span>
          )}
        </div>
        {note && (
          <div className="job-item-note">
            <strong>Note</strong><p>{note}</p>
          </div>
        )}
      </div>
      <Modal className="modal-popup" isOpen={modalIsOpen} ariaHideApp={false}>
        <button className="button-icon" onClick={()=> setModalIsOpen(false)}>
          <img src={IconClose} alt="Close icon" />
        </button>
        <Jobform item={props.item} />
      </Modal>
    </Fragment>
  )
}

export default JobItems;