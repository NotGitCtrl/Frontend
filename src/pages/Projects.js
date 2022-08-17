import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getAllSchemes } from "../api/services/schemes";
import { getAllHeis } from "../api/services/hei";
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../api/services/projects";
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
import { FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";

export default function Projects() {
  const [projects, setProjects] = useState(undefined);

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hardware");

  const [schemes, setSchemes] = useState(undefined);
  const [schemeId, setSchemeId] = useState("");

  const [heis, setHeis] = useState(undefined);
  const [heiId, setHeiId] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllProjects = async () => {
    const response = await getAllProjects();
    if (response.status === "success") {
      setProjects(response.data);
    }
  };

  const fetchAllSchemes = async () => {
    const response = await getAllSchemes();
    if (response.status === "success") {
      setSchemes(response.data);
    }
  };

  const fetchAllHeis = async () => {
    const response = await getAllHeis();
    if (response.status === "success") {
      setHeis(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addProject({ name: project, scheme: schemeId });
    if (response.status === "success") {
      setProject("");
      setDescription("");
      setSchemeId("");
      setHeiId("");
      setShowAddModal(false);
      fetchAllProjects();
    }
  };

  const handleUpdate = async () => {
    const response = await updateProject(selectedProjectId, {
      name: project,
      scheme: schemeId,
    });
    if (response.status === "success") {
      setProject("");
      setDescription("");
      setSchemeId("");
      setHeiId("");
      setSelectedProjectId("");
      setShowEditModal(false);
      fetchAllProjects();
    }
  };

  const handleDelete = async () => {
    const response = await deleteProject(selectedProjectId);
    if (response.status === "success") {
      setProject("");
      setDescription("");
      setSchemeId("");
      setHeiId("");
      setSelectedProjectId("");
      setShowDeleteModal(false);
      fetchAllProjects();
    }
  };

  useEffect(() => {
    fetchAllProjects();
    fetchAllSchemes();
    fetchAllHeis();
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
          <h2>Projects</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Project
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
            {projects &&
              projects.map((row, index) => (
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
                        setProject(row.name);
                        setDescription(row.description);
                        setSelectedProjectId(row._id);
                        setSchemeId(row.scheme);
                        setHeiId(row.hei);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setProject(row.name);
                        setSelectedProjectId(row._id);
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
          setProject("");
          setDescription("");
          setSchemeId("");
          setHeiId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Project</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
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
            <FormLabel id="demo-controlled-radio-buttons-group">
              Category
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="hardware"
                control={<Radio />}
                label="Hardware"
              />
              <FormControlLabel
                value="software"
                control={<Radio />}
                label="Software"
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label="Hybrid"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Scheme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={schemeId}
              label="Scheme"
              onChange={(e) => setSchemeId(e.target.value)}
            >
              {schemes &&
                schemes.map((scheme) => (
                  <MenuItem key={scheme._id} value={scheme._id}>
                    {scheme.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">HEI</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiId}
              label="HEI"
              onChange={(e) => setHeiId(e.target.value)}
            >
              {heis &&
                heis.map((hei) => (
                  <MenuItem key={hei._id} value={hei._id}>
                    {hei.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setProject("");
              setDescription("");
              setSchemeId("");
              setHeiId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !project || !description || !category || !schemeId || !heiId
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
          setProject("");
          setDescription("");
          setSchemeId("");
          setHeiId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Project</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
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
            <FormLabel id="demo-controlled-radio-buttons-group">
              Category
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="hardware"
                control={<Radio />}
                label="Hardware"
              />
              <FormControlLabel
                value="software"
                control={<Radio />}
                label="Software"
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label="Hybrid"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Scheme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={schemeId}
              label="Country"
              onChange={(e) => setSchemeId(e.target.value)}
            >
              {schemes &&
                schemes.map((scheme) => (
                  <MenuItem key={scheme._id} value={scheme._id}>
                    {scheme.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">HEI</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiId}
              label="HEI"
              onChange={(e) => setHeiId(e.target.value)}
            >
              {heis &&
                heis.map((hei) => (
                  <MenuItem key={hei._id} value={hei._id}>
                    {hei.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setProject("");
              setDescription("");
              setSchemeId("");
              setHeiId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !project || !description || !category || !schemeId || !heiId
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this project?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
