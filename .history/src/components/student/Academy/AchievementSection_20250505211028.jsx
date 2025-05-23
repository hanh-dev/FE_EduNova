import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";
import AddCertificateButton from "./AddCertificateButton";
import AcademyForm from "./AcademyForm";
import certificateData from "../../../data/certificates.json";
import "./AchievementSection.css";

const AchievementSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setCertificates(certificateData); // Load từ JSON
  }, []);

  const handleAddCertificate = (newCert) => {
    setCertificates([...certificates, newCert]);
    setShowForm(false);
  };

  return (
    <div className="achievement-section">
      <div className="header">
        <h2>Academy achievements</h2>
        <AddCertificateButton onClick={() => setShowForm(true)} />
      </div>

      <div className="card-grid">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} data={cert} />
        ))}
      </div>

      {showForm && (
        <AcademyForm
          onClose={() => setShowForm(false)}
          onSave={handleAddCertificate}
        />
      )}
    </div>
  );
};

export default AchievementSection;
