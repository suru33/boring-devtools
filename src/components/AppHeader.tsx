import { Link } from "react-router-dom";
import { ActionIcon, ColorScheme, Group, Header, Text, UnstyledButton } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";
import AppLogo from "../resources/AppLogo";

interface AppHeaderProps {
  colorScheme: ColorScheme,
  titleFont: string,
  colorSchemeToggleFn: (value?: ColorScheme) => void
}

const AppHeader = (props: AppHeaderProps) => {
  const { colorScheme, titleFont, colorSchemeToggleFn } = props;
  return <Header height={60}>
    <Group sx={{ height: "100%" }} px={20} position="apart">
      <Group>
        <UnstyledButton component={Link} to="/home">
          <Group>
            <AppLogo size={50} colorScheme={colorScheme}/>
            <Text
              size="xl"
              weight={700}
              style={{ fontFamily: titleFont }}>
              boring-devtools
            </Text>
          </Group>
        </UnstyledButton>
      </Group>
      <ActionIcon variant="default" onClick={() => colorSchemeToggleFn()} size={30}>
        {colorScheme === "dark" ? <Sun size={16}/> : <MoonStars size={16}/>}
      </ActionIcon>
    </Group>
  </Header>;
};

export default AppHeader;
