export const styles = {
    appbar: {
        boxShadow: 0,
        color: 'inherit',
        bgcolor: 'black',
        p: 1
    },
    locationbutton: {
        borderRadius: 8,
        backgroundColor: '#dc90be',
        fontSize: { xs: 10, sm: 12 },
        '&:hover': {
            bgcolor: '#dc90be'
        }
    },
    logo: {
        logoname: {
            fontSize: { xs: 15, sm: 18, lg: 24 },
            color: 'inherit',
        },
        logoicon: {
            fontSize: { xs: 20, sm: 24, lg: 28 }
        }
    },
    searchbox: {
        div: {
            position: 'relative',
        },
        input: {
            display: { xs: 'none', sm: 'block', lg: 'block' },
            width: 295,
            height: 38,
            borderRadius: 5,
            outline: 'none',
            border: 'none',
            paddingLeft: 5,
            carretColor: 'white',
            bgcolor: '#252525',
            '&::placeholder': {
                fontFamily: 'roboto'
            },

        },
        searchIcon: {
            position: 'absolute',
            left: { xs: 2, sm: 5 },
            top: { xs: -12, sm: 6.8 }
        },
        shortcut: {
            position: 'absolute',
            display: { xs: 'none', sm: 'block' },
            width: 62,
            right: -12,
            top: 6,
            textShadow: 4
        }
    },
    fullscreensearchbar: {
        searchfield: {
            outline: 'none',
            border: 'none',
            width: '100%',
            height: 44,
            color: 'inherit',
            bgcolor: 'inherit',
            paddingLeft: 5,
            borderRadius: 1
        },
        searchIcon: {
            position: "absolute",
            top: 10,
            left: 5
        },
        esc: {
            position: 'absolute',
            right: 5,
            top: 8
        }
    },
    temperatureCard: {
        paper: {
            borderRadius: 2,
            width: 300,
            p: 2
        }
    },
    Readings: {
        allreadings: {
            display: 'grid',
            gridTemplateAreas: {
                lg: `
                         'box1 box1 box2 box2'
                         'box3 box4 box5 box6'
                                             `,
                xs: `'box1 box1'
                    'box2 box2'
                    'box3 box4'
                    'box5 box6'`
            },
            gridGap: 8,
            width: { xs: '100%' },
        }
    },
    dailyforecast: {
        backgroundColor: 'black',
        padding: 1,
        width: { xs: 25, lg: 30 },
    },
    hourlyforcast: {
        paper: {
            mt: 2,
            p: 2,
            width: { xs: '100%', lg: '100%' },
            height: '95%',
            overflow: 'hidden',
        },
        bottom: {
            pb: 1
        },
        flex: {
            overflow: 'auto', whiteSpace: 'nowrap'
        },
        secondPaper: {
            bgcolor: { lg: 'black', xs: '' },
            width: { xs: '100%' },
            p: 1
        },
        icon: {
            width: { xs: 25, lg: 30 }
        }
    },
    highlight: {
        paperOne: {
            mt: 2,
            p: 2,
            width: { xs: '100%', sm: '100%', lg: '60rem' }
        },
        paperBox: {
            bgcolor: 'black',
            elevation: 8,
            boxShadow: 4,
            width: '100%',
            height: '100%',
            paddingBlockStart: 1
        },
        paperTwo: {
            bgcolor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: 2,
            paddingInlineStart: 3,
            paddingBlockStart: 1,
            paddingBlockEnd: { xs: 2, lg: '' }
        },
        paperThree: {
            bgcolor: 'black',
            paddingBlock: 2
        },
        fonts: {
            fontSize: { xs: 14, sm: 15, lg: 20 }
        },

    }
}