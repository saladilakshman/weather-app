import { Box, Stack, Typography, Paper, Chip } from "@mui/material";
import { styles } from "../AppStyles/styles";
import { Wind, Sun, Sunset, Droplets, Waves, Eye, Thermometer } from 'lucide-react';
import { useEffect, useContext } from "react";
import { WeatherState } from "../App";
export const Highlight = () => {
    const { state, mobile } = useContext(WeatherState);
    useEffect(() => {
        const boxes = document.querySelector(".readings");
        Object.keys(boxes.children).map((val) => boxes.children[val].style.gridArea = `box${Number(val) + 1}`);
    }, [])
    const LevelIndicators = [
        {
            point: 1,
            color: '#45c000',
            text: 'Good',
        },
        {
            point: 2,
            color: '#a5f071',
            text: 'Fair',
        },
        {
            point: 3,
            color: '#eacb25',
            text: 'Moderate',
        },
        {
            point: 4,
            color: '#f13d35',
            text: 'Poor',
        },
        {
            point: 5,
            color: '#ba0000',
            text: 'very poor',
        },
    ];

    const { list: [particles] } = state.pollutiondata;
    const levelFinder = LevelIndicators.find((levelindicator) => levelindicator.point === particles.main.aqi)

    return (
        <Box component={Paper} sx={styles.highlight.paperOne}>
            <Typography variant="body1" color="inherit" sx={{ pb: 1 }}>Today highlights</Typography>
            <Box className="readings" sx={styles.Readings?.allreadings}>
                <Box className="item1" component={Paper} sx={{ ...styles.highlight.paperBox, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ paddingInline: 2 }}>
                        <Typography variant="body1" sx={{ color: 'grey' }}>Air Quality Index</Typography>
                        <Chip label={levelFinder?.text ?? 'Good'} size="small" sx={{ bgcolor: levelFinder?.color ?? '#45c000' }} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems={"center"} sx={{ paddingInline: 2 }}>
                        <Box>
                            <Wind size="33" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, lg: 5 } }}>
                            <Box>
                                <Typography variant={mobile ? 'body2' : 'body1'} sx={{ color: 'grey' }}>PM2.5</Typography>
                                <Typography variant="h6" sx={styles.highlight.fonts}>{particles?.componenents?.pm2_5 ?? 3.90}</Typography>
                            </Box>
                            <Box>
                                <Typography variant={mobile ? 'body2' : 'body1'} sx={{ color: 'grey' }}>So2</Typography>
                                <Typography variant="h6" sx={styles.highlight.fonts}>{particles?.componenents?.so2 ?? 7.75}</Typography>
                            </Box>
                            <Box>
                                <Typography variant={mobile ? 'body2' : 'body1'} sx={{ color: 'grey' }}>No2</Typography>
                                <Typography variant="h6" sx={styles.highlight.fonts}>{particles?.componenents?.no2 ?? 33.6}</Typography>
                            </Box>
                            <Box>
                                <Typography variant={mobile ? 'body2' : 'body1'} sx={{ color: 'grey' }}>O3</Typography>
                                <Typography variant="h6" sx={styles.highlight.fonts}>{particles?.componenents?.o3 ?? 38.6}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Box>



                <Box className="item2" component={Paper} sx={styles.highlight.paperTwo}>
                    <Typography variant="body1" sx={{ color: 'grey' }}>Sunrise and sunset</Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, lg: 4 }}>
                        <Stack direction="row" jusityContent="center" alignItems="center" spacing={1.5} sx={{ whiteSpace: 'nowrap' }}>
                            <Sun size="33" />
                            <Box>
                                <Typography variant="body2" sx={{ color: 'grey' }}>Sunrise</Typography>
                                <Typography variant="h5" sx={styles.highlight.fonts}>{new Date(state?.temperaturedata?.sys?.sunrise * 1000).toLocaleTimeString()}</Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" jusityContent="center" alignItems="center" spacing={1.5} sx={{ whiteSpace: 'nowrap' }}>
                            <Sunset size="33" />
                            <Box>
                                <Typography variant="body2" sx={{ color: 'grey' }}>Sunset</Typography>
                                <Typography variant="h5" sx={styles.highlight.fonts}>{new Date(state?.temperaturedata?.sys?.sunset * 1000).toLocaleTimeString()}</Typography>
                            </Box>
                        </Stack>
                    </Stack>

                </Box>






                <Box className="item3" component={Paper} sx={styles.highlight.paperThree}>
                    <Typography variant="bod2" sx={{ color: 'grey', paddingInlineStart: 4 }}>Humidity</Typography>
                    <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ paddingInline: { xs: 1.2, lg: 4 }, paddingBlockStart: 2 }}>
                        <Droplets size="33" />
                        <Typography variant="h5" sx={styles.highlight.fonts}>{Math.floor(state?.temperaturedata?.main?.humidity / 100 * 100)}%</Typography>
                    </Stack>
                </Box>



                <Box className="item4" component={Paper} sx={styles.highlight.paperThree}>
                    <Typography variant="bod2" sx={{ color: 'grey', paddingInlineStart: 4 }}>Visibility</Typography>
                    <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ paddingInline: { xs: 1.2, lg: 4 }, paddingBlockStart: 2 }} >
                        <Eye size="33" />
                        <Typography variant="h5" sx={styles.highlight.fonts}>{state?.temperaturedata?.visibility / 1000}Km</Typography>
                    </Stack>
                </Box>




                <Box className="item5" component={Paper} sx={styles.highlight.paperThree}>
                    <Typography variant="bod2" sx={{ color: 'grey', paddingInlineStart: 4 }}>Pressure</Typography>
                    <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ paddingInline: { xs: 1.2, lg: 4 }, paddingBlockStart: 2 }}>
                        <Waves size="33" />
                        <Typography variant="h5" sx={styles.highlight.fonts}>{state?.temperaturedata?.main?.pressure}hpa</Typography>
                    </Stack>
                </Box>



                <Box className="item6" component={Paper} sx={styles.highlight.paperThree}>
                    <Typography variant="bod2" sx={{ color: 'grey', paddingInlineStart: 4 }}>Feels like</Typography>
                    <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ paddingInline: { xs: 1.2, lg: 4 }, paddingBlockStart: 2 }}>
                        <Thermometer size="33" />
                        <Typography variant="h5" sx={styles.highlight.fonts}>{Math.floor(state?.temperaturedata?.main?.feels_like - 273.15)}&deg;C</Typography>
                    </Stack>
                </Box>



            </Box>
        </Box>

    )
}