import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Accordion,
  AppShell,
  Box,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Navbar,
  ScrollArea
} from "@mantine/core";
import Home from "./pages/Home";
import { allTools } from "./components/tools";
import NavbarLinks from "./components/NavbarLinks";
import AppHeader from "./components/AppHeader";

const App = () => {
  const [ colorScheme, setColorScheme ] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const appTheme = {
    fontFamily: "'Courier Prime', monospace",
    fontFamilyMonospace: "'Courier Prime', monospace",
    colorScheme: colorScheme,
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={appTheme} withGlobalStyles>
        <AppShell
          padding="md"
          header={
            <AppHeader
              colorScheme={colorScheme}
              colorSchemeToggleFn={toggleColorScheme}/>
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
