import { Edit, SimpleForm, List, TextInput, ReferenceInput, NumberInput } from "react-admin";

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="title" label="Title" />
                <ReferenceInput source="unitId" reference="units"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Edit>
    )
}