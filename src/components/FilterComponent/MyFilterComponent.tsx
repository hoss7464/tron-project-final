import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setFilter } from "../../redux/actions/filterSlice";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  listKey: string;
  options: string[];
  label?: string;
}

const MyFilterComponent: React.FC<Props> = ({
  listKey,
  options,
  label = "Filter",
}) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.filters[listKey] || "latest"
  );

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFilter({ listKey, value: event.target.value }));
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={selected}
        onChange={handleChange}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: 32,
          color: "#ffffff",
          backgroundColor: "#430E00",
          borderRadius : "6px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00", // default border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00", // Border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00", // border on focus
          },
          "& .MuiSelect-icon": {
            color: "#ffffff", // arrow icon color
          },
        }}
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            sx: {},
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MyFilterComponent;
