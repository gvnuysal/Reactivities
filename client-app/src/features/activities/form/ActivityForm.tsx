import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFormState,
  createActivity,
  editActivity
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
  const handleInputChange = (event: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setactivity({ ...activity, [name]: value });
  };
  const handleSubmit=()=>{
    if(activity.id.length===0){
      let newActivity={
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    }
    else{
      editActivity(activity);
    }
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} >
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
        onChange={handleInputChange}
        name='description'
          placeholder="Description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
name='category'        
          placeholder="Category"
          onChange={handleInputChange}
          value={activity.category}
        ></Form.Input>
        <Form.Input
        name='date'
        onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        ></Form.Input>
        <Form.Input name='city' placeholder="City" onChange={handleInputChange} value={activity.city}></Form.Input>
        <Form.Input name='venue'  placeholder="Venue" onChange={handleInputChange} value={activity.venue}></Form.Input>
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
