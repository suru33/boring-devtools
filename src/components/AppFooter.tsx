import { Center, Footer, Text } from "@mantine/core";
import __ from "../commons/constants";

const AppFooter = () => {
  const Link = (props: {display: string, url: string}) =>
    <Text size="xs" color="dimmed" component="a" td="underline" target="_blank" href={props.url}>
      {props.display}
    </Text>;
  return (
    <Footer height={30}>
      <Center style={{ height: "100%" }}>
        <Text size="xs" color="dimmed">
          {__.settings.appname} v{__.settings.version} • {__.settings.copyright}
          {} • {__.labels.license} <Link display={__.settings.license} url={__.settings.licenseURL} />
          {} • <Link display={__.settings.myURL} url={__.settings.myURL} />
        </Text>
      </Center>
    </Footer>
  );
};

export default AppFooter;
