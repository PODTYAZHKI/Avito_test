import { useEffect, useState } from "react";
import { Select} from "antd";
import { getPossibleValuesByField } from "../../api/MoviesListAPI";


interface FilterFieldProps {
	change: (value: string) => void;
	name: string;
	value: string
  }

const FilterField: React.FC<FilterFieldProps> = ({ change, name, value }) => {
	const { Option } = Select;
	const [values, setValues] = useState();
	useEffect(() => {
	  const fetchValues = async () => {
		if (value === 'countries.name') {
			await getPossibleValuesByField(value).then((res) => {
			  console.log(res.data);
			  setValues(res.data);
			});
		}
	  };
	  fetchValues();
	}, []);
	return (
	  <Select placeholder={name} style={{ width: 120 }} onChange={change}>
		
	  </Select>
	);
  };

  export default FilterField