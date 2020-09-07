import * as React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, TextField, NumberField, EditButton, TextInput, DeleteButton,
  ReferenceField,
} from 'react-admin';
import MuiUserIcon from '@material-ui/icons/Person';

export const UserIcon = MuiUserIcon;

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }: { record?: any }) => (
  <span>
    User
    {record ? `"@${record.username}"` : ''}
  </span>
);

UserTitle.defaultProps = {
  record: null,
};

export const UserEdit = (props: any) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props: any) => (
  <Create title="Add new User" {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);
