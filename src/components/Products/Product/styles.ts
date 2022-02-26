import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(()=>({
        root: {
          marginTop:'5em',
          maxWidth: '90%',
          marginInline:'auto'
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
        }
}));