import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ActivityStore from "../../../app/stores/activityStore";
import { IActivity } from "../../../app/models/activity";
const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);
  const { deleteActivity, submiting, target } = activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header as="a"> {activity.title} </Item.Header>
              <Item.Description>Hosted by Güven.</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock"> </Icon> {activity.date}{" "}
     
        <Icon name="marker"></Icon>
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Attandees will go here.</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          as={Link}
          to={`/activities/${activity.id}`}
          content="GÖZAT"
          color="blue"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
