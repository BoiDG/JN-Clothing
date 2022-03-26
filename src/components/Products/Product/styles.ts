import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
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
          }
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
          // display:'flex',
          marginTop:'3em',
          flexFlow:'row',
          display:'flex'
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
        imageSmol : {
          width:'7em',
          height:'8em',
          marginTop:'1em',
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
          }
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
          alignItems:'flex-start'
        },
        sizeInput:{ 
          width:'10em',
          display:'flex',
          flexFlow:'row',
          justifyContent:'space-between',
          marginBottom:'.5em',
          alignItems:'flex-end',
        }
}));