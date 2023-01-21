import { NumberInput, NumberInputProps } from "@mantine/core";
import ComponentLabel from "./ComponentLabel";
import { MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../commons/constants";
import { useInputState } from "@mantine/hooks";

export const useHowManyInputState = (count?:number) => useInputState(count ? count : OUTPUT_ITEMS);

const HowMany = (props: NumberInputProps) =>
  <NumberInput
    label={<ComponentLabel text="How many?"/>}
    min={MIN_OUTPUT_ITEMS}
    max={MAX_OUTPUT_ITEMS}
    {...props}
  />;
export default HowMany;
