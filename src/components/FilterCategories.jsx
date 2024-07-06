/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";
import DataComponent from "./DataComponent";

const FilterCategories = ({ data, filters, handleCheckboxChange }) => {
  const { t } = useTranslation();
  const {
    textMode,
    fontExtralight,
    flexCenterItems,
    spaceX,
    blockBoldMb,
    gridCols,
  } = commonStyles;

  const { categories } = DataComponent(null, data);
  return (
    <>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <label className={`${textMode} ${blockBoldMb}`}>
            {category.label}
          </label>
          <div className={`${gridCols} pr-6`}>
            {category.data.map((item) => (
              <div
                key={item.value}
                className={`${flexCenterItems} ${spaceX} w-56`}
              >
                <label className="flex">
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
                </label>
                <span className={`${textMode} ${fontExtralight}`}>
                  {category.translate ? t(item.label) : item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FilterCategories;
