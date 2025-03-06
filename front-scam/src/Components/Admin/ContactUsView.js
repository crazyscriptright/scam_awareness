import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Modal, Spin, message as antdMessage } from "antd";
import { FaSyncAlt, FaEye, FaPaperclip } from "react-icons/fa";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const ContactUsView = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      antdMessage.error("Failed to fetch contact messages.");
    }
    setLoading(false);
  };

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.message.toLowerCase().includes(search.toLowerCase()) ||
      String(contact.contact_id).includes(search)
  );

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
    },
    {
      title: "Submitted At",
      dataIndex: "submitted_at",
      key: "submitted_at",
      sorter: (a, b) => new Date(a.submitted_at) - new Date(b.submitted_at),
      render: (text) => dayjs(text).format("YYYY-MM-DD | HH:mm:ss"),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <div>
          {text.length > 15 ? (
            <>
              {text.substring(0, 15)}...
              <Button type="link" icon={<FaEye />} onClick={() => handleOpenModal(text)} />
            </>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      render: (attachment) =>
        attachment ? (
          <a href={attachment} target="_blank" rel="noopener noreferrer">
            <Button type="link" icon={<FaPaperclip />}>View</Button>
          </a>
        ) : (
          "No Attachment"
        ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-x-auto p-5"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">Contact Messages</h2>
        <Button type="primary" icon={<FaSyncAlt />} onClick={fetchContacts} loading={loading}>
          Refresh
        </Button>
      </div>

      {/* Search Bar */}
      <Input
        placeholder="Search by Contact ID or Message"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg"
      />

      {/* Table */}
      {loading ? (
        <div className="flex justify-center">
          <Spin tip="Loading messages..." />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="contact_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* Message Modal */}
      <Modal
        title="Full Message"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <p>{selectedMessage}</p>
      </Modal>
    </motion.div>
  );
};

export default ContactUsView;
