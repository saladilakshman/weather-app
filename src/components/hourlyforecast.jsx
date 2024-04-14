import { Paper, Typography, Box, Stack } from "@mui/material";
import { useState, useContext } from "react";
import "../App.css";
import { Send } from "lucide-react";
import { styles } from "../AppStyles/styles";
import { WeatherState } from "../App";
//import { Forecastdata } from "./forecastdata";
export const HourlyForeCastData = () => {
    const { state } = useContext(WeatherState);
    const newarr = state.forecastdata?.list?.map((item) => {
        const localedate = item.dt * 1000;
        const newDt = new Intl.DateTimeFormat('en-IN', {
            hour: 'numeric',
            weekday: 'long'
        }).format(localedate)
        return { ...item, dt: newDt }
    })
    const object = { ...state?.forecastdata, list: newarr }
    const dtCounts = object?.list?.reduce((acc, obj) => {
        acc[obj.dt.split(" ")[0]] = (acc[obj.dt.split(" ")[0]] || 0) + 1
        return acc
    }, {});
    const oneDayReadings = object?.list?.filter(obj => dtCounts[obj.dt.split(" ")[0]] == 8);
    const [iconslist, setIconslist] = useState([]);
    return (
        <Paper sx={styles.hourlyforcast.paper}>
            <Typography variant="body1" sx={styles.hourlyforcast.bottom}>Today at</Typography>
            <Stack direction="row" justifyContent={"flex-start"} alignItems="center" spacing={2} sx={styles.hourlyforcast.flex} id="scroll-hide">
                {oneDayReadings.slice(0, 8)?.map((forcastdetails, index) => {
                    const { dt, weather, main } = forcastdetails;
                    weather.map((icons) => {
                        import(`../assets/svg/${icons?.icon}.svg`)
                            .then(response => {
                                setIconslist((prevState) => [...prevState, response.default])
                            })
                            .catch(err => console.log(err.message))
                    })

                    return <Paper key={index} sx={styles.hourlyforcast.secondPaper}>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <Typography variant="h6" sx={styles.highlight.fonts}>{dt.split(",")[1]}</Typography>
                            <Box component="img" alt="" src={iconslist[index]} sx={styles.hourlyforcast.icon} />
                            <Typography variant="h6" sx={styles.highlight.fonts}>{Math.floor(main.temp - 273.15)}&deg;</Typography>
                        </Stack>
                    </Paper>
                })}
            </Stack>
            <br />
            <Stack direction="row" justifyContent={"flex-start"} alignItems="center" spacing={2} sx={styles.hourlyforcast.flex} id="scroll-hide">
                {oneDayReadings.slice(0, 8)?.map((forcastdetails, index) => {
                    const { dt, main } = forcastdetails;
                    return <Paper key={index} sx={styles.hourlyforcast.secondPaper}>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <Typography variant="h6" sx={styles.highlight.fonts}>{dt.split(",")[1]}</Typography>
                            <Box>
                                <Send />
                            </Box>
                            <Typography variant="h6" sx={styles.highlight.fonts}>{Math.floor(main.temp - 273.15)}&deg;</Typography>
                        </Stack>
                    </Paper>
                })}
            </Stack>
        </Paper>
    )
}