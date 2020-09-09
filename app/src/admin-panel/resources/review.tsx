import * as React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DeleteButton,
  ReferenceField, ReferenceInput, SelectInput, NumberInput, DateField,
} from 'react-admin';
import UserIcon from '@material-ui/icons/VerifiedUser';

export const ReviewIcon = UserIcon;

export const ReviewList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="comment" />
      <TextField source="rating" />
      <DateField showTime source="timestamp" />

      <ReferenceField
        source="restaurant.id"
        reference="restaurants"
        label="Restaurant"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="user.id"
        reference="users"
        label="User"
      >
        <TextField source="username" />
      </ReferenceField>

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const ReviewTitle = ({ record }: { record?: any }) => (
  <span>
    Review
    {record ? ` by @${record.user.username}` : ''}
  </span>
);

ReviewTitle.defaultProps = {
  record: null,
};

export const ReviewEdit = (props: any) => (
  <Edit title={<ReviewTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="comment" />
      <NumberInput source="rating" min={1} max={5} />

      <ReferenceInput label="Restaurant" source="restaurant_id" reference="restaurants">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>

    </SimpleForm>
  </Edit>
);

export const ReviewCreate = (props: any) => (
  <Create title="Add new Review" {...props}>
    <SimpleForm>
      <TextInput source="comment" />
      <NumberInput source="rating" min={1} max={5} />
      <ReferenceInput label="Restaurant" source="restaurant_id" reference="restaurants">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
