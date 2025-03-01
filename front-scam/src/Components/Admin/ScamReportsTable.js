import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Table, Input, Select, Button, message, Spin, Progress } from "antd";
import { FaSort, FaFilter, FaSyncAlt } from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";

const ScamReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ scamType: "", reportStatus: "" });
  const [sortedInfo, setSortedInfo] = useState({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/scam-reports");
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to fetch reports. Please try again later.");
    }
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ scamType: "", reportStatus: "" });
  };

  const updateStatus = async (record, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/admin-approval/${record.report_id}`, {
        report_status: newStatus,
      });
      fetchReports();
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status. Please try again.");
    }
  };

  const filteredData = reports.filter(
    (report) =>
      (!filters.scamType || report.scam_type.toLowerCase().includes(filters.scamType.toLowerCase())) &&
      (!filters.reportStatus || report.report_status === filters.reportStatus)
  );

  const columns = [
    {
      title: "Report ID",
      dataIndex: "report_id",
      key: "report_id",
      sorter: (a, b) => a.report_id - b.report_id,
    },
    {
      title: "Scam Type",
      dataIndex: "scam_type",
      key: "scam_type",
    },
    {
      title: "Status",
      dataIndex: "report_status",
      key: "report_status",
      render: (text, record) => (
        <Select defaultValue={text} onChange={(value) => updateStatus(record, value)}>
          <Select.Option value="Submitted">Submitted</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Resolved">Resolved</Select.Option>
        </Select>
      ),
    },
    {
      title: "Scam Date",
      dataIndex: "scam_date",
      key: "scam_date",
      sorter: (a, b) => new Date(a.scam_date) - new Date(b.scam_date),
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      responsive: ["md"],
    },
    {
      title: "Submitted At",
      dataIndex: "submitted_at",
      key: "submitted_at",
      sorter: (a, b) => new Date(a.submitted_at) - new Date(b.submitted_at),
      responsive: ["md"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["lg"], // Hide on small screens
    },
  ];

  return (
    <motion.div
      className="p-4 md:p-6 bg-gray-100 rounded-xl shadow-md overflow-x-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">Scam Reports</h2>
        <Button type="primary" icon={<FaSyncAlt />} onClick={fetchReports} loading={loading}>
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
        <Input
          placeholder="Filter by scam type"
          value={filters.scamType}
          onChange={(e) => handleFilterChange("scamType", e.target.value)}
          prefix={<FaFilter />}
          className="w-full md:w-auto"
        />
        <Select
          placeholder="Filter by status"
          allowClear
          className="w-full md:w-auto"
          onChange={(value) => handleFilterChange("reportStatus", value)}
        >
          <Select.Option value="Submitted">Submitted</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Resolved">Resolved</Select.Option>
        </Select>
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center">
          <Spin tip="Loading reports..." />
          <Progress percent={100} showInfo={false} style={{ width: "100%", marginTop: 16 }} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="report_id"
            pagination={{ pageSize: 10 }} // Show 10 items per page
            loading={loading}
            onChange={(pagination, filters, sorter) => setSortedInfo(sorter)}
            scroll={{ x: "max-content" }} // Allow horizontal scrolling on small screens
          />
        </div>
      )}
    </motion.div>
  );
};

export default ScamReportsTable;
