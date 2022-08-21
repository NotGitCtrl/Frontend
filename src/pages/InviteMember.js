import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardWrapper from "../Components/common/DashboardWrapper";

const InviteMember = () => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = async () => {};

  return (
    <DashboardWrapper>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h2>{t("Invite Member")}</h2>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>
            {t("Send Invite")}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
        }}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("Invite Member")}
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label={t("First Name")}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label={t("Last Name")}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: 3 }}>
            <TextField
              autoFocus
              label={t("Email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            }}
          >
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!firstName || !lastName || !email}
          >
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardWrapper>
  );
};

export default InviteMember;
