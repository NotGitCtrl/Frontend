import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export default function ConfirmationModal({
  open,
  message,
  handleClose,
  handleSuccess,
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("No")}</Button>
        <Button onClick={handleSuccess} autoFocus>
          {t("Yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
