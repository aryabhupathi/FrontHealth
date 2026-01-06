import { useMediaQuery } from "@mui/material";
import { mobileBreakpoint } from "../constants/constant";
export default function Tablet() {
  return useMediaQuery(mobileBreakpoint);
}
