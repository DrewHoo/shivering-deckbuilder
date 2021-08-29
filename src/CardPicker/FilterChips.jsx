import React from "react";
import Chip from "@material-ui/core/Chip";

export const FilterChips = (props) => {
  const { removeFilter, filter, classes } = props;
  console.log(props);
  return filter.map(({ property, value, operator }) => (
    <Chip
      key={`${property}${operator}${value}`}
      label={`${property} ${operator} ${value}`}
      className={classes}
      onDelete={() => removeFilter({ property, value, operator })}
    />
  ));
};
