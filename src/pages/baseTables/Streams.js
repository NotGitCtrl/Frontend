import { useState, useEffect } from "react";
import ConfirmationModal from "../../Components/common/ConfirmationModal";
import {
  getAllStreams,
  addStream,
  updateStream,
  deleteStream,
} from "../../api/services/streams";
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
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardWrapper from "../../Components/common/DashboardWrapper";

export default function Streams() {
  const [streams, setStreams] = useState(undefined);
  const [streamName, setStreamName] = useState("");
  const [streamDesc, setStreamDesc] = useState("");
  const [streamCourses, setStreamCourses] = useState("");
  const [selectedStreamId, setSelectedStreamId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const clearFields = () => {
    setStreamName("");
    setStreamDesc("");
    setStreamCourses("");
    setSelectedStreamId("");
  };

  const convertCoursesToArray = (courses) => {
    return courses.split(",").map((c) => c.trim());
  };

  const fetchAllStreams = async () => {
    const response = await getAllStreams();
    if (response.status === "success") {
      setStreams(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addStream({
      name: streamName,
      description: streamDesc,
      courses: convertCoursesToArray(streamCourses),
    });
    if (response.status === "success") {
      clearFields();
      setShowAddModal(false);
      fetchAllStreams();
    }
  };

  const handleUpdate = async () => {
    const response = await updateStream(selectedStreamId, {
      name: streamName,
      description: streamDesc,
      courses: convertCoursesToArray(streamCourses),
    });
    if (response.status === "success") {
      clearFields();
      setShowEditModal(false);
      fetchAllStreams();
    }
  };

  const handleDelete = async () => {
    const response = await deleteStream(selectedStreamId);
    if (response.status === "success") {
      clearFields();
      setShowDeleteModal(false);
      fetchAllStreams();
    }
  };

  useEffect(() => {
    fetchAllStreams();
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
          <h2>Streams</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Stream
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Courses</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {streams &&
              streams.map((row, index) => (
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
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.courses.join(", ")}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        setShowEditModal(true);
                        setStreamName(row.name);
                        setStreamDesc(row.description);
                        setStreamCourses(row.courses.join(", "));
                        setSelectedStreamId(row._id);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedStreamId(row._id);
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
          clearFields();
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Stream</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <FormControl fullWidth size="small" sx={{ mb: 4 }}>
            <TextField
              autoFocus
              label="Name"
              type="text"
              value={streamName}
              onChange={(e) => setStreamName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 4 }}>
            <TextField
              autoFocus
              label="Description"
              type="text"
              value={streamDesc}
              onChange={(e) => setStreamDesc(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 0 }}>
            <TextField
              autoFocus
              label="Courses"
              type="text"
              value={streamCourses}
              onChange={(e) => setStreamCourses(e.target.value)}
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
              clearFields();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!streamName || !streamDesc || !streamCourses}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          clearFields();
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Stream</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <FormControl fullWidth size="small" sx={{ mb: 4 }}>
            <TextField
              autoFocus
              label="Name"
              type="text"
              value={streamName}
              onChange={(e) => setStreamName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 4 }}>
            <TextField
              autoFocus
              label="Description"
              type="text"
              value={streamDesc}
              onChange={(e) => setStreamDesc(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 0 }}>
            <TextField
              autoFocus
              label="Courses"
              type="text"
              value={streamCourses}
              onChange={(e) => setStreamCourses(e.target.value)}
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
              clearFields();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!streamName || !streamDesc || !streamCourses}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this stream?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
