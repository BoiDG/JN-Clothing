import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

interface ITextField{
    name:string;
    label:string;
    required:boolean;
}

function FormInput(TextFieldData:ITextField) {
  const { control } = useFormContext();
  const {name,label,required} = TextFieldData;
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <TextField {...field} fullWidth name={name} label={label} required={required} error={isError} />
        )}
      />
    </Grid>
  );
}

export default FormInput;