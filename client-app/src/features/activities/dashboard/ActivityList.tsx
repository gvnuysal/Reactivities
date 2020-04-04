import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Link } from "react-router-dom";

const ActivityList: React.FC= () => {
  const activityStore=useContext(ActivityStore);
  const {activitiesByDate,deleteActivity,submiting,target}=activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
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
                  loading={target===activity.id && submiting}
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
export default observer(ActivityList);