import { Edit, SimpleForm, List, TextInput, ReferenceInput, NumberInput } from "react-admin";

export const UnitEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" label="id" />
                <TextInput source="title" label="Title" />
                <TextInput source="description" label="Description"/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Edit>
    )
}