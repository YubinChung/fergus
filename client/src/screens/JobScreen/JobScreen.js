import React, { useState, useEffect } from "react";
import JobContainer from "../../components/JobContainer/JobContainer";
import axios from 'axios';
import Modal from 'react-modal';
import Jobform from "../../components/Jobform/Jobform";

import IconClose from "../../images/icon-close.png";

import "./JobScreen.scss";


const JobScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const result = await axios('http://localhost:3000/api/jobs/all');
    setJobs(result.data.job)
  }

  const openModal = () => {
    setModalIsOpen(true); // open Modal popup
  }

  const closeModal = () => {
    setModalIsOpen(false); // close Modal popup
  }

  const handleSorting = (sort) => {
    let sortedJobs = [...jobs];
    sortedJobs = sort === 'created-ascending' ? sortedJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt) ) : sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) );
    
    setJobs(sortedJobs);
  }

  return (
    <div className="job-screen">
      <div className="job-screen-header">
        <h2>Job List</h2>
        <button onClick={openModal} className="button">Add +</button>
      </div>
      <div className="sorting_wrap">
        <label htmlFor="sort_by">Sort by:</label>
        <div className="form-input select_wrap">
          <select id="sort_by" onChange={(e) => handleSorting(e.target.value)}>
            <option value="created-ascending">Date, Old to New</option>
            <option value="created-descending">Date, New to Old</option>
          </select>
        </div>
      </div>
      <JobContainer jobItems={jobs} />
      <Modal className="modal-popup" isOpen={modalIsOpen} ariaHideApp={false}>
        <button className="button-icon" onClick={()=> setModalIsOpen(false)}>
          <img src={IconClose} alt="Close icon" />
        </button>
        <Jobform item={null} handleClose={closeModal} handleNext={getJobs} />
      </Modal>
    </div>
  );
};

export default JobScreen;
