import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, message } from "antd";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ReactPlayer from "react-player";
import ModalImage from "react-modal-image";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachmentType, setAttachmentType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch contact details from backend
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/contactus", {
        withCredentials: true, // Ensures cookies/session handling if needed
      });
      if (response.data && Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      message.error("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle viewing an attachment
  const handleViewAttachment = (attachment) => {
    if (attachment) {
      const base64String = `data:application/octet-stream;base64,${attachment}`;
      if (base64String.startsWith("data:image")) {
        setAttachmentType("image");
      } else if (base64String.startsWith("data:application/pdf")) {
        setAttachmentType("pdf");
      } else if (base64String.startsWith("data:video")) {
        setAttachmentType("video");
      } else if (base64String.startsWith("data:audio")) {
        setAttachmentType("audio");
      } else {
        setAttachmentType("other");
      }
      setSelectedAttachment(base64String);
      setIsModalVisible(true);
    } else {
      message.info("No attachment available for this contact.");
    }
  };

  // Handle downloading an attachment
  const handleDownloadAttachment = (attachment) => {
    if (attachment) {
      const base64String = `data:application/octet-stream;base64,${attachment}`;
      const link = document.createElement("a");
      link.href = base64String;
      link.download = "attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      message.info("No attachment available for this contact.");
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Contact ID",
      dataIndex: "contact_id",
      key: "contact_id",
      sorter: (a, b) => a.contact_id - b.contact_id,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => (text.length > 50 ? `${text.substring(0, 50)}...` : text),
    },
    {
      title: "Submitted At",
      dataIndex: "submitted_at",
      key: "submitted_at",
      sorter: (a, b) => new Date(a.submitted_at) - new Date(b.submitted_at),
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Attachment",
      key: "attachment",
      render: (_, record) => (
        record.attachment ? (
          <div>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewAttachment(record.attachment)}
              style={{ marginRight: 8 }}
            >
              View
            </Button>
            <Button
              type="link"
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadAttachment(record.attachment)}
            >
              Download
            </Button>
          </div>
        ) : <span style={{ color: "gray" }}>No attachment</span>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: 20,
        borderRadius: 10,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: "white",
      }}
      className="mt-6"
    >
      <h2 className="text-lg md:text-2xl font-bold">Contact Details</h2>
      <Table
        columns={columns}
        dataSource={contacts}
        rowKey="contact_id"
        loading={loading}
        pagination={{ pageSize: 5 }} // Display only 5 rows per page
        scroll={{ x: "max-content" }}
        rowClassName={() => "hover-row"}
      />

      {/* Attachment Preview Modal */}
      <Modal
        title="Attachment"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={isMobile ? "90%" : 800}
      >
        {selectedAttachment && (
          <div>
            {attachmentType === "image" ? (
              <ModalImage
                small={selectedAttachment}
                large={selectedAttachment}
                alt="Attachment"
              />
            ) : attachmentType === "pdf" ? (
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <Viewer fileUrl={selectedAttachment} />
              </Worker>
            ) : attachmentType === "video" ? (
              <ReactPlayer url={selectedAttachment} controls width="100%" />
            ) : attachmentType === "audio" ? (
              <ReactAudioPlayer src={selectedAttachment} autoPlay={false} controls />
            ) : (
              <p>This file type cannot be previewed. Please download it.</p>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default ContactsTable;