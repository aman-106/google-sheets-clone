import { FunctionBar } from "@/components/FunctionBar/FunctionBar";
import Grid from "@/components/Grid/Grid";
import { GridSkeleton } from "@/components/Skeletons/GridSkeleton";
import { Paper } from "@mui/material";
import Image from "next/image";
import { Suspense } from 'react'

export default function Page() {
  return (
<>
      <FunctionBar />
      <Suspense fallback={<GridSkeleton />}>
      <Grid/>
      </Suspense>
</>

  );
}
