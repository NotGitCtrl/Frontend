import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getFAAdmins } from "../api/services/users";
import { getAllCountries } from "../api/services/countries";
import { getAllStates } from "../api/services/states";
import { addFA, deleteFA, getAllFAs, updateFA } from "../api/services/fa";
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
import { getAllDistricts } from "../api/services/districts";

export default function FA() {
  const [fas, setFas] = useState(undefined);
  const [fa, setFa] = useState("");

  const [faAdmins, setFaAdmins] = useState(undefined);
  const [faAdminId, setFaAdminId] = useState("");

  const [address, setAddress] = useState("");

  const [countries, setCountries] = useState(undefined);
  const [countryId, setCountryId] = useState("");

  const [states, setStates] = useState(undefined);
  const [stateId, setStateId] = useState("");

  const [districts, setDistricts] = useState(undefined);
  const [districtId, setDistrictId] = useState("");

  const [selectedFAId, setSelectedFAId] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllFAs = async () => {
    const response = await getAllFAs();
    if (response.status === "success") {
      setFas(response.data);
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

  const fetchAllFAAdmins = async () => {
    const response = await getFAAdmins();
    if (response.status === "success") {
      setFaAdmins(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addFA({
      name: fa,
      address: address,
      country: countryId,
      state: stateId,
      district: districtId,
      admin: faAdminId,
    });
    if (response.status === "success") {
      setFa("");
      setAddress("");
      setCountryId("");
      setStateId("");
      setDistrictId("");
      setFaAdminId("");
      setShowAddModal(false);
      fetchAllFAs();
    }
  };

  const handleUpdate = async () => {
    const response = await updateFA(selectedFAId, {
      name: fa,
      address: address,
      country: countryId,
      state: stateId,
      district: districtId,
      admin: faAdminId,
    });
    if (response.status === "success") {
      setFa("");
      setAddress("");
      setCountryId("");
      setStateId("");
      setDistrictId("");
      setFaAdminId("");
      setSelectedFAId("");

      setShowEditModal(false);
      fetchAllFAs();
    }
  };

  const handleDelete = async () => {
    const response = await deleteFA(selectedFAId);
    if (response.status === "success") {
      setFa("");
      setAddress("");
      setCountryId("");
      setStateId("");
      setDistrictId("");

      setSelectedFAId("");
      setFaAdminId("");

      setShowDeleteModal(false);
      fetchAllFAs();
    }
  };

  useEffect(() => {
    fetchAllFAs();
    fetchAllFAAdmins();
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
          <h2>FAs</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add FA
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
            {fas &&
              fas.map((row, index) => (
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
                        setFa(row.name);
                        setAddress(row.address);
                        setSelectedFAId(row._id);
                        setFaAdminId(row.admin);
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
                        setFa(row.name);
                        setSelectedFAId(row._id);
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
          setFa("");
          setAddress("");
          setFaAdminId("");
          setCountryId("");
          setStateId("");
          setDistrictId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add FA</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="FA"
            type="text"
            value={fa}
            onChange={(e) => setFa(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
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
            <InputLabel id="demo-simple-select-label">State</InputLabel>
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
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={districtId}
              label="State"
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
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={faAdminId}
              label="Admin"
              onChange={(e) => setFaAdminId(e.target.value)}
            >
              {faAdmins &&
                faAdmins.map((faAdmin) => (
                  <MenuItem key={faAdmin._id} value={faAdmin._id}>
                    {faAdmin.firstName + faAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setFa("");
              setAddress("");
              setFaAdminId("");
              setCountryId("");
              setStateId("");
              setDistrictId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !fa ||
              !faAdminId ||
              !address ||
              !countryId ||
              !stateId ||
              !districtId
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
          setFa("");
          setAddress("");
          setFaAdminId("");
          setCountryId("");
          setStateId("");
          setDistrictId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit FA</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="FA"
            type="text"
            value={fa}
            onChange={(e) => setFa(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
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
            <InputLabel id="demo-simple-select-label">State</InputLabel>
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
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={districtId}
              label="State"
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
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={faAdminId}
              label="Admin"
              onChange={(e) => setFaAdminId(e.target.value)}
            >
              {faAdmins &&
                faAdmins.map((faAdmin) => (
                  <MenuItem key={faAdmin._id} value={faAdmin._id}>
                    {faAdmin.firstName + faAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setFa("");
              setAddress("");
              setFaAdminId("");
              setCountryId("");
              setStateId("");
              setDistrictId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !fa ||
              !faAdminId ||
              !address ||
              !countryId ||
              !stateId ||
              !districtId
            }
          >
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
