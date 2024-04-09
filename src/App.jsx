import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Typography, Stack, Box, ThemeProvider, createTheme, CssBaseline, AppBar, Button, useTheme, useMediaQuery, Dialog, DialogContent, DialogActions } from "@mui/material";
import { createContext, useReducer, useEffect, useState } from "react";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { styles } from './AppStyles/styles';
import SearchIcon from '@mui/icons-material/Search';
import { SearchDialog } from './utils/dialog';
import axios from "axios";
import { WeatherInfo } from "./components/weatherdetails";
import { Loader } from './utils/loader';
import { API_KEYS } from './keys';
export const WeatherState = createContext();
export default function App() {
  const App_initial_state = {
    showsearchbar: false,
    showdialog: false,
    forecastdata: {},
    temperaturedata: {},
    pollutiondata: {}
  }
  const [isloading, setIsloading] = useState(true);
  const [state, dispatch] = useReducer(reducerfunction, App_initial_state);
  const [coordinates, setCoordinates] = useState({
    lng: '44.34',
    lat: '10.99'
  })
  useEffect(() => {
    const pathnames = [
      'forecast',
      'weather',
      'air_pollution'
    ];

    Promise.all(
      pathnames.map((pathname) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/${pathname}?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${API_KEYS.weather}`);
      })
    )
      .then((results) => {
        dispatch({ type: 'forecast', payload: results[0].data })
        dispatch({ type: 'temperature', payload: results[1].data })
        dispatch({ type: 'pollution', payload: results[2].data })
      })
      .catch((err) => {
        console.error('Error:', err.name)
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [coordinates.lat, coordinates.lng]);



  function reducerfunction(state, action) {
    if (action.type === "show-searchbox") {
      return {
        ...state,
        showsearchbar: true
      }
    }
    if (action.type === "close-searchbox") {
      return {
        ...state,
        showsearchbar: false
      }
    }
    if (action.type === 'forecast') {
      return {
        ...state,
        forecastdata: action.payload
      }
    }
    if (action.type === 'temperature') {
      return {
        ...state,
        temperaturedata: action.payload
      }
    }
    if (action.type === 'pollution') {
      return {
        ...state,
        pollutiondata: action.payload
      }
    }
    if (action.type === "open-dialog") {
      return {
        ...state,
        showdialog: true
      }
    }
    if (action.type === "close-dialog") {
      return {
        ...state,
        showdialog: false
      }
    }
    else {
      return state
    }
  }
  const darktheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        dispatch({ type: 'show-searchbox' })
      }
    })
  }, [])

  const getCurrentLocation = () => {
    try {
      navigator.permissions.query({ name: 'geolocation' })
        .then(PermissionStatus => {
          if (PermissionStatus.state === "denied") {
            setCoordinates(coordinates);
            dispatch({ type: 'show-dialog' })
          }
          if (PermissionStatus.state === "granted" || PermissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(position => {
              const longitude = position.coords.longitude;
              const latitude = position.coords.latitude;
              setCoordinates({
                lng: longitude,
                lat: latitude
              });
              setIsloading(true)
            })
          }
        })
        .catch(err => console.log(err))
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <ThemeProvider theme={darktheme}>
      <CssBaseline />
      <WeatherState.Provider value={{ mobile, state, dispatch, setCoordinates, setIsloading }}>
        <SearchDialog />
        <Dialog open={state.showdialog} onClose={() => dispatch({ type: 'close-dialog' })}>
          <DialogContent>
            <Typography variant='h6' sx={{
              fontSize: { xs: 12, lg: 16 }
            }}>Please Allow location access in your browser settings</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="text" size="small" onClick={() => dispatch({ type: 'close-dialog' })}>Ok</Button>
          </DialogActions>
        </Dialog>
        <Container>
          <AppBar sx={styles.appbar}>
            <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={5}>
              <Box>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.2}>
                  <CloudQueueIcon sx={styles.logo.logoicon} />
                  <Typography sx={styles.logo.logoname}>Weatherio</Typography>
                </Stack>
              </Box>
              <Box component="div" sx={styles.searchbox.div} onClick={() => dispatch({ type: 'show-searchbox' })} id="atom">
                <Box
                  component="input"
                  type="search"
                  varaint="contained"
                  placeholder="Search city.."
                  sx={styles.searchbox.input}
                />
                <Box sx={styles.searchbox.searchIcon}>
                  <SearchIcon />
                </Box>
                <Box sx={styles.searchbox.shortcut}>
                  ctrl+l
                </Box>
              </Box>

              <Box>
                <Button variant="contained" startIcon={<MyLocationIcon />} sx={styles.locationbutton} size="small" onClick={getCurrentLocation} disabled={isloading ? true : false}>
                  current location
                </Button>
              </Box>
            </Stack>
          </AppBar>
          {isloading ? (<Loader />) : (<WeatherInfo />)}
        </Container>
      </WeatherState.Provider>
    </ThemeProvider>
  );
}
