import { useState, useEffect } from "react";
import ConfirmationModal from "../../Components/common/ConfirmationModal";
import { getUniAdmins } from "../../api/services/users";
import {
  addUniversity,
  deleteUniversity,
  getAllUniversities,
  updateUniversity,
} from "../../api/services/universities";
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
import DashboardWrapper from "../../Components/common/DashboardWrapper";

export default function Universities() {
  const [universities, setUniversities] = useState(undefined);
  const [university, setUniversity] = useState("");
  const [uniAdmins, setUniAdmins] = useState(undefined);
  const [uniAdminId, setUniAdminId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllUniversities = async () => {
    const response = await getAllUniversities();
    if (response.status === "success") {
      setUniversities(response.data);
    }
  };

  const fetchAllUniAdmins = async () => {
    const response = await getUniAdmins();
    if (response.status === "success") {
      setUniAdmins(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addUniversity({
      name: university,
      admin: uniAdminId,
    });
    if (response.status === "success") {
      setUniversity("");
      setUniAdminId("");
      setShowAddModal(false);
      fetchAllUniversities();
    }
  };

  const handleUpdate = async () => {
    const response = await updateUniversity(selectedUniversityId, {
      name: university,
      admin: uniAdminId,
    });
    if (response.status === "success") {
      setUniversity("");
      setUniAdminId("");
      setSelectedUniversityId("");
      setShowEditModal(false);
      fetchAllUniversities();
    }
  };

  const handleDelete = async () => {
    const response = await deleteUniversity(selectedUniversityId);
    if (response.status === "success") {
      setUniversity("");
      setUniAdminId("");
      setSelectedUniversityId("");
      setShowDeleteModal(false);
      fetchAllUniversities();
    }
  };

  useEffect(() => {
    fetchAllUniversities();
    fetchAllUniAdmins();
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
          <h2>Universities</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add University
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
            {universities &&
              universities.map((row, index) => (
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
                        setUniversity(row.name);
                        setSelectedUniversityId(row._id);
                        setUniAdminId(row.admin);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setUniversity(row.name);
                        setSelectedUniversityId(row._id);
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
          setUniversity("");
          setUniAdminId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add University</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="University"
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={uniAdminId}
              label="Admin"
              onChange={(e) => setUniAdminId(e.target.value)}
            >
              {uniAdmins &&
                uniAdmins.map((uniAdmin) => (
                  <MenuItem key={uniAdmin._id} value={uniAdmin._id}>
                    {uniAdmin.firstName + uniAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setUniversity("");
              setUniAdminId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!university || !uniAdminId}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setUniversity("");
          setUniAdminId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit University</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="University"
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={uniAdminId}
              label="Admin"
              onChange={(e) => setUniAdminId(e.target.value)}
            >
              {uniAdmins &&
                uniAdmins.map((uniAdmin) => (
                  <MenuItem key={uniAdmin._id} value={uniAdmin._id}>
                    {uniAdmin.firstName + uniAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setUniversity("");
              setUniAdminId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!university || !uniAdminId}>
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
