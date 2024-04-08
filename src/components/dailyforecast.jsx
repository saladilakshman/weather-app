import { Paper, Box, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
//import { Forecastdata } from "./forecastdata";
import { styles } from "../AppStyles/styles";
import { WeatherState } from "../App";
export const Forecast = () => {
    const { state } = useContext(WeatherState)
    const uniqueDates = state?.forecastdata?.list?.map((date) => {
        const localeDate = date.dt * 1000;
        const day = new Intl.DateTimeFormat("en-IN", { day: 'numeric', weekday: 'short', month: 'short' }).format(localeDate);
        return day;
    });

    const uniqueDatesSet = [...new Set(uniqueDates)];
    const [iconslist, setIconslist] = useState([]);
    return (
        <Paper sx={{ ...styles.temperatureCard?.paper, width: { xs: '100%', lg: styles.temperatureCard?.paper.width }, marginBlockStart: { xs: 2, lg: '' } }}>
            <Typography variant="body1" sx={{ paddingInlineStart: 2, paddingBlockEnd: 1 }}>5 days forecast</Typography>
            <Paper sx={{ bgcolor: styles.dailyforecast.backgroundColor }}>
                {state.forecastdata?.list?.slice(0, 5).map((forcast, index) => {
                    const { main, weather } = forcast;
                    weather.map((icons) => {
                        import(`../assets/svg/${icons?.icon}.svg`)
                            .then(response => {
                                setIconslist((prevState) => [...prevState, response.default])
                            })
                            .catch(err => console.log(err.message))
                    })
                    const temperatureIncelsius = main.temp - 273.15;
                    return <Stack key={index} direction="row" justifyContent="space-between" alignItems="baseline" sx={{ padding: styles.dailyforecast.padding }}>
                        <Box>
                            <Box component="img" alt="" src={iconslist[index]} sx={{ width: styles.dailyforecast.width }} />
                        </Box>
                        <Box>
                            <Typography variant="body1">{Math.floor(temperatureIncelsius)}&deg;C</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">{uniqueDatesSet[index]}</Typography>
                        </Box>
                    </Stack>
                })}
            </Paper>
        </Paper>
    )
}