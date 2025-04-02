import { Create, SimpleForm, List, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="question" label="question" />
                <SelectInput source="type" choices={[
                    {
                        id: "SELECT",
                        name: "SELECT"
                    },
                    {
                        id: "ASSIST",
                        name: "ASSIST"
                    }
                ]}/>
                <ReferenceInput source="lessonId" reference="lessons"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Create>
    )
}