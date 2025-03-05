import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, message } from "antd";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachmentType, setAttachmentType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      if (attachment.startsWith("data:image")) {
        setAttachmentType("image");
      } else if (attachment.startsWith("data:application/pdf")) {
        setAttachmentType("pdf");
      } else {
        setAttachmentType("other");
      }
      setSelectedAttachment(attachment);
      setIsModalVisible(true);
    } else {
      message.info("No attachment available for this contact.");
    }
  };

  // Handle downloading an attachment
  const handleDownloadAttachment = (attachment) => {
    if (attachment) {
      const link = document.createElement("a");
      link.href = attachment;
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
      render: (text) => new Date(text).toLocaleString(),
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
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        rowClassName={() => "hover-row"}
      />

      {/* Attachment Preview Modal */}
      <Modal
        title="Attachment"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedAttachment && (
          <div>
            {attachmentType === "image" ? (
              <img
                src={selectedAttachment}
                alt="Attachment"
                style={{ width: "100%", height: "auto" }}
              />
            ) : attachmentType === "pdf" ? (
              <Document file={selectedAttachment}>
                <Page pageNumber={1} />
              </Document>
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
