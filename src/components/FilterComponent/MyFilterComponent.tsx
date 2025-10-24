import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setFilter } from "../../redux/actions/filterSlice";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  listKey: string;
  options: string[]; // keys, e.g. ["price","energy","bandwidth","latest","oldest"] or ["All","energy","bandwidth"]
  label?: string; // label key in translations, default "filter:Product" or provided raw text
  translationNamespace?: string; // optional namespace (default: "filter")
}

const MyFilterComponent: React.FC<Props> = ({
  listKey,
  options,
  label = "Product",
  translationNamespace = "filter",
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Use stored key from redux. If not present, default to first option (key)
  const selected = useSelector(
    (state: RootState) => state.filters[listKey] ?? options[0]
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setFilter({ listKey, value: event.target.value }));
  };

  // helper to translate an option key. We attempt translationNamespace.optionKey, 
  // fallback to the raw key if translation missing.
  const translateOption = (optionKey: string) => {
    const path = `${translationNamespace}.${optionKey}`;
    const translated = t(path);
    // If translation returns the key back (common with i18next) we return the raw key but keep capitalization fallback:
    if (!translated || translated === path) {
      // fallback to a nicer label if it's an alpha key (e.g. "price" -> "Price")
      return optionKey.charAt(0).toUpperCase() + optionKey.slice(1);
    }
    return translated;
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel shrink={false} sx={{ display: "none" }}>
        {t(`${translationNamespace}.${label}`) ?? label}
      </InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        inputProps={{ "aria-label": t(`${translationNamespace}.${label}`) ?? label }}
        sx={{
          height: 28,
          color: "#ffffff",
          backgroundColor: "#430E00",
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#430E00",
          },
          "& .MuiSelect-icon": {
            color: "#ffffff",
          },
        }}
        MenuProps={{
          disableScrollLock: true,
          PaperProps: { sx: {} },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {translateOption(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MyFilterComponent;
