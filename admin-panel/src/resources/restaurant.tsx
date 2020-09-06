import * as React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput,
} from 'react-admin';
import FastFoodIcon from '@material-ui/icons/Fastfood';

export const RestaurantIcon = FastFoodIcon;

export const RestaurantList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="published_at" />
      <TextField source="average_note" />
      <TextField source="views" />
      <EditButton basePath="/posts" />
    </Datagrid>
  </List>
);

const RestaurantTitle = ({ record }: { record?: any }) => (
  <span>
    Restaurant
    {record ? `"${record.name}"` : ''}
  </span>
);

RestaurantTitle.defaultProps = {
  record: null,
};

export const RestaurantEdit = (props: any) => (
  <Edit title={<RestaurantTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="teaser" options={{ multiLine: true }} />
      <TextInput multiline source="body" />
      <DateInput label="Publication date" source="published_at" />
      <TextInput source="average_note" />
      <TextInput disabled label="Nb views" source="views" />
    </SimpleForm>
  </Edit>
);

export const RestaurantCreate = (props: any) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="teaser" options={{ multiLine: true }} />
      <TextInput multiline source="body" />
      <TextInput label="Publication date" source="published_at" />
      <TextInput source="average_note" />
    </SimpleForm>
  </Create>
);
