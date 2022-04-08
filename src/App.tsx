import { Link, Navigate, Route, Routes } from "react-router-dom";

import {
  Accordion,
  ActionIcon,
  AppShell,
  Box,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Navbar,
  ScrollArea,
  Text,
  UnstyledButton
} from "@mantine/core";
import { useState } from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import AppLogo from "./resources/AppLogo";
import { allTools } from "./components/tools";
import NavbarLinks from "./components/NavbarLinks";
import Home from "./pages/Home";

const App = () => {
  const [ colorScheme, setColorScheme ] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const appTheme = {
    fontFamily: "'Noto Sans', sans-serif",
    fontFamilyMonospace: "'Courier Prime', monospace",
    colorScheme: colorScheme,
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={appTheme} withGlobalStyles>
        <AppShell
          padding="md"
          header={
            <Header height={60}>
              <Group sx={{ height: "100%" }} px={20} position="apart">
                <Group>
                  <UnstyledButton component={Link} to="/home">
                    <Group>
                      <AppLogo size={50} colorScheme={colorScheme}/>
                      <Text
                        size="xl"
                        weight={700}
                        style={{ fontFamily: appTheme.fontFamilyMonospace }}>
                        boring-devtools
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Group>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                  {colorScheme === "dark" ? <Sun size={16}/> : <MoonStars size={16}/>}
                </ActionIcon>
              </Group>
            </Header>
          }
          navbar={
            <Navbar width={{ base: 350 }}>
              <Navbar.Section grow component={ScrollArea}>
                <Accordion multiple>
                  {
                    allTools.map((tc, i) => {
                      return <Accordion.Item key={`${i}-${tc.label}`} label={tc.label}>
                        <Box>
                          <NavbarLinks key={i} parentPath={tc.path} tools={tc.tools}/>
                        </Box>
                      </Accordion.Item>;
                    })
                  }
                </Accordion>
              </Navbar.Section>
            </Navbar>
          }>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="home" replace/>}/>
              <Route path="home" element={<Home/>}/>
              {
                allTools.map((tc, i) =>
                  <Route key={`${i}-${tc.path}`} path={tc.path}>
                    {tc.tools.map((t, j) =>
                      <Route key={`${i}.${j}-${t.path}`} path={t.path} element={t.component}/>)}
                  </Route>
                )
              }
            </Route>
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
