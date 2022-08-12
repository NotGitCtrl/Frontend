import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { addHei, deleteHei, getAllHeis, updateHei } from "../api/services/hei";
import { getAllCountries } from "../api/services/countries";
import { getAllStates } from "../api/services/states";
import { getAllDistricts } from "../api/services/districts";
import { getAllUniversities } from "../api/services/universities";
import { getHeiAdmins } from "../api/services/users";
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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardWrapper from "../Components/common/DashboardWrapper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getAllStreams } from "../api/services/streams";

export default function Hei() {
  const [heis, setHeis] = useState(undefined);
  const [hei, setHei] = useState("");
  const [selectedHEIId, setSelectedHEIId] = useState("");

  const [address, setAddress] = useState("");

  const [countries, setCountries] = useState(undefined);
  const [countryId, setCountryId] = useState("");

  const [states, setStates] = useState(undefined);
  const [stateId, setStateId] = useState("");

  const [districts, setDistricts] = useState(undefined);
  const [districtId, setDistrictId] = useState("");

  const [heiAdmins, setHeiAdmins] = useState(undefined);
  const [heiAdminId, setHeiAdminId] = useState("");

  const [universities, setUniversities] = useState(undefined);
  const [universityId, setUniversityId] = useState("");

  const [streams, setStreams] = useState(undefined);
  const [streamIds, setStreamIds] = useState([]);

  const [courses, setCourses] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllHeis = async () => {
    const response = await getAllHeis();
    if (response.status === "success") {
      setHeis(response.data);
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

  const fetchAllHeiAdmins = async () => {
    const response = await getHeiAdmins();
    if (response.status === "success") {
      setHeiAdmins(response.data);
    }
  };

  const fetchAllUniversities = async () => {
    const response = await getAllUniversities();
    if (response.status === "success") {
      setUniversities(response.data);
    }
  };

  const fetchAllStreams = async () => {
    const response = await getAllStreams();
    if (response.status === "success") {
      setStreams(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addHei({
      name: hei,
      address: address,
      country: countryId,
      state: stateId,
      district: districtId,
      heiAdmin: heiAdminId,
      university: universityId,
      streams: streamIds,
      courses: courses,
    });
    if (response.status === "success") {
      setHei("");

      setCountryId("");
      setStateId("");
      setDistrictId("");
      setHeiAdminId("");
      setUniversityId("");
      setStreamIds([]);
      setCourses([]);
      setAddress("");

      setShowAddModal(false);
      fetchAllHeis();
    }
  };

  const handleUpdate = async () => {
    const response = await updateHei(selectedHEIId, {
      name: hei,
      address: address,
      country: countryId,
      state: stateId,
      district: districtId,
      heiAdmin: heiAdminId,
      university: universityId,
      streams: streamIds,
    });
    if (response.status === "success") {
      setHei("");

      setCountryId("");
      setStateId("");
      setDistrictId("");
      setSelectedHEIId("");
      setHeiAdminId("");
      setUniversityId("");
      setStreamIds([]);
      setCourses([]);
      setAddress("");

      setShowEditModal(false);
      fetchAllHeis();
    }
  };

  const handleDelete = async () => {
    const response = await deleteHei(selectedHEIId);
    if (response.status === "success") {
      setHei("");

      setCountryId("");
      setStateId("");
      setDistrictId("");
      setSelectedHEIId("");
      setHeiAdminId("");
      setUniversityId("");
      setStreamIds([]);
      setCourses([]);
      setAddress("");

      setShowDeleteModal(false);
      fetchAllHeis();
    }
  };

  const handleStreamChange = (e) => {
    setStreamIds(e.target.value);
    let courseNames = [];
    for (let i = 0; i < e.target.value.length; i++) {
      streams.forEach((stream) => {
        if (stream._id === e.target.value[i]) {
          for (let j = 0; j < stream.courses.length; j++) {
            courseNames.push(stream.courses[j]);
          }
        }
      });
    }
    setCourses(courseNames);
  };

  const handleCourseChange = (e) => {
    console.log(courses);
    setCourses(e.target.value);
  };

  useEffect(() => {
    fetchAllHeis();
    fetchAllCountries();
    fetchAllStates();
    fetchAllDistricts();
    fetchAllUniversities();
    fetchAllStreams();
    fetchAllHeiAdmins();
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
          <h2>HEIs</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add HEI
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
            {heis &&
              heis.map((row, index) => (
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
                        setHei(row.name);
                        setSelectedHEIId(row._id);
                        setCountryId(row.country);
                        setStateId(row.state);
                        setDistrictId(row.district);
                        setHeiAdminId(row.heiAdmin);
                        setUniversityId(row.university);
                        setStreamIds(row.streams);
                        setCourses(row.courses);
                        setAddress(row.address);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setHei(row.name);
                        setSelectedHEIId(row._id);
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
          setHei("");
          setCountryId("");
          setStateId("");
          setDistrictId("");
          setHeiAdminId("");
          setUniversityId("");
          setStreamIds([]);
          setCourses([]);
          setAddress("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add HEI</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="HEI"
            type="text"
            value={hei}
            onChange={(e) => setHei(e.target.value)}
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
              label="Country"
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
              label="Country"
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
            <InputLabel id="demo-simple-select-label">HEI Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiAdminId}
              label="HEI Admin"
              onChange={(e) => setHeiAdminId(e.target.value)}
            >
              {heiAdmins &&
                heiAdmins.map((heiAdmin) => (
                  <MenuItem key={heiAdmin._id} value={heiAdmin._id}>
                    {heiAdmin.firstName + heiAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">University</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={universityId}
              label="University"
              onChange={(e) => setUniversityId(e.target.value)}
            >
              {universities &&
                universities.map((university) => (
                  <MenuItem key={university._id} value={university._id}>
                    {university.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Streams</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={streamIds}
              label="University"
              onChange={handleStreamChange}
            >
              {streams &&
                streams.map((stream) => (
                  <MenuItem key={stream._id} value={stream._id}>
                    {stream.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={courses}
              label="Courses"
              onChange={handleCourseChange}
            >
              {courses &&
                courses.map((course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setHei("");

              setCountryId("");
              setStateId("");
              setDistrictId("");
              setHeiAdminId("");
              setUniversityId("");
              setStreamIds([]);
              setCourses([]);
              setAddress("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !hei ||
              !countryId ||
              !stateId ||
              !districtId ||
              !heiAdminId ||
              !universityId ||
              !address
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
          setHei("");

          setCountryId("");
          setStateId("");
          setDistrictId("");
          setHeiAdminId("");
          setUniversityId("");
          setStreamIds([]);
          setCourses([]);
          setAddress("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit HEI</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="HEI"
            type="text"
            value={hei}
            onChange={(e) => setHei(e.target.value)}
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
              label="Country"
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
              label="Country"
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
            <InputLabel id="demo-simple-select-label">HEI Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={heiAdminId}
              label="HEI Admin"
              onChange={(e) => setHeiAdminId(e.target.value)}
            >
              {heiAdmins &&
                heiAdmins.map((heiAdmin) => (
                  <MenuItem key={heiAdmin._id} value={heiAdmin._id}>
                    {heiAdmin.firstName + heiAdmin.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">University</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={universityId}
              label="University"
              onChange={(e) => setUniversityId(e.target.value)}
            >
              {universities &&
                universities.map((university) => (
                  <MenuItem key={university._id} value={university._id}>
                    {university.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Streams</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={streamIds}
              label="University"
              onChange={handleStreamChange}
            >
              {streams &&
                streams.map((stream) => (
                  <MenuItem key={stream._id} value={stream._id}>
                    {stream.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={courses}
              label="Courses"
              onChange={handleCourseChange}
            >
              {courses &&
                courses.map((course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setHei("");

              setCountryId("");
              setStateId("");
              setDistrictId("");
              setHeiAdminId("");
              setUniversityId("");
              setStreamIds([]);
              setCourses([]);
              setAddress("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !hei ||
              !countryId ||
              !stateId ||
              !districtId ||
              !heiAdminId ||
              !universityId ||
              !address
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this HEI?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
