import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import {
  getAllSchemes,
  addScheme,
  updateScheme,
  deleteScheme,
} from "../api/services/schemes";
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
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardWrapper from "../Components/common/DashboardWrapper";
import { Input } from "@mui/material";

export default function Schemes() {
  const [schemes, setSchemes] = useState(undefined);
  const [scheme, setScheme] = useState("");
  const [description, setDescription] = useState("");
  const [docs, setDocs] = useState(undefined);
  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllSchemes = async () => {
    const response = await getAllSchemes();
    if (response.status === "success") {
      setSchemes(response.data);
    }
  };

  console.log(docs);

  const handleAdd = async () => {
    const response = await addScheme({
      name: scheme,
      description: description,
    });
    if (response.status === "success") {
      setScheme("");
      setDescription("");
      setDocs(undefined);
      setShowAddModal(false);
      fetchAllSchemes();
    }
  };

  const handleUpdate = async () => {
    const response = await updateScheme(selectedSchemeId, {
      name: scheme,
      docs: docs,
      description: description,
    });
    if (response.status === "success") {
      setScheme("");
      setDescription("");
      setDocs(undefined);
      setSelectedSchemeId("");
      setShowEditModal(false);
      fetchAllSchemes();
    }
  };

  const handleDelete = async () => {
    const response = await deleteScheme(selectedSchemeId);
    if (response.status === "success") {
      setScheme("");
      setDescription("");
      setDocs(undefined);
      setSelectedSchemeId("");
      setShowDeleteModal(false);
      fetchAllSchemes();
    }
  };

  useEffect(() => {
    fetchAllSchemes();
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
          <h2>Schemes</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Scheme
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
            {schemes &&
              schemes.map((row, index) => (
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
                        setScheme(row.name);
                        setDescription(row.description);
                        setSelectedSchemeId(row._id);
                        setDocs(row.docs);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setScheme(row.name);
                        setSelectedSchemeId(row._id);
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
          setScheme("");
          setDocs(undefined);
          setDescription("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Scheme</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Scheme"
            type="text"
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
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
              setScheme("");
              setDescription("");
              setDocs(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!scheme || !description || !docs}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setScheme("");
          setDocs(undefined);
          setDescription("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Scheme</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Scheme"
            type="text"
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setScheme("");
              setDescription("");
              setDocs(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!scheme || !description || !docs}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this scheme?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
