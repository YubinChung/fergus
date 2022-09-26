import React, { useState } from "react";
import axios from 'axios';
import "./Jobform.scss";

const Jobform = props => {
  // const { _id, name, title, status, phone, email, note} = props.item;
  const isEdit = props.item ? true : false;

  const _id = props.item ? props.item._id : null;
  const name = props.item ? props.item.name : '';
  const title = props.item ? props.item.title : '';
  const status = props.item ? props.item.status : 'scheduled';
  const phone = props.item ? props.item.phone : '';
  const email = props.item ? props.item.email : '';
  const note = props.item ? props.item.note : '';

  const [formValue, setformValue] = useState({
    name: name,
    title: title,
    status: status,
    phone: phone,
    email: email,
    note: note
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const jobStatus = ['scheduled', 'active', 'invoicing', 'to priced', 'completed'];

  const submitForm = () => {
    const checkData = () => {
      let hasInvalidData = false;

      // Check form data - all fields are required.
      for (const property in formValue) {
        if (!hasInvalidData && formValue[property] === '' ){
          hasInvalidData = true;
        }
      }
      
      if (!hasInvalidData){
        fetchData();
      } else {
        alert('Please enter all mandatory fields.');
        return false;
      }
    }

    async function fetchData() {
      try {
        // Check all form data
        
        isEdit && await axios.put(`http://localhost:3000/api/jobs/${_id}`,formValue) // Edit Job
        !isEdit && await axios.post(`http://localhost:3000/api/jobs`,formValue)  // Add Job
       
      } catch(error) {
        console.log('Job form submission error', error);
      }
    }
    checkData();
  }


  return (
    <div className="form jobform jobform-edit">
      <h3>{isEdit ? 'Edit' : 'Add'} Job</h3>
      <form>
        <div className="input-wrapper">
          <label htmlFor="form-job-title">Job Title <span className="color-primary">*</span></label>
          <input id="form-job-title" className="form-input" type="text" name="title" value={formValue.title} onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="form-job-name">Client Name <span className="color-primary">*</span></label>
          <input id="form-job-name" className="form-input" type="text" name="name" value={formValue.name} onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="form-job-status">Status <span className="color-primary">*</span></label>
          <span className="form-input select_wrap">
            <select id="form-job-status" onChange={handleChange} name="status" >
              {jobStatus.map( (item, index) => <option value={item} key={index}>{item}</option>)}
            </select>
          </span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="form-job-phone">Phone <span className="color-primary">*</span></label>
          <input id="form-job-phone" className="form-input" type="text" name="phone" value={formValue.phone} onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="form-job-email">Email <span className="color-primary">*</span></label>
          <input id="form-job-email" className="form-input" type="text" name="email" value={formValue.email} onChange={handleChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="form-job-note">Note <span className="color-primary">*</span></label>
          <textarea id="form-job-note" className="form-input" name="note" maxLength="100" value={formValue.note} onChange={handleChange} />
        </div>
        <button type="submit" className="button button-submit" onClick={submitForm}>Submit</button>
      </form>
    </div>
  )
}

export default Jobform;