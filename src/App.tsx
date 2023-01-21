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
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Home from "./pages/Home";
import NavbarLinks from "./components/NavbarLinks";
import AppHeader from "./components/AppHeader";
import ToolContainer from "./components/ToolContainer";
import { allTools } from "./components/tools";

const App = () => {
  const [ colorScheme, setColorScheme ] = useLocalStorage<ColorScheme>({
    key: "app-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([[ "mod+J", () => toggleColorScheme() ]]);

  const appFontFamily = "'JetBrains Mono NL', monospace";
  const appTheme = {
    fontFamily: appFontFamily,
    fontFamilyMonospace: appFontFamily,
    headings: { fontFamily: appFontFamily },
    colorScheme: colorScheme
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCSS>
        <AppShell
          fixed
          header={<AppHeader colorScheme={colorScheme} colorSchemeToggleFn={toggleColorScheme}/>}
          navbar={
            <Navbar width={{ base: 350 }}>
              <Navbar.Section grow component={ScrollArea}>
                <Accordion multiple>
                  {
                    allTools.map((tc, i) =>
                      <Accordion.Item key={`${i}-${tc.label}`} value={tc.label}>
                        <Box>
                          <NavbarLinks key={i} parentPath={tc.path} tools={tc.tools}/>
                        </Box>
                      </Accordion.Item>
                    )
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
                    {
                      tc.tools.map((t) =>
                        <Route
                          key={`${tc.path}-${t.path}`}
                          path={t.path}
                          element={<ToolContainer title={t.label}>{t.component}</ToolContainer>}/>)
                    }
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
