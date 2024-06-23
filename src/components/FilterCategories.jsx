/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const FilterCategories = ({ data, filters, handleCheckboxChange }) => {
  const { t } = useTranslation();

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
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <label className="block mb-2 dark:text-white text-text_light font-bold">
            {category.label}
          </label>
          <div className="grid grid-cols-1 pr-6 min-[520px]:grid-cols-2 md:grid-cols-3 gap-1">
            {category.data.map((item) => (
              <div key={item} className="flex items-center space-x-2 w-56">
                <label className="flex">
                  <input
                    type="checkbox"
                    name={category.name}
                    value={item}
                    onChange={handleCheckboxChange}
                    checked={filters[category.name].includes(item)}
                    className="ui-checkbox relative cursor-pointer appearance-none w-5 h-5 rounded-md"
                  />
                </label>
                <span className="dark:text-white text-text_light font-extralight opacity-80">
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
