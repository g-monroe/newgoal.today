/* eslint-disable */
import React from 'react';
import moment from 'moment';
import './Home.css';
import NavBar from '../../Components/Navbar/Navbar';
import { IGoalHandler, GoalHanlder } from '../../Handlers/GoalHandler';
import GoalEntity from '../../Entities/GoalEntity';

interface IHomeProps{
  goalHandler?: IGoalHandler;
}
interface IHomeState{
  loading: boolean;
  goal?: GoalEntity;
}
class Home extends React.Component<IHomeProps, IHomeState> {
  static defaultProps = {
    goalHandler: new GoalHanlder()
  }
  state: IHomeState = {
    loading: true
  }
  async componentDidMount() {
    let goal = await this.props.goalHandler!.getGoalByToday();
    if (goal.summary == "" || goal.summary == null){
      goal.summary = "No goal for today, check back tomorrow!";
      goal.infoUrl = "#";
      goal.infoText = "Check back tomorrow!";
    }
    this.setState({
        goal: goal,
        loading: false
    });
  }
  render() {
    if (this.state.loading){
      return (
        <div className="App">
          <NavBar></NavBar>
          <main>
            <h1 className="shadow">Today, <span className="highlight">{ moment().format('MMM DD, YYYY') }</span>, try to...</h1>
            <h2 className="shadow">Currently grabbing goal from server!</h2>
            <h3><a href="#">Please Wait.</a></h3>
          </main>
        </div>
      );
    }else{
      return (
        <div className="App">
          <NavBar></NavBar>
          <main>
            <h1 className="shadow">Today, <span className="highlight">{ moment().format('MMM DD, YYYY') }</span>, try to...</h1>
            <h2 className="shadow">{this.state.goal?.summary}</h2>
            <h3><a href={this.state.goal?.infoUrl}>{this.state.goal?.infoText}</a></h3>
          </main>
        </div>
      );
    }
  }
}

export default Home;
