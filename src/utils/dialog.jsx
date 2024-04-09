import { Dialog, Divider, Box, Typography, IconButton, ListItem, ListItemText, ListItemButton, Chip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styles } from "../AppStyles/styles";
import CloseIcon from '@mui/icons-material/Close';
import { WeatherState } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import debounce from "debounce";
import "../App.css";
import { API_KEYS } from "../keys";
export const SearchDialog = () => {
    const { mobile, state, dispatch, setCoordinates, setIsloading } = useContext(WeatherState);
    const [textvalue, setTextvalue] = useState('');
    const suggestions = ['Hyderabad', 'Delhi', 'London', 'Sydney', 'Bangkok']
    const [locationsuggestion, setLocationsuggestion] = useState(suggestions);
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "escape") {
                dispatch({ type: 'close-searchbox' })
            }
        })
    }, [dispatch]);

    useEffect(() =>
        debounce(() => {
            const options = {
                method: 'GET',
                url: 'https://place-autocomplete1.p.rapidapi.com/autocomplete/json',
                params: {
                    input: textvalue,
                    radius: '500'
                },
                headers: {
                    'X-RapidAPI-Key': API_KEYS.places,
                    'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com'
                }
            };
            axios.request(options)
                .then(res => {
                    const places = res?.data?.predictions?.map((location) => location.description);
                    if (places.length === 0) {
                        setLocationsuggestion(suggestions);
                    }
                    else {
                        setLocationsuggestion(places);
                    }
                })
                .catch(err => console.log(err));
        }, 200),
        [textvalue]);

    return (
        <Dialog
            open={state?.showsearchbar}
            sx={{ width: '100%' }}
            fullScreen={true}
            onClose={() => dispatch({ type: 'close-searchbox' })}
        >
            <Box component="div" sx={styles.searchbox.div}>
                <Box component="input"
                    placeholder="Search City.."
                    sx={styles.fullscreensearchbar.searchfield}
                    onChange={(e) => setTextvalue(e.target.value)}
                />
                <Box sx={styles.fullscreensearchbar.searchIcon}>
                    <SearchIcon />
                </Box>
                <Box sx={styles.fullscreensearchbar.esc}>
                    {mobile ? (
                        <IconButton onClick={() => dispatch({ type: 'close-searchbox' })}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <Chip label="Esc" variant="outlined" sx={{ cursor: 'pointer' }} onClick={() => dispatch({ type: 'close-searchbox' })} />
                    )}
                </Box>
            </Box>
            <Divider />
            <Typography variant="body2" color="inherit" sx={{ pl: 2, p: 1 }}>Suggestions</Typography>
            {locationsuggestion.map((city, index) => (
                <ListItem key={index} sx={{ p: 1, ...styles.searchbox.div.width }}>
                    <ListItemButton disablepadding={"true"} onClick={async (e) => {
                        dispatch({ type: 'close-searchbox' })
                        setIsloading(true)
                        await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${e.target.textContent}&limit=5&appid=${API_KEYS.weather}`)
                            .then(response => {
                                const [first] = response.data;
                                setCoordinates({
                                    lng: first?.lon,
                                    lat: first?.lat
                                })
                                setIsloading(false)
                            })
                            .catch(err => {
                                console.log(err.message);
                                setIsloading(false)
                            })
                    }}>
                        <ListItemText>{city}</ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </Dialog>
    );
};
