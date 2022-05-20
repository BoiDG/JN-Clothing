import { makeStyles, fade } from '@material-ui/core/styles';
import { height } from '@mui/system';

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

  Wrapper: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "100%",
    backgroundColor:"#25272B",
    margin: "auto",
    padding: "1em",
    
  
  },

  column: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: "6em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0em",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0em",
    },

  },

  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "20px",
  
  },

  footerTitle: {
    fontSize: "1.5em",
    color: "#fff",
    fontFamily: "montserrat",
    marginBottom: "1em",
  },

  footerLinks: {
    fontSize: "0.8em",
    color: "#fff",
    marginBottom: "20px",
    fontFamily: "montserrat",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
    },
    '&:hover':{
      // transform: 'scale(1.1, 1.1)',
      color: "#ff9c00",
      transition: '200ms ease-in',
      '&::after': {
        opacity: 1
    }
  },
  

  },

  copyRight: {
    fontSize: "0.8em",
    color: "#fff",
    fontFamily: "montserrat",
    textAlign: "left",
  },

  LI: {
    fontFamily: "montserrat",
    fontSize: "16px",
    texttransform: "capitalize",
    color: "black",
    fontweight: "300",
    display: "block",

  },

  UL: {
    listStyle: "none",
    cursor: "pointer",

  },




  
}));