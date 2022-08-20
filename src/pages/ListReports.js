import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getAllPhases } from "../api/services/phases";
import {
  getAllReports,
  addReport,
  updateReport,
  deleteReport,
} from "../api/services/reports";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardWrapper from "../Components/common/DashboardWrapper";
import { Input } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ListReports() {
  const [reports, setReports] = useState(undefined);
  const [report, setReport] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [phases, setPhases] = useState(undefined);
  const [phaseId, setPhaseId] = useState("");
  const { id } = useParams();

  const [docs, setDocs] = useState(undefined);

  const [selectedReportId, setSelectedReportId] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllReports = async () => {
    const response = await getAllReports(id);
    if (response.status === "success") {
      setReports(response.data);
    }
  };

  const fetchAllPhases = async () => {
    const response = await getAllPhases(id);
    if (response.status === "success") {
      setPhases(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addReport({
      name: report,
      description: description,
      remarks: remarks,
      phase: phaseId,
      project: id
    });
    if (response.status === "success") {
      setReport("");
      setDescription("");
      setRemarks("");
      setPhaseId("");
      setDocs(undefined);
      setShowAddModal(false);
      fetchAllReports();
    }
  };

  const handleUpdate = async () => {
    const response = await updateReport(selectedReportId, {
      name: report,
      description: description,
      remarks: remarks,
      phase: phaseId,
    });
    if (response.status === "success") {
      setReport("");
      setDescription("");
      setRemarks("");
      setPhaseId("");
      setDocs(undefined);
      setSelectedReportId("");
      setShowEditModal(false);
      fetchAllReports();
    }
  };

  const handleDelete = async () => {
    const response = await deleteReport(selectedReportId);
    if (response.status === "success") {
      setReport("");
      setDescription("");
      setRemarks("");
      setPhaseId("");
      setDocs(undefined);
      setSelectedReportId("");
      setShowDeleteModal(false);
      fetchAllReports();
    }
  };

  useEffect(() => {
    fetchAllReports();
    fetchAllPhases();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h2>Reports</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Report
          </Button>
        </Grid>
      </Grid>
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
                        setShowEditModal(true);
                        setReport(row.name);
                        setDescription(row.description);
                        setRemarks(row.remarks);
                        setDocs(row.docs);
                        setPhaseId(row.phase);
                        setSelectedReportId(row._id);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setReport(row.name);
                        setSelectedReportId(row._id);
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

      <Dialog
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setReport("");
          setDescription("");
          setRemarks("");
          setDocs(undefined);
          setPhaseId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Report</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Report"
            type="text"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Description"
              type="text"
              value={description}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Remarks"
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Phase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={phaseId}
              label="Country"
              onChange={(e) => setPhaseId(e.target.value)}
            >
              {phases &&
                phases.map((phase) => (
                  <MenuItem key={phase._id} value={phase._id}>
                    {phase.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <Input
              autoFocus
              type="file"
              inputProps={{ multiple: true }}
              onChange={(e) => setDocs(e.target.files)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setReport("");
              setDescription("");
              setRemarks("");
              setPhaseId("");
              setDocs(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!report || !description }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setReport("");
          setDescription("");
          setRemarks("");
          setPhaseId("");
          setDocs(undefined);
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Report</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Report"
            type="text"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Description"
              type="text"
              value={description}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Remarks"
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Phase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={phaseId}
              label="Country"
              onChange={(e) => setPhaseId(e.target.value)}
            >
              {phases &&
                phases.map((phase) => (
                  <MenuItem key={phase._id} value={phase._id}>
                    {phase.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setReport("");
              setDescription("");
              setRemarks("");
              setPhaseId("");
              setDocs(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!report || !description }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this report?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </>
  );
}
