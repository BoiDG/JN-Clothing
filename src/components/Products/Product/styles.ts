import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
        root: {
          marginTop:'1.5em',
          maxWidth: '90%',
          width:'90em',
          marginInline:'auto',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease-in-out',
          alignItems: 'flex-start',
          '&::after': {
            content: '',
            position: 'absolute',
            zIndex: -1,
            width: '100%',
            height: '100%',
            opacity: 0,
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            transition: 'opacity 0.3s ease-in-out'
          },
          '&:hover':{
              transform: 'scale(1.1, 1.1)',
              '&::after': {
                opacity: 1
            }
          }
        },
        urlText : {
          textDecoration:'none',
          color:'grey',
          '&:hover':{
            textDecoration: 'underline'
          },
          
        },
        urlTextHeader : {
          paddingTop:'3em',
          textAlign:'left',
          color:'grey',
          fontFamily: "Montserrat",
          [theme.breakpoints.down('xs')]: {
            display:'none',
            paddingTop:'2em',
            
          },
        },
        media: {
         height:0,
         paddingTop:'100.25%'
        },
        cardContent: {
          display:'flex',
          justifyContent:'center'
        },
        cardContentPrice: {
          display:'flex',
          justifyContent:'center'
        },
        cardActions:{
          display:'flex',
          justifyContent:'space-between'
        },
        cardDesc:{
          display:'flex',
          justifyContent:'flex-start'
        },
        inputQty:{
          width:'3em'
        },
        productDetailLayout: { 
          marginTop:'3em',
          flexFlow:'row',
          display:'flex',
          [theme.breakpoints.down('xs')]: {
            flexFlow:'column',
            display:'flex',
            alignItems: 'center',
          },
        },
        image: {
          display:'flex',
          marginTop:'3em',
          marginLeft:'3em',
          borderRadius: '5px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          [theme.breakpoints.down('xl')]: {
            height: "1000px",
            width: "1000px",
          },
          [theme.breakpoints.down('lg')]: {
            height: "100vh",
            width: "100vh",
          },
          [theme.breakpoints.down('sm')]: {
            height: "400px",
            width: "400px",
          },
          [theme.breakpoints.down('xs')]: {
            height: "35vh",
            width: "35vh",
            display:'flex',
            marginLeft:'0em',
            

          },
        },
        imageSmol : {
          width:'7em',
          height:'8em',
          marginTop:'1em',
          marginBottom:'1em',
          marginLeft:'1em',
          maxWidth: '25%',
          '&:hover':{
            cursor:'pointer',
            transform: 'scale(1.1, 1.1)',
              '&::after': {
                opacity: 1
            }
          },
          backgroundColor: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease-in-out',
          '&::after': {
            content: '',
            position: 'absolute',
            zIndex: -1,
            width: '100%',
            height: '100%',
            opacity: 0,
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            transition: 'opacity 0.3s ease-in-out'
          },
          [theme.breakpoints.down('xs')]: {
            height: "10vh",
            width: "10vh",
            marginBottom: "3em",
            // display:'flex',
            // position: "absolute",
            // top: "33em",
            
            // flexDirection:'column-reverse',
            // flexFlow: 'column wrap',
          },
        },
        cardActionsDetails:{
          display:'flex',
          flexFlow:'column',
          alignItems:'flex-start',
          justifyContent:'flex-end'
        },
        description:{
          width:'60%',
          paddingInline:'3em',
          alignItems:'flex-start',
          [theme.breakpoints.down('xs')]: {
            display:'flex',
            flexFlow: 'column',
            width:'80%',
            // alignItems:'center',
          },
        },
        descriptionText: {
          paddingTop:'1em',
          textAlign:'left',
          width:'80%',
          color:'grey',
          [theme.breakpoints.down('xs')]: {
            paddingTop:'0em',
          },
        },
        button:{
          borderRadius: 2,
          backgroundColor: "black",
          paddingInline:'3em',
          color:'white',
          width:'60%',
          display: 'flex',
          justifyContent:'center',
          marginTop:'3em',
          [theme.breakpoints.down('xs')]: {
              display:'flex',
              width:'100%',
              marginLeft: '3em',
          },
        },

        buttonText:{
          fontSize:'1.5rem',
          [theme.breakpoints.down('xs')]: {
            fontSize:'1rem',
          
        },
        },

        sizeInput:{ 
          width:'10em',
          display:'flex',
          flexFlow:'row',
          justifyContent:'space-between',
          marginBottom:'.5em',
          alignItems:'flex-end',
          [theme.breakpoints.down('xs')]: {
            display:'flex',
            // marginTop:'30em',

          },
        },
        productPrice:{
          textAlign:'left',
          fontFamily: "Montserrat",
          fontSize:'1.5rem',
          [theme.breakpoints.down('xs')]: {
            diplay: 'flex',

            justifyContent:'center',
          },
        },

        productName:{
          display:'flex',
          textAlign:'left',
          fontFamily: "Montserrat",
          fontSize:'5rem',
          // fontWeight:'strong',
          width:'100%',
          [theme.breakpoints.down('xl')]: {
            width:'100%',
            fontSize:'8rem',
          },
          [theme.breakpoints.down('lg')]: {
            width:'100%',
            fontSize:'5rem',
          },
          [theme.breakpoints.down('sm')]: {
            width:'100%',
            fontSize:'2.5rem',
          },
          [theme.breakpoints.down('xs')]: {
            display:'flex',
            fontSize:'2rem',
            // justifyContent: 'center',
          },
        },
}));