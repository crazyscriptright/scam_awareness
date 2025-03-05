import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Upload, message } from "antd";
import { motion } from "framer-motion";
import { UserOutlined, MailOutlined, PaperClipOutlined } from "@ant-design/icons";

const { Item } = Form;
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch user ID from session on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/userid_fetch", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        if (response.data.user_id) {
          setUserId(response.data.user_id);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Handle file upload
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64File = reader.result.split(",")[1]; // Remove metadata from base64
      setAttachment(base64File); // Store only the base64 content
    };
    reader.onerror = () => {
      message.error("Failed to upload attachment.");
    };
    return false; // Prevent automatic upload
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const { name, email, message: userMessage } = values;

    if (!userId) {
      message.error("You must be logged in to submit a message.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/contactus", {
        user_id: userId, // Use the fetched user ID
        message: userMessage,
        attachment, // Send base64-encoded file
      });

      if (response.data) {
        message.success("Your message has been submitted successfully!");
        form.resetFields();
        setAttachment(null);
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      message.error("Failed to submit your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Contact Us</h2>
      <Form form={form} onFinish={handleSubmit}>
        {/* Name */}
        <Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              placeholder="Enter your name"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </motion.div>
        </Item>

        {/* Email */}
        <Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              placeholder="Enter your email"
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </motion.div>
        </Item>

        {/* Message */}
        <Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <TextArea placeholder="Enter your message" rows={4} />
          </motion.div>
        </Item>

        {/* Attachment */}
        <Item label="Attachment">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Upload
              beforeUpload={handleFileUpload}
              maxCount={1}
              accept="image/*,application/pdf"
              listType="picture"
            >
              <Button icon={<PaperClipOutlined />}>Upload Attachment</Button>
            </Upload>
          </motion.div>
        </Item>

        {/* Submit Button */}
        <Item>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%", marginTop: 16 }}
            >
              Submit
            </Button>
          </motion.div>
        </Item>
      </Form>
    </motion.div>
  );
};

export default ContactUs;
