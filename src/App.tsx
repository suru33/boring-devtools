import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  Accordion,
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Navbar,
  ScrollArea,
  Text,
  UnstyledButton
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { SpotlightProvider } from "@mantine/spotlight";
import Home from "./pages/Home";
import NavbarLinks from "./components/NavbarLinks";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ToolContainer from "./components/ToolContainer";
import { allTools, buildSpotlightActions } from "./components/tools";
import { iconSearchBig, navbarIcons } from "./resources/icons";
import { BASE_PATH, NOTHING_FOUND, SEARCH } from "./commons/constants";
import NotFound from "./pages/NotFound";
import Credits from "./pages/Credits";

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

  const spotlightActions = buildSpotlightActions(useNavigate());

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCSS>
        <SpotlightProvider
          highlightQuery
          searchIcon={iconSearchBig}
          searchPlaceholder={SEARCH}
          nothingFoundMessage={NOTHING_FOUND}
          shortcut="mod + K"
          actions={spotlightActions}>
          <AppShell
            fixed
            header={<AppHeader colorScheme={colorScheme} colorSchemeToggleFn={toggleColorScheme}/>}
            footer={<AppFooter />}
            navbar={
              <Navbar width={{ base: 350 }}>
                <Navbar.Section grow component={ScrollArea}>
                  <Accordion multiple disableChevronRotation chevron={<></>}>
                    {
                      allTools.map((tc, i) =>
                        <Accordion.Item key={`${i}-${tc.label}`} value={tc.label}>
                          <Accordion.Control icon={tc.icon}>
                            <Text size="lg" weight={700}>{tc.label}</Text>
                          </Accordion.Control>
                          <NavbarLinks key={i} parentPath={`${BASE_PATH}/${tc.path}`} tools={tc.tools}/>
                        </Accordion.Item>
                      )
                    }
                    <Accordion.Item key="credits" value="credits">
                      <Accordion.Control icon={navbarIcons.licenseBig}>
                        <UnstyledButton component={Link} to={`${BASE_PATH}/credits`}>
                          <Text size="lg" weight={700}>Credits</Text>
                        </UnstyledButton>
                      </Accordion.Control>
                    </Accordion.Item>
                  </Accordion>
                </Navbar.Section>
              </Navbar>
            }>
            <Routes>
              <Route path={`${BASE_PATH}/`}>
                <Route index element={<Navigate to={`${BASE_PATH}/home`} replace/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="credits" element={<Credits/>}/>
                {
                  allTools.map((tc, i) =>
                    <Route key={`${i}-${tc.path}`} path={tc.path}>
                      {
                        tc.tools.map((t) =>
                          <Route
                            key={`${tc.path}-${t.path}`}
                            path={t.path}
                            element={<ToolContainer title={t.label}>{t.component}</ToolContainer>}
                          />
                        )
                      }
                    </Route>
                  )
                }
                <Route path='*' element={<NotFound />}/>
              </Route>
            </Routes>
          </AppShell>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
