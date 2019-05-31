import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import shortcuts from "./shortcuts.json";
import "react-tabs/style/react-tabs.css";
import "./main.scss";

class EnvironmentShortcuts {
  constructor(os, shortcuts) {
    this.os = os;
    this.shortcuts = shortcuts;
  }
}

class TabSection extends React.Component {
  state = {
    shortcuts: shortcuts,
    environments: [],
    shorcutsPerEnvironments: []
  };

  filterByEnvironment = (environment, shortcuts) => {
    return shortcuts.filter(shortcut => shortcut.os === environment);
  };
  componentWillMount() {
    //add a slug to every shortcut for url
    let updatedShortcuts = [...this.state.shortcuts];
    const distinctEnvironments = [...new Set(updatedShortcuts.map(x => x.os))];

    const environmentArrays = distinctEnvironments.map(environment => {
      return new EnvironmentShortcuts(
        environment,
        this.filterByEnvironment(environment, shortcuts)
      );
    });
    console.log(environmentArrays);
    //otherwise all shortcuts are selected
    this.setState({
      shortcuts: updatedShortcuts,
      environments: distinctEnvironments
    });
  }

  renderTabs = environment => {
    return <Tab key={environment}>{environment}</Tab>;
  };
  render() {
    return (
      <Tabs>
        <TabList>{this.state.environments.map(this.renderTabs)}</TabList>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    );
  }
}

export default TabSection;
