import { useState, useEffect } from "react";
import ConfirmationModal from "../../Components/common/ConfirmationModal";
import { getAllCountries } from "../../api/services/countries";
import {
  addState,
  deleteState,
  getAllStates,
  updateState,
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
import DashboardWrapper from "../../Components/common/DashboardWrapper";
import { useTranslation } from "react-i18next";
import SnackBarComponent from "../../Components/common/SnackBarComponent";

export default function States() {
  const { t } = useTranslation();

  const [states, setStates] = useState(undefined);
  const [state, setState] = useState("");
  const [countries, setCountries] = useState(undefined);
  const [countryId, setCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

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
    const response = await addState({ name: state, country_id: countryId });
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setShowAddModal(false);
      fetchAllStates();
      snackbarOpen(response.status, response.message);
    }
  };

  const handleUpdate = async () => {
    const response = await updateState(selectedStateId, {
      name: state,
      country_id: countryId,
    });
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setSelectedStateId("");
      setShowEditModal(false);
      fetchAllStates();
      snackbarOpen(response.status, response.message);
    }
  };

  const handleDelete = async () => {
    const response = await deleteState(selectedStateId);
    if (response.status === "success") {
      setState("");
      setCountryId("");
      setSelectedStateId("");
      setShowDeleteModal(false);
      fetchAllStates();
      snackbarOpen(response.status, response.message);
    }
  };

  const snackbarOpen = (status, message) => {
    setOpen(true);
    setStatus(status);
    setMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchAllStates();
    fetchAllCountries();
  }, []);

  return (
    <DashboardWrapper>
      <SnackBarComponent
        status={status}
        message={message}
        open={open}
        handleClose={handleClose}
      />

      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h2>{t("State")}</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            {t("Add New State")}
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("Sr. No.")}</TableCell>
              <TableCell align="left">{t("Name")}</TableCell>
              <TableCell align="left">{t("Actions")}</TableCell>
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
                        setCountryId(row.country._id);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    {/* <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setState(row.name);
                        setSelectedStateId(row._id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
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
          setCountryId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Add New State")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("State Name")}
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              {t("Country")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryId}
              label="Country"
              onChange={(e) => setCountryId(e.target.value)}
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
              setCountryId("");
            }}
          >
            {t("Cancel")}
          </Button>
          <Button onClick={handleAdd} disabled={!state || !countryId}>
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setState("");
          setCountryId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Edit State")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("State Name")}
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              {t("Country")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryId}
              label="Country"
              onChange={(e) => setCountryId(e.target.value)}
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
              setCountryId("");
            }}
          >
            {t("Cancel")}
          </Button>
          <Button onClick={handleUpdate} disabled={!state || !countryId}>
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message={t("Are you sure you want to delete this state?")}
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
