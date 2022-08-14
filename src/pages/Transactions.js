import { useState, useEffect } from "react";
import ConfirmationModal from "../Components/common/ConfirmationModal";
import { getAllStates } from "../api/services/states";
import {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/services/transactions";
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
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function Transactions() {
  const [transactions, setTransactions] = useState(undefined);
  const [transaction, setTransaction] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [utr, setUtr] = useState("");

  const [projects, setProjects] = useState(undefined);
  const [projectId, setProjectId] = useState("");

  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllTransactions = async () => {
    const response = await getAllTransactions();
    if (response.status === "success") {
      setTransactions(response.data);
    }
  };

  const fetchAllProjects = async () => {
    const response = await getAllStates();
    if (response.status === "success") {
      setProjects(response.data);
    }
  };

  const handleAdd = async () => {
    const response = await addTransaction({
      name: transaction,
      description: description,
      amount: amount,
      utr: utr,
      project: projectId,
    });
    if (response.status === "success") {
      setTransaction("");
      setDescription("");
      setAmount(0);
      setUtr("");
      setProjectId("");
      setShowAddModal(false);
      fetchAllTransactions();
    }
  };

  const handleUpdate = async () => {
    const response = await updateTransaction(selectedTransactionId, {
      name: transaction,
      description: description,
      amount: amount,
      utr: utr,
      project: projectId,
    });
    if (response.status === "success") {
      setTransaction("");
      setDescription("");
      setAmount(0);
      setUtr("");
      setProjectId("");
      setSelectedTransactionId("");
      setShowEditModal(false);
      fetchAllTransactions();
    }
  };

  const handleDelete = async () => {
    const response = await deleteTransaction(selectedTransactionId);
    if (response.status === "success") {
      setTransaction("");
      setDescription("");
      setAmount(0);
      setUtr("");
      setProjectId("");
      setSelectedTransactionId("");
      setShowDeleteModal(false);
      fetchAllTransactions();
    }
  };

  useEffect(() => {
    fetchAllTransactions();
    fetchAllProjects();
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
          <h2>Transactions</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            Add Transaction
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
            {transactions &&
              transactions.map((row, index) => (
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
                        setTransaction(row.name);
                        setDescription(row.description);
                        setAmount(row.amount);
                        setUtr(row.utr);
                        setSelectedTransactionId(row._id);
                        setProjectId(row.project);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowDeleteModal(true);
                        setTransaction(row.name);
                        setSelectedTransactionId(row._id);
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
          setTransaction("");
          setDescription("");
          setAmount(0);
          setUtr("");
          setProjectId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Add Transaction</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
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
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={createdAt}
              onChange={(newValue) => {
                setCreatedAt(newValue);
              }}
            />
          </LocalizationProvider> */}
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="Amount"
              type="text"
              value={amount}
              inputProps={{ inputMode: "decimal" }}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="UTR"
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectId}
              label="Project"
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects &&
                projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setTransaction("");
              setDescription("");
              setAmount(0);
              setUtr("");
              setProjectId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !transaction || !description || !projectId || !amount || !utr
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
          setTransaction("");
          setDescription("");
          setAmount(0);
          setUtr("");
          setProjectId("");
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>Edit Transaction</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
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
            <TextField
              autoFocus
              label="Amount"
              type="text"
              value={amount}
              inputProps={{ inputMode: "decimal" }}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label="UTR"
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectId}
              label="Project"
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects &&
                projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowEditModal(false);
              setTransaction("");
              setDescription("");
              setUtr("");
              setAmount(0);
              setProjectId("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !transaction || !description || !projectId || !amount || !utr
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationModal
        open={showDeleteModal}
        message="Are you sure you want to delete this transaction?"
        handleClose={() => setShowDeleteModal(false)}
        handleSuccess={handleDelete}
      />
    </DashboardWrapper>
  );
}
