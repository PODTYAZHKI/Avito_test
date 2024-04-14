import { useEffect, useState } from "react";
import { Select } from "antd";
import { getPossibleValuesByField } from "../../api/MoviesListAPI";

interface Countrie {
  name: string;
  slug: string;
}

interface FilterFieldProps {
  change: (value: string) => void;
  name: string;
  value: string;
}

const FilterField: React.FC<FilterFieldProps> = ({ change, name, value }) => {
  const { Option } = Select;
  const [values, setValues] = useState<Countrie[]>();
//   const [filter, setFilter] = useState();
  useEffect(() => {
    const fetchValues = async () => {
      if (value === "countries.name") {
        await getPossibleValuesByField(value).then((res) => {
          console.log(res.data);
          setValues(res.data);
        });
      }
      // if (value === 'ageRating') {
      // 	await getPossibleValuesByField(value).then((res) => {
      // 	  console.log(res.data);
      // 	  setValues(res.data);
      // 	});
      // }
    };
    fetchValues();
  }, []);
  return (
    <Select
      placeholder={name}
      style={{ width: 120 }}
      onChange={change}
      mode="multiple"
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.props.children
          .toString()
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {values &&
        values.map((v: Countrie) => (
          <Option key={v.slug} value={v.name}>
            {v.name}
          </Option>
        ))}
    </Select>
  );
};

export default FilterField;
