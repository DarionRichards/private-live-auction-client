import UpcomingAuctions from "../../UpcomingAuctions";
import LiveAuctions from "../LiveAuctions/LiveAuctions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../../contexts/AppProvider";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../queries";

export const Dashboard = () => {
  const { user } = useAuth();

  // Get user admin status
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { userId: user._id },
  });

  if (userLoading) return console.log("Loading user");

  if (userError && !userLoading) return console.log("User error");

  const isAdmin = userData.getSingleUser.isAdmin;

  const styles = {
    header: {
      paddingTop: 2,
      paddingBottom: 2,
      mx: "auto",
    },
  };
  // Query the DB to get the auctions
  // Map the cards below
  return (
    <>
      {isAdmin && <button>Create auction</button>}
      {/* Live Auctions */}
      <Box>
        <LiveAuctions />
      </Box>

      {/* Upcoming Auctions */}
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          align="center"
          sx={styles.header}
        >
          Upcoming Auctions
        </Typography>
        <Divider />
        <UpcomingAuctions />
      </Box>
    </>
  );
};
