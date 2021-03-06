import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { Divider } from "@mui/material";

import { useAuth } from "../contexts/AppProvider";

import { motion } from "framer-motion";

export const BiddingCard = ({ bid }) => {
  const { user } = useAuth();

  if (!bid) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ y: +50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem
          sx={{
            justifyItems: "center",
            alignItems: "center",
            p: 2.5,
          }}
          disablePadding
          divider
          secondaryAction={<Typography>{bid.bidTime}</Typography>}
        >
          <ListItemAvatar>
            <Avatar alt={bid.user.username} src={bid.user.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="h6"
                >
                  {bid.user.firstName} {bid.user.lastName}
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                >
                  {` (${bid.user.username})`}
                </Typography>
              </>
            }
            secondary={
              <Typography variant="body1">Placed bid: £{bid.amount}</Typography>
            }
          />
        </ListItem>
      </motion.div>
      <Divider />
    </>
  );
};
