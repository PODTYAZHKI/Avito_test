import { List, Pagination, Select } from "antd";
import { useEffect, useState } from "react";

import {Season} from '../../interfaces/MovieInterfaces'


interface SeasonsComponentProps {
	seasons: Season[];
  }

const SeasonsComponent: React.FC<SeasonsComponentProps> = ({ seasons }) => {
	const [special, setSpecial] = useState<Season>();
	const [selectedSeason, setSelectedSeason] = useState<Season>();
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const episodes =
	  selectedSeason &&
	  selectedSeason.episodes.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	  );
  
	const { Option } = Select;
	useEffect(() => {
	  if (seasons.length > 0 && seasons[0].number === 0) {
		const specialSeason = seasons.shift();
		specialSeason && seasons.push(specialSeason);
	  }
	  setSelectedSeason(seasons[0]);
	}, []);
	return (
	  <>
		{selectedSeason && (
		  <>
			<h2>Сезон: {selectedSeason.number}</h2>
			<Select
			  defaultValue={selectedSeason.number.toString()}
			  style={{ width: 120 }}
			  onChange={(value) => {
				const season = seasons.find((s) => s.number === parseInt(value));
				setSelectedSeason(season);
				setCurrentPage(1); 
			  }}
			>
			  {seasons.map((season: Season) => (
				<Option key={season.number} value={season.number.toString()}>
				  Сезон {season.number}
				</Option>
			  ))}
			</Select>
		  </>
		)}
		<List
		  itemLayout="horizontal"
		  dataSource={episodes}
		  renderItem={(episode) => (
			<List.Item>
			  <List.Item.Meta
				title={`Эпизод ${episode.number}: ${episode.enName}`}
			  />
			</List.Item>
		  )}
		/>
		{selectedSeason && selectedSeason.episodes.length > pageSize && (
		  <Pagination
			current={currentPage}
			onChange={(page) => setCurrentPage(page)}
			total={selectedSeason.episodes.length}
			pageSize={pageSize}
			showSizeChanger={false}
		  />
		)}
	  </>
	);
  };
  

  export default SeasonsComponent