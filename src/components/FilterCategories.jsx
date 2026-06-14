import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";
import useDataComponent from "../hooks/useDataComponent";

const FilterCategories = ({ data, filters, handleCheckboxChange }) => {
  const { t } = useTranslation();
  const {
    textMode,
    fontExtralight,
    flexCenterItems,
    spaceX,
    blockBoldMb,
    gridColsDefault,
    gridColsTwo,
  } = commonStyles;

  const { categories } = useDataComponent(null, data);

  return (
    <>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <p className={`${textMode} ${blockBoldMb}`}>{category.label}</p>
          <div
            className={`${
              category.name === "unMember" ? gridColsTwo : gridColsDefault
            } pr-6`}
          >
            {category.data.map((item) => (
              <label
                key={item.value}
                className={`${flexCenterItems} ${spaceX} w-56 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  name={category.name}
                  value={item.value}
                  onChange={handleCheckboxChange}
                  checked={
                    Array.isArray(filters[category.name])
                      ? filters[category.name].includes(item.value)
                      : filters[category.name] === item.value
                  }
                  className="ui-checkbox"
                />
                <span className={`${textMode} ${fontExtralight}`}>
                  {category.translate ? t(item.label) : item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

FilterCategories.propTypes = {
  data: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default FilterCategories;
