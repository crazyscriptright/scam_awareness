import React, { useState } from "react";
import axios from "axios";
import { Form, Input, DatePicker, Button, message, Row, Col, Select } from "antd";
import { motion } from "framer-motion"; // For animations
import { UserAddOutlined } from "@ant-design/icons"; // For icons

const { Item } = Form;
const { Password } = Input;
const { Option } = Select;

const UserManagement = () => {
  const [createUserForm] = Form.useForm();
  const [blockUnblockForm] = Form.useForm();
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [blockUnblockLoading, setBlockUnblockLoading] = useState(false);

  // Handle Create External User form submission
  const handleCreateUserSubmit = async (values) => {
    const { name, dob, email, password } = values;

    try {
      setCreateUserLoading(true);
      const response = await axios.post("http://localhost:5000/api/create_external_user", {
        name,
        dob: dob.format("YYYY-MM-DD"), // Format date
        email: email.toLowerCase(), // Convert email to lowercase
        password,
      });

      if (response.data) {
        message.success("User created successfully!");
        createUserForm.resetFields(); // Reset the form
      }
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Failed to create user. Please try again.");
    } finally {
      setCreateUserLoading(false);
    }
  };

  // Handle Block/Unblock User form submission
  const handleBlockUnblockSubmit = async (values) => {
    const { identifier, status } = values;

    try {
      setBlockUnblockLoading(true);
      const response = await axios.put("http://localhost:5000/api/users/status", {
        identifier: identifier.toLowerCase(), // Convert to lowercase
        status,
      });

      if (response.data) {
        message.success(`User status updated to ${status} successfully!`);
        blockUnblockForm.resetFields(); // Reset the form
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status. Please try again.");
    } finally {
      setBlockUnblockLoading(false);
    }
  };

  // Convert email input to lowercase as the user types
  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase();
    createUserForm.setFieldsValue({ email: lowercaseEmail });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      transition={{ duration: 0.5 }} // Animation duration
      style={{ padding: 20 }}
    >
      <Row gutter={[24, 24]}>
        {/* Create External User Column */}
        <Col xs={24} md={12}>
          <motion.div
            style={{
              padding: 20,
              borderRadius: 10,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              background: "white",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>
              <UserAddOutlined style={{ marginRight: 8 }} />
              Create External User
            </h2>

            <Form form={createUserForm} onFinish={handleCreateUserSubmit}>
              {/* Name */}
              <Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter the user's name" }]}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input placeholder="Enter name" />
                </motion.div>
              </Item>

              {/* Date of Birth */}
              <Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true, message: "Please select the date of birth" }]}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <DatePicker style={{ width: "100%" }} />
                </motion.div>
              </Item>

              {/* Email */}
              <Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter the user's email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Input
                    placeholder="Enter email"
                    onChange={handleEmailChange} // Convert to lowercase as the user types
                  />
                </motion.div>
              </Item>

              {/* Password */}
              <Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter a password" }]}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Password placeholder="Enter password" />
                </motion.div>
              </Item>

              {/* Submit Button */}
              <Item>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={createUserLoading}
                    style={{ width: "100%", marginTop: 16 }}
                  >
                    Create External User
                  </Button>
                </motion.div>
              </Item>
            </Form>
          </motion.div>
        </Col>

        {/* Block/Unblock User Column */}
        <Col xs={24} md={12}>
          <motion.div
            style={{
              padding: 20,
              borderRadius: 10,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              background: "white",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Block/Unblock User</h2>
            <Form form={blockUnblockForm} onFinish={handleBlockUnblockSubmit}>
              {/* Email or User ID Input */}
              <Item
                name="identifier"
                label="Email or User ID"
                rules={[{ required: true, message: "Please enter the email or user ID" }]}
              >
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Input
                    placeholder="Enter email or user ID"
                    onChange={(e) =>
                      blockUnblockForm.setFieldsValue({ identifier: e.target.value.toLowerCase() })
                    } // Auto-lowercase
                  />
                </motion.div>
              </Item>

              {/* Status Selector */}
              <Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select a status" }]}
              >
                <Select placeholder="Select status" style={{ width: "100%" }}>
                  <Option value="active">Active</Option>
                  <Option value="banned">Banned</Option>
                </Select>
              </Item>

              {/* Submit Button */}
              <Item>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={blockUnblockLoading}
                    style={{ width: "100%", borderRadius: 8 }}
                  >
                    Update Status
                  </Button>
                </motion.div>
              </Item>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default UserManagement;