import React, {  Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore=useContext(ActivityStore);
  useEffect(()=>{
       activityStore.loadActivities();
  },[activityStore])
 
  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Yükleniyor"></LoadingComponent>;
  }
  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
       <Route path='/createActivity' component={ActivityForm}></Route>
      </Container>
    </Fragment>
  );
};

export default observer(App);
