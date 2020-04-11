import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Link } from "react-router-dom";
import ActivityListItem from "./AcrtvityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate} = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <ActivityListItem activity={activity} key={activity.id} ></ActivityListItem>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
