import React from "react";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
} from "../../../app/slices/searchSlice";
import { SearchContainer } from "./search.styles";

const Search = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector(selectSearchTerm);
  const handleChangeSearch = (text) => {
    dispatch(setSearchTerm(text));
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for car"
        value={searchTerm}
        onSubmitEditing={() => {}}
        onChangeText={handleChangeSearch}
      />
    </SearchContainer>
  );
};

export default Search;
