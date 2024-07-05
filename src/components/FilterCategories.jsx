/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles/commonStyles";

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

  const categories = [
    {
      label: t("regionn"),
      data: data.regions,
      name: "region",
      translate: true,
    },
    {
      label: t("subregionn"),
      data: data.subRegions,
      name: "subRegion",
      translate: true,
    },
    {
      label: t("timezone"),
      data: data.timeZones,
      name: "timeZone",
      translate: false,
    },
  ];

  return (
    <>
      <div className="mb-4">
        <label className={`${textMode} ${blockBoldMb}`}>{t("unMember")}</label>
        <div className={`${gridCols}`}>
          <div className={`${flexCenterItems} ${spaceX} w-56`}>
            <label className={`${flexCenterItems} ${spaceX}`}>
              <input
                type="checkbox"
                name="unMember"
                value="true"
                onChange={handleCheckboxChange}
                checked={filters.unMember === "true"}
                className="ui-checkbox"
              />
              <span className={`${textMode} ${fontExtralight}`}>
                {t("yes")}
              </span>
            </label>
            <label className={`${flexCenterItems} ${spaceX}`}>
              <input
                type="checkbox"
                name="unMember"
                value="false"
                onChange={handleCheckboxChange}
                checked={filters.unMember === "false"}
                className="ui-checkbox"
              />
              <span className={`${textMode} ${fontExtralight}`}>{t("no")}</span>
            </label>
          </div>
        </div>
      </div>
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <label className={`${textMode} ${blockBoldMb}`}>
            {category.label}
          </label>
          <div className={`${gridCols} pr-6`}>
            {category.data.map((item) => (
              <div key={item} className={`${flexCenterItems} ${spaceX} w-56`}>
                <label className="flex">
                  <input
                    type="checkbox"
                    name={category.name}
                    value={item}
                    onChange={handleCheckboxChange}
                    checked={filters[category.name].includes(item)}
                    className="ui-checkbox"
                  />
                </label>
                <span className={`${textMode} ${fontExtralight}`}>
                  {category.translate ? t(`${category.name}.${item}`) : item}
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
