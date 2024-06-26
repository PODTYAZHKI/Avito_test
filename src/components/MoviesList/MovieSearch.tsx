import React, { useState, useEffect } from "react";
import { AutoComplete, Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import FilterField from "./CountriesFilterField";

const MAX_SEARCH_HISTORY_SIZE = 20;

interface MovieSearchProps {
  handleSearch: (value: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ handleSearch }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    setSuggestions(searchHistory);
  }, [searchHistory]);

  const onSearch = (searchText: string) => {
    if (!searchText) {
      setSuggestions(searchHistory);
    } else {
      const filteredHistory = searchHistory.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filteredHistory);
    }
  };
  const removeSearchHistoryItem = (
    itemToRemove: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    const updatedHistory = suggestions.filter((item) => item !== itemToRemove);

    setSuggestions(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    console.log(suggestions);
  };
  const renderOption = (item: string) => {
    return {
      value: item,
      label: (
        <div className="autocomplete-option-content">
          {item}
          <Button
            type="text"
            icon={<CloseCircleOutlined />}
            onClick={(event) => removeSearchHistoryItem(item, event)}
            style={{ marginLeft: "auto", border: "none", boxShadow: "none" }}
          />
        </div>
      ),
    };
  };

  const updateSearchHistory = (searchText: string) => {
    const searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    const updatedHistory = [
      searchText,
      ...searchHistory.filter((text: string) => text !== searchText),
    ];
    if (updatedHistory.length > MAX_SEARCH_HISTORY_SIZE) {
      updatedHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSuggestions(updatedHistory);
  };

  const onSelect = (value: string) => {
    handleSearch(value);
    updateSearchHistory(value);
  };

  const onEnterSearch = (value: string) => {
    handleSearch(value);
    updateSearchHistory(value);
  };
  return (
    <>
      <AutoComplete
        style={{ width: "100%" }}
        options={suggestions.map(renderOption)}
        onSelect={onSelect}
        onSearch={onSearch}
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input.Search
          placeholder="Фильмы и сериалы"
          onSearch={onEnterSearch}
          enterButton
        />
      </AutoComplete>
    </>
  );
};

export default MovieSearch;
