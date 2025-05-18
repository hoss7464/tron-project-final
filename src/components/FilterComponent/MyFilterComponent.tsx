import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setFilter } from "../../redux/actions/filterSlice";
import {
  FormControl,
  InputLabel,
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
    (state: RootState) => state.filters[listKey] || "All"
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
        sx={{ height: 32 }}
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
