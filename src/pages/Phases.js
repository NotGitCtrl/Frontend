import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import {
  getAllPhases,
  addPhase,
  updatePhase,
  deletePhase,
} from "../api/services/phases";
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
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAllProjects } from "../api/services/projects";

export default function Phases() {
  const [phases, setPhases] = useState(undefined);
  const [phase, setPhase] = useState("");
  const [projects, setProjects] = useState(undefined);
  const [projectId, setProjectId] = useState("");

  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPhaseId, setSelectedPhaseId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllPhases = async () => {
    const response = await getAllPhases();
    if (response.status === "success") {
      setPhases(response.data);
    }
  };

  const fetchAllProjects = async () => {
    const response = await getAllProjects();
    if (response.status === "success") {
      setProjects(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addPhase({
      name: phase,
      description: description,
      startDate: startDate,
      endDate: endDate,
      projectId: projectId,
    });
    if (response.status === "success") {
      setPhase("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setProjectId("");
      setShowAddModal(false);
      fetchAllPhases();
    }
  };

  const handleUpdate = async () => {
    const response = await updatePhase(selectedPhaseId, {
      name: phase,
      description: description,
      startDate: startDate,
      endDate: endDate,
      projectId: projectId,
    });
    if (response.status === "success") {
      setPhase("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setProjectId("");
      setShowEditModal(false);
      fetchAllPhases();
    }
  };

  const handleDelete = async () => {
    const response = await deletePhase(selectedPhaseId);
    if (response.status === "success") {
      setPhase("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setProjectId("");
      setShowDeleteModal(false);
      fetchAllPhases();
    }
  };

  useEffect(() => {
    fetchAllPhases();
    fetchAllProjects();
  }, []);

  return (
    <DashboardWrapper>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h2>Phases</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add New Phase
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
            {phases &&
              phases.map((row, index) => (
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
                        setPhase(row.name);
                        setSelectedPhaseId(row._id);
                        setDescription(row.description);
                        setStartDate(row.startDate);
                        setEndDate(row.endDate);
                        setProjectId(row.projectId);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setPhase(row.name);
                        setSelectedPhaseId(row._id);
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
          setPhase("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          setProjectId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Phase</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectId}
              label="Project"
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects &&
                projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setPhase("");
              setDescription("");
              setStartDate("");
              setEndDate("");
              setProjectId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !phase || !description || !startDate || !endDate || !projectId
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setPhase("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          setProjectId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Phase</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Phase"
            type="text"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectId}
              label="Project"
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects &&
                projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setPhase("");
              setDescription("");
              setStartDate("");
              setEndDate("");
              setProjectId("")
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!phase || !description || !startDate || !endDate || !projectId}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this state?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
