import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/common/dropdown";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const RoomDistributionsSelector = ({
  label,
  value = {
    adults: 0,
    children: 0,
    infants: 0,
  },
  onChange,
}) => {
  const { adults, children, infants } = value;

  const handleChange =
    (elem = "adults", qty) =>
    () => {
      onChange({ ...value, [elem]: qty });
    };

  return (
    <div className="shrink-0">
      <div>{label}</div>
      <div className="flex ml-4 space-x-2">
        <div>
          <Dropdown>
            <DropdownButton outline>
              {adults} Adulto{adults === 1 ? "" : "s"}
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu>
              {Array.from(new Array(7)).map((_, idx) => {
                return (
                  <DropdownItem key={idx} onClick={handleChange("adults", idx)}>
                    {idx}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div>
          <Dropdown>
            <DropdownButton outline>
              {children} Niñ@{adults === 1 ? "" : "s"} (2–12 años)
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu>
              {Array.from(new Array(7)).map((_, idx) => {
                return (
                  <DropdownItem
                    key={idx}
                    onClick={handleChange("children", idx)}
                  >
                    {idx}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Dropdown>
            <DropdownButton outline>
              {infants} Infante{adults === 1 ? "" : "s"} (0–2 años)
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu>
              {Array.from(new Array(7)).map((_, idx) => {
                return (
                  <DropdownItem
                    key={idx}
                    onClick={handleChange("infants", idx)}
                  >
                    {idx}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default RoomDistributionsSelector;
