import { Paper, Skeleton } from "@mui/material";
import React from "react";

const SideBarSkeleton = ({ type }) => {
  return (
    <Paper sx={{ p: 1, borderRadius: 10 }} elevation={0}>
      <Skeleton
        variant="rounded"
        height={50}
        sx={{ maxWidth: "300px", mb: 3 }}
      />
      {[1, 2, 3].map((el) => (
        <Stack spacing={2} alignItems={"center"}>
          {type == "profile" ? (
            <Skeleton variant={"circular"} width={30} height={30} />
          ) : (
            <Skeleton variant={"rounded"} width={70} height={30} />
          )}
          <Skeleton
            variant={"rounder"}
            sx={{ maxHeight: "150px" }}
            height={30}
          />
        </Stack>
      ))}
    </Paper>
  );
};

export default SideBarSkeleton;
