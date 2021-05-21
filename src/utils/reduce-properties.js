const lodash = require("lodash");
const mapProperties = require("./map-properties");


function getRowMapConfiguration(configuration, previousRow) {
  return Object.entries(configuration).reduce((accumulator, [key, values]) => {
    accumulator[key] = values.map((value, index, source) =>
      value === null
        ? lodash.get(previousRow, `${source[index - 1]}.length`, 0)
        : value
    );
    return accumulator;
  }, {});
}


function reduceProperties(uniqueField, configuration) {
  return (data) => {
    const reducedData = data.reduce((accumulator, row) => {
      const key = row[uniqueField];
      const rowObject = accumulator[key] || {};

      const rowMapConfiguration = getRowMapConfiguration(
        configuration,
        rowObject
      );

      const rowMapper = mapProperties(rowMapConfiguration);
      accumulator[key] = lodash.merge(rowObject, rowMapper(row));
      return accumulator;
    }, {});

    return Object.values(reducedData);
  };
}

module.exports = reduceProperties;