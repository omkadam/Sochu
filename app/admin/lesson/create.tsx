import { Create, SimpleForm, List, TextInput, ReferenceInput, NumberInput } from "react-admin";

export const LessonCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" label="Title" />
                <ReferenceInput source="unitId" reference="units"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Create>
    )
}