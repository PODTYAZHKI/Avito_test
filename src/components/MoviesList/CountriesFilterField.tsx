import { useEffect, useState } from "react";
import { Select } from "antd";
import { getPossibleValuesByField } from "../../api/MoviesListAPI";

interface Countrie {
  name: string;
  slug: string;
}

interface CountriesFilterFieldProps {
  change: (value: string[]) => void;
}

const CountriesFilterField: React.FC<CountriesFilterFieldProps> = ({ change }) => {
  const { Option } = Select;
  const [values, setValues] = useState<Countrie[]>();
  useEffect(() => {
    const fetchValues = async () => {
      
        await getPossibleValuesByField('countries.name').then((res) => {
          console.log(res.data);
          setValues(res.data);
        });

    };
    fetchValues();
  }, []);
  return (
    <Select
      placeholder={'Страна'}
      style={{ width: 150 }}
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

export default CountriesFilterField;
