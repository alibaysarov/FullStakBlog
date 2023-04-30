import { Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

const PostSkeleton = () => {
  return (
    <Paper elevation={0} sx={{ py: 2 }}>
      <Stack
        sx={{ mb: 2, px: 2, maxWidth: "100%" }}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack direction={"column"} spacing={1}>
            <Skeleton variant="rounded" width={200} height={15} />
            <Skeleton variant="rounded" width={100} height={15} />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={3}>
          <Skeleton width={40} height={40} variant="circular" />
          <Skeleton width={40} height={40} variant="circular" />
        </Stack>
      </Stack>
      <Skeleton
        variant="rectangle"
        width={"100%"}
        height={"500"}
        sx={{ minHeight: "400px" }}
      />
      <Stack direction={"column"} spacing={2} sx={{ mt: 2, px: 2 }}>
        <Skeleton variant="rounded" height={50} sx={{ maxWidth: "400 px" }} />
        <Skeleton variant="rounded" sx={{ maxWidth: "600px" }} height={20} />
        <Skeleton variant="rounded" sx={{ maxWidth: "600px" }} height={20} />
        <Skeleton variant="rounded" sx={{ maxWidth: "600px" }} height={20} />
      </Stack>
    </Paper>
  );
};

export default PostSkeleton;
