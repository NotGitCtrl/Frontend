import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getAllSchemes } from "../api/services/schemes";
import { getAllHeis } from "../api/services/hei";
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectDetailsRabbit,
  approveProject
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DashboardWrapper from "../Components/common/DashboardWrapper";
import { FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Context";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../api/services/projects";

export default function Projects() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState(undefined);

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("hardware");

  const [schemes, setSchemes] = useState(undefined);
  const [schemeId, setSchemeId] = useState("");

  const [heis, setHeis] = useState(undefined);
  const [heiId, setHeiId] = useState("");

  const { id } = useParams();

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { role } = useContext(AppContext);

//   const fetchProjectDetails = async (id) => {
//     const response = await getProjectDetails(id);
//     if (response.status === "success") {
//       setProject(response.data);
//       console.log(response)
//     }
//   };

  const fetchAllProjects = async () => {
    const response = await getProjectDetailsRabbit(id);
    if (response.status === "success") {
      console.log(response)
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

  const acceptProject = async () => {
    const response = await approveProject(selectedProjectId);
    if (response.status === "success") {
        fetchAllProjects();
    }
  };

  const handleAdd = async () => {
    const response = await addProject({
      name: project,
      description: description,
      category: category,
      scheme: schemeId,
      hei: heiId,
    });
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
      description: description,
      category: category,
      hei: heiId,
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
          <h2>{t("HEI Submissions - project schema")}</h2>
        </Grid>

        <Grid item>
          { role==="hei-admin" && (
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            {t("Add Submission")}
          </Button>
           )}
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Sr. No.")}</TableCell>
              <TableCell align="left">{t("Title")}</TableCell>
              <TableCell align="left">HEI</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              
              {/* <TableCell align="left">Rank</TableCell> */}
              
              <TableCell align="left">{t("Actions")}</TableCell>

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
                  <TableCell align="left">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                  {row.hei.name}
                  </TableCell>
                  <TableCell align="left" width={300}>
                    {row.description}
                  </TableCell>
                  <TableCell align="left">
                    {row.status}
                  </TableCell>
                  <TableCell>
                  <IconButton>
                  <Link to={`/project-detail/${row._id}`}> 
                    <Button variant="contained">   
                            {t("View")}
                        </Button> 
                        </Link> 

                        
                    <Button onClick={()=>{
                        setSelectedProjectId(row._id);
                        acceptProject()
                    }} variant="contained">   
                            {t("Accept")}
                        </Button> 
                        
                    <Button variant="contained">   
                            {t("Reject")}
                        </Button> 
                  </IconButton>
                  
                  { role==="fa-admin" && (
                    <>
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
                    </>                
                  )} 
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
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Add New Project")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("Project Name")}
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
              label={t("Description")}
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
              {t("Category")}
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
                label={t("Hardware")}
              />
              <FormControlLabel
                value="software"
                control={<Radio />}
                label={t("Software")}
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label={t("Hybrid")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">{t("Scheme")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={schemeId}
              label={t("Scheme")}
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
            <InputLabel id="demo-simple-select-label">
              {t("HEI Name")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiId}
              label={t("HEI Name")}
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
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!project || !description || !category || !heiId}
          >
            {t("Add")}
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
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Edit Project")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("Project Name")}
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
              label={t("Description")}
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
              {t("Category")}
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
                label={t("Hardware")}
              />
              <FormControlLabel
                value="software"
                control={<Radio />}
                label={t("Software")}
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label={t("Hybrid")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">{t("Scheme")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={schemeId}
              label={t("Scheme")}
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
            <InputLabel id="demo-simple-select-label">
              {t("HEI Name")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiId}
              label={t("HEI Name")}
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
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !project || !description || !category || !schemeId || !heiId
            }
          >
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message={t("Are you sure you want to delete this project?")}
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
      </Grid>
    </DashboardWrapper>
  );
}
