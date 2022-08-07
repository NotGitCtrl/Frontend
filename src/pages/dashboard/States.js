import { useState, useEffect } from "react";
import ConfirmationModal from "../../Components/common/ConfirmationModal";
import { getAllCountries } from "../../api/services/countries";
import {
  addState,
  deleteState,
  getAllStates,
  updateState,
  showState,
  editState,
} from "../../api/services/states";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import DashboardWrapper from "../../Components/common/DashboardWrapper";

export default function States() {
  const [states, setStates] = useState(undefined);
  const [state, setState] = useState("");
  const [countries, setCountries] = useState(undefined);
  const [country, setCountry] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedStateCountry, setSelectedStateCountry] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEyeModal, setShowEyeModal] = useState(false);

  const fetchAllStates = async () => {
    const response = await getAllStates();
    if (response.status === "success") {
      setStates(response.data);
    }
  };

  const fetchAllCountries = async () => {
    const response = await getAllCountries();
    if (response.status === "success") {
      setCountries(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addState({ country_id: country, name: state });
    if (response.status === "success") {
      setState("");
      setCountry("");
      setShowAddModal(false);
      fetchAllStates();
    }
  };

  const handleUpdate = async () => {
    const response = await updateState({
      id: selectedStateId,
      country,
      name: state,
    });
    if (response.status === "success") {
      setState("");
      setCountry("");
      setSelectedStateId("");
      setShowEditModal(false);
      fetchAllStates();
    }
  };

  const handleDelete = async () => {
    const response = await deleteState({ id: selectedStateId });
    if (response.status === "success") {
      setShowDeleteModal(false);
      setState("");
      fetchAllStates();
    }
  };

  // const editState = async (stateid) => {
  //   console.log(stateid);
  //   const response = await editState({ id: stateid });
  //   if (response.status === "success") {
  //     setSelectedStateCountry(response.data.country.name);
  //   }
  // };

  const eyeModal = async (stateid) => {
    console.log(stateid);
    const response = await showState({ id: stateid });
    if (response.status === "success") {
      setSelectedStateCountry(response.data.country.name);
    }
  };

  useEffect(() => {
    fetchAllStates();
    fetchAllCountries();
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
          <h2>States</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add State
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
            {states &&
              states.map((row, index) => (
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
                        setState(row.name);
                        setSelectedStateId(row._id);
                        editState(row._id);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setState(row.name);
                        setSelectedStateId(row._id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowEyeModal(true);
                        setState(row.name);
                        eyeModal(row._id);
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
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
          setState("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add State</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              defaultValue=""
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries &&
                countries.map((country) => (
                  <MenuItem key={country._id} value={country._id}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setState("");
              setCountry("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setState("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit State</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries &&
                countries.map((country) => (
                  <MenuItem key={country._id} value={country._id}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setState("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEyeModal}
        onClose={() => {
          setShowEyeModal(false);
          setSelectedStateCountry("");
        }}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>State Details</DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>State: {state}</Typography>
          <Typography gutterBottom>Country: {selectedStateCountry}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEyeModal(false);
              setSelectedStateCountry("");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this state?"
        handleClose={() => {
          setShowDeleteModal(false);
        }}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
