import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFormState
}) => {
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setactivity] = useState<IActivity>(initializeForm);
  const handleInputChange = (event: any) => {
    setactivity({ ...activity, title: event.target.value });
  };
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Title"
          onChange={handleInputChange}
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
        ></Form.Input>
        <Form.Input placeholder="City" value={activity.city}></Form.Input>
        <Form.Input placeholder="Venue" value={activity.venue}></Form.Input>
        <Button
          floated="right"
          positive
          type="submit"
          content="KAYDET"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="VAZGEÇ"
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
