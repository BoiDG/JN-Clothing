import { makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    // flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
  image: {
    width:'50em',
    maxWidth:'90%',
    marginTop:'3em',
    marginLeft:'3em',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
  },
  banner: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 2), rgba(0, 0, 0, 1)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: '300px',
      fontSize: "3em"
    }
  },
  bannerImg: {
    width: '80%', 
    height: "80%", 
    objectFit: "contain", 
    // paddingTop: "10%"
  },
  bannerBtn: {
    borderRadius: 2,
    backgroundColor: "transparent",
    paddingInline:'3em',
    color:'white',
    width:'100%',
    display: 'flex',
    justifyContent:'center',
    border: "3px solid white",
    marginTop:'1em',
  },
  container: {

  },
  containerBox: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "20px",
    backgroundColor: "green",

  },
  containerItm: {
    display: "flex",
    [theme.breakpoints.down('xs')]: {
      height: "200px",
    },
    backgroundColor: "blue",
    // backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url("https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")`,
    height: "300px",
    width: "300px"

  },

  secondBanner: {
    // backgroundImage: `url(./../asset/adam&god.jpg)`,
    backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url("https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '50vh'
  },

  itemImg: {
    width: '80%', 
    height: "80%", 
    objectFit: "contain",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  column: {
    float: 'left',
    width: '33.33%',
    padding: '15px',

  },
  row: {
    content: "",
    display: "table",
    clear: "both"

  }
}));