import React, { useState, useEffect } from "react";

// MATERIAL COMPONENTS
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

// HOOKS
import { useObservable } from "rxjs-hooks";

// COMPONENTS
import SearchItemDetail from "./list-item-card";

// SERVICES
import APIRest from "../../../Services/apiRest";
import { BehaviorSubject, defer } from "rxjs";
import { filter, map, mergeMap, tap } from "rxjs/operators";

const onSearch$ = new BehaviorSubject("");

const SearchList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [ApiService] = useState(APIRest());

  /**
   * @type [any]
   */
  const itemListResult = useObservable(() =>
    onSearch$.pipe(
      filter((text) => text),
      tap((text) => console.log("onSearch$..", text)),
      mergeMap((value) =>
        defer(() =>
          ApiService.get("/sites/MCO/search", {
            q: value,
            offset: 0,
            limit: 50,
          })
        )
      ),
      map((response) => response.data),
      filter((r) => r.results),
      map((response) => response.results),
      tap((text) => console.log("onSearch$ --- RESULT", text))
    )
  );

  function onSearhValueChange(evt) {
    const newValue = evt.target.value;
    setSearchValue(newValue);
  }

  function onSearchBtnClick() {
    console.log("-------", searchValue);
    onSearch$.next(searchValue);
  }

  function handleViewDetailClick() {
    
  }

  return (
    <div className="bg-blue-50">
      {/* SEARCH INPUT AND BUTTON */}
      <div className="flex justify-center">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div className="flex">
            {/* INPUT TEXT TO SEARCH */}
            <div className="w-full m-4">
              <FormControl className="w-full">
                <TextField
                  id="outlined-disabled"
                  label="search"
                  autoComplete="off"
                  value={searchValue}
                  onChange={onSearhValueChange}
                  variant="outlined"
                />
              </FormControl>
            </div>

            {/* BUTTON TO SEARCH */}
            <div className="flex items-center">
              <div>
                <IconButton
                  type="submit"
                  onClick={onSearchBtnClick}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT LIST HERE */}
      <div className="w-full flex flex-wrap p-4">
        {(itemListResult || []).map((i) => (
          <div
            key={i.id}
            className="w-full p-3 sm:w-1/2 lg:w-1/4"
          >
            <SearchItemDetail item={i} onViewDetailsClick={handleViewDetailClick} />
          </div>
        ))}
      </div>

      {/* PAGINATOR  */}
      <div>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default SearchList;
