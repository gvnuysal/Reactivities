import React, {  useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivivityStore from "../../../app/stores/activityStore";

const ActivityDashboard: React.FC = () => {
  const activityStore=useContext(ActivivityStore);
  const {editMode,activity}=activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
      <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
