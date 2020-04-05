import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const activityStore = useContext(ActivivityStore);
  const {
    createActivity,
    editActivity,
    submiting,
    cancelFormOpen,
    activity: initializeFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then(
        () => initializeFormState && setactivity(initializeFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [loadActivity, match.params.id, clearActivity, initializeFormState]);

  const [activity, setactivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setactivity({ ...activity, [name]: value });
  };
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          name="category"
          placeholder="Category"
          onChange={handleInputChange}
          value={activity.category}
        ></Form.Input>
        <Form.Input
          name="date"
          onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        ></Form.Input>
        <Form.Input
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          value={activity.city}
        ></Form.Input>
        <Form.Input
          name="venue"
          placeholder="Venue"
          onChange={handleInputChange}
          value={activity.venue}
        ></Form.Input>
        <Button
          loading={submiting}
          floated="right"
          positive
          type="submit"
          content="KAYDET"
        ></Button>
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="VAZGEÇ"
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
