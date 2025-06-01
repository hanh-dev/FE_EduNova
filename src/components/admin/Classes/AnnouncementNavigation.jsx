import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import './AnnouncementNavigation.css';
import AnnouncementModal from '../NewAnnouncement.jsx/AnnouncementModal';
import { createAnnouncement, deleteAnnouncement, getAllAnnouncement } from '../../../services/api/AdminAPI';
import { toast } from 'react-toastify';

function AnnouncementsTab({classData}) {
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: '',
    priority: 'high',
    target_type: '',
    content: '',
    type: 'warning'
  });
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const handleDelete = async(id) => {
    const updated = allAnnouncements.filter(item => item.id !== id);
    setAllAnnouncements(updated);
    const res = await deleteAnnouncement(id);
    if(res.status) {
      toast.success("Announcement deleted!");
      setReload(prev => !prev);
    }
    setOpenOptionsId(null);
  };

  useEffect(() => {
    const getAllAnnouncementData = async() => {
      const response = await getAllAnnouncement();
      setAllAnnouncements(response);
    };
    getAllAnnouncementData();
  }, [reload])

  const selectedClass = classData.find(cls => cls.name === announcement.target_type);
  const payload = {
    title: announcement.title.trim(),
    content: announcement.content.trim(),
    priority: announcement.priority.toLowerCase(),
    target_type: selectedClass ? 'class' : 'all',
    target_id: selectedClass ? selectedClass.id : null
  }

  const handleSubmit = async() => {
    const result = await createAnnouncement(payload);
    if(result.status) {
      toast.success("Successfully created an announcement!");
      setReload(prev => !prev);
      setShowModal(false);
      setAnnouncement({
        title: '',
        priority: 'high',
        target_type: '',
        content: '',
        type: 'warning'
      })
    }else {
      toast.error("Failed at creating a new accouncement!")
    }
  }
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-tag high';
      case 'medium':
        return 'priority-tag medium';
      case 'low':
        return 'priority-tag low';
      default:
        return 'priority-tag';
    }
  };

  return (
    <div className="announcements-tab-container">
      {/* Header Section */}
      <div className="announcements-header">
        <div className="header-text">
          <h1>Announcements</h1>
          <p>Manage and publish announcements to students</p>
        </div>
        <button className="new-announcement-button" onClick={() => setShowModal(true)}>
          <FaPlus className="button-icon" /> New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {allAnnouncements.map((announcement) => (
          <div className="announcement-card" key={announcement.id}>
            <div className="card-top-class">
              <h3 className="announcement-title">
                {announcement.title}
                <span className={getPriorityClass(announcement.priority)}>
                  {announcement.priority}
                </span>
              </h3>

              <div className="options-wrapper">
                <button
                  className="more-options-button"
                  onClick={() =>
                    setOpenOptionsId(openOptionsId === announcement.id ? null : announcement.id)
                  }
                >
                  <FaEllipsisV />
                </button>

                {openOptionsId === announcement.id && (
                  <div className="dropdown-menu">
                    <button className="delete-button" onClick={() => handleDelete(announcement.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-details">
              <p>
                By Admin • {new Date(announcement.created_at).toLocaleDateString('en-GB')} • Target: {announcement.class ? announcement.class.name : 'All Students'}
              </p>
            </div>
          </div>
        ))}

      </div>
      {/* Modal */}
      <AnnouncementModal isOpen={showModal} onClose={() => setShowModal(false)} classData={classData} setAnnouncement={setAnnouncement} announcement={announcement} handleSubmit={handleSubmit} setReload={setReload}/>
    </div>
  );
}

export default AnnouncementsTab;