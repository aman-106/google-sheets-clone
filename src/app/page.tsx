import { FunctionBar } from "@/components/FunctionBar/FunctionBar";
import Grid from "@/components/Grid/Grid";
import { GridSkeleton } from "@/components/Skeletons/GridSkeleton";
import { GridDataContextProvider } from "@/components/context/GridDataContext";
import { SelectedCellProvider } from "@/components/context/SelectedCellProvider";
import { UserInputProvider } from "@/components/context/UserInputContext";
import { Suspense } from "react";


export default function Page() {
  return (
    <>
      <SelectedCellProvider>
        <GridDataContextProvider>
          <UserInputProvider>
            <FunctionBar />
            <Suspense fallback={<GridSkeleton />}>
              <Grid />
            </Suspense>
          </UserInputProvider>
        </GridDataContextProvider>
      </SelectedCellProvider>
    </>
  );
}
