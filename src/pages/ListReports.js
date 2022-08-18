import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { getAllReports } from "../api/services/reports";

const ListReports = () => {
  const [reports, setReports] = useState(undefined);

  const fetchAllReports = async () => {
    const response = await getAllReports();
    if (response.status === "success") {
      setReports(response.data);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports &&
            reports.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 8,
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}.
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      // setShowEditModal(true);
                      // setDistrict(row.name);
                      // setSelectedDistrictId(row._id);
                      // setStateId(row.state);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      // setShowDeleteModal(true);
                      // setDistrict(row.name);
                      // setSelectedDistrictId(row._id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListReports;
