import React, { useContext } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activityStore";
import { IActivity } from "../../../app/models/activity";
const ActivityListItem:React.FC<{activity:IActivity}>  = ({activity}) => {
    const activityStore=useContext(ActivityStore);
    const {deleteActivity,submiting,target}=activityStore;
  return (
  
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
              as={Link}
              to={`/activities/${activity.id}`}
              content="GÖZAT"
              color="blue"
            ></Button>
            <Button
              name={activity.id}
              loading={target === activity.id && submiting}
              floated="right"
              onClick={(e) => deleteActivity(e, activity.id)}
              content="SİL"
              color="red"
            ></Button>
            <Label basic content={activity.category}></Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    
  );
};

export default ActivityListItem;
