// Example of sending a scam report from a React component
import React, { useState } from 'react';

const ScamReportForm = () => {
    const [userId, setUserId] = useState('');
    const [scamType, setScamType] = useState('');
    const [description, setDescription] = useState('');
    const [scamDate, setScamDate] = useState('');
    const [reportStatus, setReportStatus] = useState('Submitted');
    const [proof, setProof] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('scam_type', scamType);
        formData.append('description', description);
        formData.append('scam_date', scamDate);
        formData.append('report_status', reportStatus);
        if (proof) {
            formData.append('proof', proof);
        }

        try {
            const response = await fetch('http://localhost:5000/api/scam-reports', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Report submitted:', data);
            } else {
                console.error('Error submitting report:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User  ID" required />
            <input type="text" value={scamType} onChange={(e) => setScamType(e.target.value)} placeholder="Scam Type" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="date" value={scamDate} onChange={(e) => setScamDate(e.target.value)} required />
            <select value={reportStatus} onChange={(e) => setReportStatus(e.target.value)}>
                <option value="Submitted">Submitted</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for Update">Waiting for Update</option>
                <option value="Under Review">Under Review</option>
                <option value="Escalated">Escalated</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <input type="file" onChange={(e) => setProof(e.target.files[0])} />
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default ScamReportForm;