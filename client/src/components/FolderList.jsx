import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function FolderList({ folders = [] }) {
  const { folderId } = useParams();
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders?.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`/folders/${id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor: id === folderId ? "rgb(255 211 140)" : null
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "18px" }}
              >
                <Typography sx={{fontWeight: 'bold',fontSize: 16 }}>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
