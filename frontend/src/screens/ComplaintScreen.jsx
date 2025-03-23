import React, { useEffect, useState } from 'react';
import { apiHelper } from '../utils/utils';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import ComplaintCard from '../components/ComplaintCard';

function ComplaintScreen() {
  const [complaintlist, setComplaintList] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const openModal = () => setEdit(true);
  const closeModal = () => setEdit(false);
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    type: '',
  });

  const fetchComplaint = () => {
    apiHelper.get('/api/complaints/mycomplaints').then((res) => {
      setComplaintList(res.data);
    });
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint.type === '') return toast.error('Type must be filled!');
    apiHelper
      .post('/api/complaints/add', complaint)
      .then((res) => {
        toast.success(res.data);
        fetchComplaint();
        closeModal();
      })
      .catch((error) => {
        toast.error(error.data);
      });
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-10 lg:px-40">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 w-full">
          <h1 className="text-2xl font-semibold">Complaint Page</h1>
          <button
            className="py-2 bg-green-600 text-white rounded-md font-semibold px-4 mt-3 md:mt-0"
            onClick={openModal}
          >
            Add Complaint
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center font-light border-collapse">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th className="px-2 md:px-6 py-4">#</th>
                <th className="px-2 md:px-6 py-4">Type</th>
                <th className="px-2 md:px-6 py-4">Title</th>
                <th className="px-2 md:px-6 py-4">Description</th>
                <th className="px-2 md:px-6 py-4">Status</th>
                <th className="px-2 md:px-6 py-4">Date</th>
                <th className="px-2 md:px-6 py-4"><MdModeEdit /></th>
              </tr>
            </thead>
            <tbody>
              {complaintlist.map((item, i) => (
                <ComplaintCard onDelete={fetchComplaint} key={item._id} item={item} i={i} />
              ))}
            </tbody>
          </table>
        </div>
        {complaintlist.length === 0 && (
          <div className="w-full text-lg font-semibold flex items-center justify-center h-[50vh]">
            You haven't registered any complaints
          </div>
        )}
      </div>

      <ReactModal
        isOpen={isEdit}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9,
          },
          content: {
            width: '90%',
            maxWidth: '400px',
            minHeight: '60%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-semibold">Add New Complaint</p>
            <button className="px-4 py-1 rounded-md text-white bg-red-500 hover:bg-red-600" onClick={closeModal}>
              Close
            </button>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Complaint Type</label>
            <select className="input mt-2 p-2 border rounded-md" name="type" onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Technical">Technical</option>
              <option value="Delivery">Delivery Issue</option>
              <option value="Return and Refund">Return and Refund</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Complaint Title</label>
            <input
              type="text"
              className="input mt-2 p-2 border rounded-md"
              name="title"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              autoComplete="off"
              className="input mt-2 p-2 border rounded-md"
              rows="2"
              onChange={handleChange}
              required
            />
          </div>
          <button className="w-full text-md rounded-md font-semibold text-white bg-green-600 py-3 hover:bg-green-700">
            Register Complaint
          </button>
        </form>
      </ReactModal>
    </div>
  );
}

export default ComplaintScreen;
