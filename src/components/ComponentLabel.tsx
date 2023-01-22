import { Text } from "@mantine/core";
import { fontWeight } from "../app-sx";

const ComponentLabel = (props: { text: string }) =>
  <Text weight={fontWeight.bold} size="lg">{props.text}</Text>;

export default ComponentLabel;
