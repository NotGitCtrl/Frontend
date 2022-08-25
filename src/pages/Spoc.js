import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getAllCountries } from "../api/services/countries";
import { getAllStates } from "../api/services/states";
import {
  getAllSpoc,
  addSpoc,
  updateSpoc,
  deleteSpoc,
} from "../api/services/spoc";
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
import { useTranslation } from "react-i18next";
import { getAllDistricts } from "../api/services/districts";

export default function Spoc() {
  const { t } = useTranslation();

  const [spocs, setSpocs] = useState(undefined);
  const [spoc, setSpoc] = useState("");
  const [address, setAddress] = useState("");
  const [selectedSpocId, setSelectedSpocId] = useState("");

  const [countries, setCountries] = useState(undefined);
  const [countryId, setCountryId] = useState("");

  const [states, setStates] = useState(undefined);
  const [stateId, setStateId] = useState("");

  const [districts, setDistricts] = useState(undefined);
  const [districtId, setDistrictId] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllSpocs = async () => {
    const response = await getAllSpoc();
    if (response.status === "success") {
      setSpocs(response.data);
    }
  };

  const fetchAllCountries = async () => {
    const response = await getAllCountries();
    if (response.status === "success") {
      setCountries(response.data);
    }
  };

  const fetchAllStates = async () => {
    const response = await getAllStates();
    if (response.status === "success") {
      setStates(response.data);
    }
  };

  const fetchAllDistricts = async () => {
    const response = await getAllDistricts();
    if (response.status === "success") {
      setDistricts(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addSpoc({
      name: spoc,
      country: countryId,
      state: stateId,
      district: districtId,
      address: address,
    });
    if (response.status === "success") {
      setSpoc("");
      setDistrict("");
      setCountryId("");
      setStateId("");
      setDistrictId("");
      setShowAddModal(false);
      fetchAllSpocs();
    }
  };

  const handleUpdate = async () => {
    const response = await updateSpoc(selectedSpocId, {
      name: spoc,
      address: address,
      country: countryId,
      state: stateId,
      district: districtId,
    });
    if (response.status === "success") {
      setSpoc("");
      setAddress("");
      setCountryId("");
      setStateId("");
      setDistrictId("");
      setSelectedSpocId("");
      setShowEditModal(false);
      fetchAllSpocs();
    }
  };

  const handleDelete = async () => {
    const response = await deleteSpoc(selectedSpocId);
    if (response.status === "success") {
      setSpoc("");
      setAddress("");
      setCountryId("");
      setStateId("");
      setDistrictId("");
      setSelectedSpocId("");
      setShowDeleteModal(false);
      fetchAllSpocs();
    }
  };

  useEffect(() => {
    fetchAllSpocs();
    fetchAllCountries();
    fetchAllStates();
    fetchAllDistricts();
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
          <h2>{t("SPOC")}</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            {t("Add New SPOC")}
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
            {spocs &&
              spocs.map((row, index) => (
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
                        setSpoc(row.name);
                        setAddress(row.address);
                        setSelectedSpocId(row._id);
                        setCountryId(row.country);
                        setStateId(row.state);
                        setDistrictId(row.district);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSpoc(row.name);
                        setSelectedSpocId(row._id);
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
          setSpoc("");
          setAddress("");
          setCountryId("");
          setStateId("");
          setDistrictId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Add New SPOC")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("SPOC Name")}
            type="text"
            value={spoc}
            onChange={(e) => setSpoc(e.target.value)}
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
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">{t("State")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stateId}
              label="State"
              onChange={(e) => setStateId(e.target.value)}
            >
              {states &&
                states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              {t("District")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={districtId}
              label="District"
              onChange={(e) => setDistrictId(e.target.value)}
            >
              {districts &&
                districts.map((district) => (
                  <MenuItem key={district._id} value={district._id}>
                    {district.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setSpoc("");
              setAddress("");
              setCountryId("");
              setStateId("");
              setDistrictId("");
            }}
          >
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !spoc || !address || !countryId || !stateId || !districtId
            }
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSpoc("");
          setAddress("");
          setCountryId("");
          setStateId("");
          setDistrictId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>{t("Edit SPOC")}</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label={t("SPOC Name")}
            type="text"
            value={spoc}
            onChange={(e) => setSpoc(e.target.value)}
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
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">{t("State")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stateId}
              label="State"
              onChange={(e) => setStateId(e.target.value)}
            >
              {states &&
                states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              {t("District")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={districtId}
              label="District"
              onChange={(e) => setDistrictId(e.target.value)}
            >
              {districts &&
                districts.map((district) => (
                  <MenuItem key={district._id} value={district._id}>
                    {district.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setSpoc("");
              setAddress("");
              setCountryId("");
              setStateId("");
              setDistrictId("");
            }}
          >
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !spoc || !address || !countryId || !stateId || !districtId
            }
          >
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message={t("Are you sure you want to delete this SPOC?")}
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
