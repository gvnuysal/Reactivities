import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
configure({ enforceActions: "always" });
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable activity: IActivity | null=null;
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submiting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
  @action loadActivities = async () => {
    try {
      this.loadingInitial = true;
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          //this.activities.push(activity);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activty = this.getActivity(id);
    if (activty) {
      this.activity = activty;
    } else {
      this.loadingInitial = true;
      try {
        activty = await agent.Activities.details(id);
        runInAction("gettingActivity", () => {
          this.activity = activty;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("get activty error", () => {
          this.loadingInitial = false;
        });
        this.loadingInitial = false;
      }
    }
  };
  @action clearActivity=()=>{
    this.activity=null;
  }
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submiting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("create activity", () => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submiting = false;
      });
    } catch (error) {
      runInAction("error create activity", () => {
        this.submiting = false;
      });
    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.submiting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submiting = false;
      });
    } catch (error) {
      runInAction("error edit activity", () => {
        this.submiting = false;
      });
    }
  };
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submiting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.del(id);
      runInAction("delete activity", () => {
        this.activityRegistry.delete(id);
        this.submiting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submiting = false;
        this.target = "";
      });
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = null;
  };
  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };
  @action cancelSelectedActivity = () => {
    this.activity = null;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
  @action selectActivity = (id: string) => {
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());