import { makeStyles} from '@material-ui/core/styles';


export default makeStyles(() => ({
    root: {
        marginTop:'5em',
        maxWidth: '90%',
        marginInline:'auto',
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
        '&:hover':{
            transform: 'scale(1.1, 1.1)',
            '&::after': {
              opacity: 1
          }
        }
      },
      media: {
       height:0,
       paddingTop:'56.25%'
      },
      cardContent: {
        display:'flex',
        justifyContent:'space-between'
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
        marginTop:'3em',
        marginLeft:'3em',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
      },
      imageSmol : {
        width:'7em',
        height:'4em',
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
        width:'100%',
        paddingLeft:'3em',
        alignItems:'flex-start'
      },
      sizeInput:{ 
        width:'25%',
        display:'flex',
        flexFlow:'column',
        marginBottom:'1em',
        alignItems:'flex-start'
      },
      spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
}));