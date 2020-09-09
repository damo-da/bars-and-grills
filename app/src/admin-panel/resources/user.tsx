import * as React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DeleteButton,
  PasswordInput,
} from 'react-admin';
import MuiUserIcon from '@material-ui/icons/Person';

export const UserIcon = MuiUserIcon;

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }: { record?: any }) => (
  <span>
    User
    {record ? ` @${record.username}` : ''}
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
      <PasswordInput source="password" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props: any) => (
  <Create title="Add new User" {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);
