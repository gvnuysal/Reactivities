import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity:(event:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
  submitting:boolean;
  target:string;
}
const ActivityList: React.FC<IProps> = ({ activities, selectActivity,deleteActivity,submitting,target }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a"> {activity.title} </Item.Header>
              <Item.Meta> {activity.date} </Item.Meta>
              <Item.Description>
                <div> {activity.description} </div>
                <div>
                  {" "}
                  {activity.city}, {activity.venue}{" "}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  onClick={() => selectActivity(activity.id)}
                  content="GÖZAT"
                  color="blue"
                ></Button>
                 <Button
                 name={activity.id}
                  loading={target===activity.id && submitting}
                  floated="right"
                  onClick={(e) => deleteActivity(e,activity.id)}
                  content="SİL"
                  color="red"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default ActivityList;
