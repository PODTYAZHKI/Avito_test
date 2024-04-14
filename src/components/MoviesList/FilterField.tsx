import { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  Modal,
  Popover,
} from "antd";

interface FilterFieldProps {
  change: (value: number[] | undefined) => void;
  value: string;
}

const FilterField: React.FC<FilterFieldProps> = ({ change, value }) => {
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [isSingleYear, setIsSingleYear] = useState(false);

  const togglePopover = () => setVisible(!visible);
  const handleApply = () => {
    if (!isSingleYear) {
      if (start && end) change([start, end]);
      else change(undefined);
    }
    if (isSingleYear) {
      if (start) change([start]);
      else change(undefined);
    }
    setVisible(false);
  };

  const currentYear = new Date().getFullYear();
  const handleStartYearChange = (value: number | null) => {
    setStart(value !== null ? value : undefined);
  };

  const handleEndYearChange = (value: number | null) => {
    setEnd(value !== null ? value : undefined);
  };

  const filterContent = (
    <div>
      <InputNumber
        min={value === "year" ? 1900 : 0}
        max={value === "year" ? currentYear-1 : 20}
        placeholder={!isSingleYear ? "От" : ""}
        style={{ width: "100%", marginBottom: "10px" }}
        value={start}
        onChange={handleStartYearChange}
      />
      {!isSingleYear && (
        <InputNumber
          min={value === "year" ? 1901 : 1}
          max={value === "year" ? currentYear : 21}
          placeholder="До"
          style={{ width: "100%", marginBottom: "10px" }}
          value={end}
          onChange={handleEndYearChange}
        />
      )}
      {value === "year" && (
        <Checkbox
          checked={isSingleYear}
          onChange={(e) => setIsSingleYear(e.target.checked)}
        >
          Только один год
        </Checkbox>
      )}
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <Button type="primary" onClick={handleApply}>
          Применить
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={filterContent}
      title={value === "year" ? "Выбор года" : "Выбор возрастного рейтинга"}
      trigger="click"
      visible={visible}
      onOpenChange={togglePopover}
    >
      <Button style={{ color: "rgba(0, 0, 0, 0.3)" }}>
        {value === "year" ? "Год" : "Рейтинг"}
      </Button>
    </Popover>
  );
};

export default FilterField;
