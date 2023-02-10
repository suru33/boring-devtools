import { NumberInput, NumberInputProps } from "@mantine/core";
import ComponentLabel from "./ComponentLabel";
import { numVals } from "../app-sx";
import __ from "../commons/constants";

const HowMany = (props: NumberInputProps) =>
  <NumberInput
    label={<ComponentLabel text={__.labels.howManyQ}/>}
    min={numVals.minOutputItems}
    max={numVals.maxOutputItems}
    {...props}
  />;
export default HowMany;
