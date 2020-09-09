import * as React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DeleteButton,
} from 'react-admin';
import FastFoodIcon from '@material-ui/icons/Fastfood';

export const RestaurantIcon = FastFoodIcon;

export const RestaurantList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="review_count" />
      <TextField source="avg_rating" />
      <TextField source="background_image_url" />
      <EditButton basePath="/restaurants" />
      <DeleteButton />
    </Datagrid>
  </List>
);

const RestaurantTitle = ({ record }: { record?: any }) => (
  <span>
    Restaurant
    {record ? `${record.name}` : ''}
  </span>
);

RestaurantTitle.defaultProps = {
  record: null,
};

export const RestaurantEdit = (props: any) => (
  <Edit title={<RestaurantTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="background_image_url" />
    </SimpleForm>
  </Edit>
);

export const RestaurantCreate = (props: any) => (
  <Create title="Add new Restaurant" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="background_image_url" />
    </SimpleForm>
  </Create>
);
