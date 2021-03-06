import { useState } from "react";
import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";

const Input = styled("input")({
  display: "none",
});

export const SingleImageUploader = ({ uploadedImage, setUploadedImage }) => {
  const [image, setImage] = useState();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      backgroundColor: "#fff",
    },
    header: {
      paddingTop: 2,
      paddingBottom: 2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
    },
  };

  const uploadImage = async () => {
    setLoading(true);

    aws.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_ACCESS_ID,
      region: process.env.REACT_APP_REGION,
      signatureVersion: "v4",
    });

    const s3 = new aws.S3();

    image.uuid = uuidv4();

    const { url, fields } = await s3.createPresignedPost({
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Fields: { key: `images/${image.uuid}` },
      Expires: 60,
    });

    const formData = new FormData();

    Object.entries({ ...fields, file: image }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, { method: "POST", body: formData });

    if (upload.ok) {
      setUploadComplete(true);
      setImage();
      setUploadedImage({
        src: `${upload.url}/images/${image.uuid}`,
        fileName: `images/${image.uuid}`,
      });
      setLoading(false);
    } else {
      console.log("Failed to upload");
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <label htmlFor="image-uploader">
        <Input
          accept="image/*"
          id="image-uploader"
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
          }}
        />
        <Button variant="contained" component="span">
          Add Image
        </Button>
      </label>
      {image && (
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<UploadIcon />}
          variant="contained"
          onClick={uploadImage}
        >
          Upload Image
        </LoadingButton>
      )}

      {image && (
        <>
          <Typography
            variant="subtitle"
            gutterBottom
            component="h3"
            align="center"
            sx={styles.header}
          >
            Image to Upload
          </Typography>
          <ImageList>
            <ImageListItem cols={2} rows={1}>
              <img
                style={{
                  maxWidth: 250,
                  objectFit: "contain",
                }}
                src={URL.createObjectURL(image)}
                loading="lazy"
              />
              <ImageListItemBar
                title={image.name}
                subtitle={`${Math.floor(image.size / 10) / 100} KB`}
                actionIcon={
                  loading ? (
                    <CircularProgress sx={{ color: "#fff", mr: 2 }} size={20} />
                  ) : (
                    <IconButton
                      sx={{ color: "#d32f2f" }}
                      onClick={() => {
                        setImage();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              />
            </ImageListItem>
          </ImageList>
        </>
      )}

      {uploadedImage && (
        <>
          <Typography
            variant="subtitle"
            gutterBottom
            component="h3"
            align="center"
            sx={styles.header}
          >
            Uploaded Image
          </Typography>
          <ImageList>
            <ImageListItem cols={2} rows={1}>
              <img
                style={{ maxWidth: 250, objectFit: "contain" }}
                src={uploadedImage.src}
                loading="lazy"
              />
              <ImageListItemBar
                actionIcon={<CheckCircleIcon sx={{ mr: 2, color: "#fff" }} />}
              />
            </ImageListItem>
          </ImageList>
        </>
      )}

      {uploadComplete && !loading && (
        <Alert severity="success">Successfully uploaded image</Alert>
      )}
    </Stack>
  );
};
