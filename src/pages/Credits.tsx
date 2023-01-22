import { List, Text, Title } from "@mantine/core";
import __ from "../commons/constants";

const Credits = () => {
  const Credit = (props: { text: string, url: string, urlText: string }) =>
    <List.Item>
      <Text size="sm">
        {`${props.text} `}
        <Text component="a" td="underline" target="_blank" href={props.url}>{props.urlText}</Text>
      </Text>
    </List.Item>;

  return (
    <>
      <Title order={2} align="center" sx={{ marginBottom: 20 }}>{__.labels.credits}</Title>
      <List center spacing="xs">
        <Credit text="React component library" url="https://mantine.dev/" urlText="Mantine"/>
        <Credit text="Fake data generation" url="https://fakerjs.dev/" urlText="Faker"/>
        <Credit text="Date / Time formatting" url="https://day.js.org/" urlText="Day.js"/>
        <Credit text="Icons" url="https://tabler-icons.io/" urlText="Tabler Icons"/>
        <Credit text="Font" url="https://fonts.google.com/specimen/JetBrains+Mono/" urlText="JetBrains Mono"/>
      </List>
    </>
  );
};
export default Credits;
