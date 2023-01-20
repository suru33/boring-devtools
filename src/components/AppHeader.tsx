import { Link } from "react-router-dom";
import { ActionIcon, ColorScheme, Group, Header, Text, UnstyledButton } from "@mantine/core";
import AppLogo from "../resources/AppLogo";
import { iconMoonStars, iconSun } from "../resources/icons";

interface AppHeaderProps {
  colorScheme: ColorScheme,
  colorSchemeToggleFn: (value?: ColorScheme) => void
}

const AppHeader = (props: AppHeaderProps) => {
  const { colorScheme, colorSchemeToggleFn } = props;
  return <Header height={60}>
    <Group sx={{ height: "100%" }} px={20} position="apart">
      <Group>
        <UnstyledButton component={Link} to="/home">
          <Group>
            <AppLogo size={50} colorScheme={colorScheme}/>
            <Text
              size="xl"
              weight={700}>
              boring-devtools
            </Text>
          </Group>
        </UnstyledButton>
      </Group>
      <ActionIcon variant="default" onClick={() => colorSchemeToggleFn()} size={30}>
        {colorScheme === "dark" ? iconSun : iconMoonStars}
      </ActionIcon>
    </Group>
  </Header>;
};

export default AppHeader;
