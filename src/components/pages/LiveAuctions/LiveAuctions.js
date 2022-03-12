import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./LiveAuction.css";
import { GET_LISTINGS } from "../../../queries";
import { useQuery } from "@apollo/client";

// Will accept "auction" prop which will inclue title, image etc
export default function LiveAuctions() {
  const {
    data: listingData,
    loading: listingLoading,
    error: listingError,
  } = useQuery(GET_LISTINGS, { variables: { status: "Live" } });

  console.log(listingData);
  const styles = {
    grid: {
      paddingTop: 3,
      paddingBottom: 3,
    },
  };

  if (listingError && !listingLoading) {
    return <h1>Error loading listings</h1>;
  }

  if (listingData?.getListings && !listingLoading) {
    return (
      <Grid container justifyContent="center" spacing={3} sx={styles.grid}>
        {listingData.getListings.map((auction) => (
          <Grid key={auction} item>
            <Card sx={{ width: 345, height: 345 }}>
              <CardMedia
                component="img"
                height="50%"
                // Example of prop usage here would be {auction.image}
                image={auction.image}
              />
              <CardContent sx={{ height: 80 }}>
                {/* Title */}
                <Typography gutterBottom variant="h5" component="div">
                  {auction.title}
                </Typography>
                {/* Short Description */}
                <Typography variant="body2" color="text.secondary">
                  {auction.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  className="liveButton"
                  sx={{
                    border: "none",
                    cursor: "default",
                  }}
                >
                  Live
                </Button>
                <Button size="small" variant="contained">
                  Join
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  return <h1>No Listings</h1>;
}
