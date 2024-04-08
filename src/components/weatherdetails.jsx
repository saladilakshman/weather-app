import "../App.css";
import { Box } from "@mui/material";
import { Temperature } from "./temperature";
import { Highlight } from "./highlight";
import { Forecast } from "./dailyforecast";
import { HourlyForeCastData } from "./hourlyforecast";
export const WeatherInfo = () => {
    return (
        <>
            <Box sx={{
                paddingBlockStart: '5rem',
                display: 'grid',
                gridTemplateColumns: {
                    lg: 'repeat(2, 1fr)',
                    xs: '1fr'
                },
                gridTemplateRows: '1fr',
                width: '100%',
                gridColumnGap: 8,
                grdiRowGap: { xs: 6 },
                placeItems: 'baseline',
                ml: { lg: -4, xs: 0 }
            }}>
                <Temperature />
                <Highlight />
                <Forecast />
                <HourlyForeCastData />
            </Box>
        </>

    )
}