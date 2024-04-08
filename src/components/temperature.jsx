import { Stack, Typography, Paper, Box, Divider } from "@mui/material";
import { useState, useEffect, useContext } from "react";
//import { weatherdata } from "../weather";
import { styles } from "../AppStyles/styles";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { WeatherState } from "../App";
export const Temperature = () => {
    const { state } = useContext(WeatherState)
    const [svgData, setSvgData] = useState(null);
    useEffect(() => {
        const icontype = state?.temperaturedata?.weather?.map((icon) => icon.icon);
        import(`../assets/svg/${icontype}.svg`)
            .then(data => {
                setSvgData(data.default);
            })
            .catch(err => console.error(err.message));
    }, [state?.temperaturedata?.weather]);
    const [clouddesc] = state.temperaturedata.weather;
    const clouddescription = clouddesc?.description

    return (
        <Box className="div">
            <Paper sx={{ ...styles.temperatureCard?.paper, height: { lg: '18rem', xs: '100%' } }}>
                <Stack direction="column" justifyContent="space-evenly" alignItems="baseline" spacing={2}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="body1" color="inherit">Now</Typography>
                        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ p: 1 }}>
                            <Typography variant="h2" color="inherit">{Math.floor(state?.temperaturedata?.main?.temp - 273.15)}&deg;C</Typography>
                            {svgData && <Box component="img" src={svgData} alt="Weather Icon" className="icon"
                                sx={{ width: 55, }} />}
                        </Stack>
                        <Typography variant="body2">{clouddescription ?? 'broken clouds'}</Typography>
                        <Divider sx={{ pt: 1.8 }} />
                    </Box>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
                        <CalendarTodayIcon />
                        <Typography variant="body2" color="inherit">{
                            new Intl.DateTimeFormat('en-IN', {
                                day: 'numeric',
                                weekday: 'long',
                                month: 'short'
                            }).format(new Date())
                        }</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <LocationOnIcon />
                        <Typography variant="body2" color="inherit">{state?.temperaturedata?.name},{new Intl.DisplayNames(['en'], { type: 'region' }).of(state?.temperaturedata?.sys?.country)}</Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}