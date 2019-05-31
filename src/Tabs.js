import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Shortcuts from "./Shortcuts";
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
    shortcutsPerEnvironments: [],
    tabIndex: 0
  };

  componentWillMount() {
    //add a slug to every shortcut for url
    let updatedShortcuts = [...this.state.shortcuts];
    updatedShortcuts = updatedShortcuts.map(this.generateSlugs);
    const distinctEnvironments = [...new Set(updatedShortcuts.map(x => x.os))];

    const environmentArrays = distinctEnvironments.map(environment => {
      return new EnvironmentShortcuts(
        environment,
        this.filterByEnvironment(environment, shortcuts)
      );
    });

    console.log(environmentArrays);
    console.log(environmentArrays.length);
    console.table(environmentArrays[0]);
    console.log(environmentArrays[0].os);

    const { params } = this.props.match;
    // console.log("params: ");
    // console.log(params);
    let index = 0;
    if (params.os != null) {
      index = distinctEnvironments.findIndex(env => env === params.os);
      console.log("found index! " + index);
    }

    //otherwise all shortcuts are selected
    this.setState({
      shortcuts: updatedShortcuts,
      environments: distinctEnvironments,
      shortcutsPerEnvironments: environmentArrays,
      tabIndex: index
    });
    console.log("state shortcuts");
    console.log(this.state.shortcuts);
  }
  getOSByIndex = index => {
    return this.state.environments[index];
  };
  filterByEnvironment = (environment, shortcuts) => {
    return shortcuts.filter(shortcut => shortcut.os === environment);
  };
  generateSlugs(shortcut) {
    shortcut.slug =
      shortcut.os.toLowerCase() +
      "-" +
      shortcut.title.replace(/\s+/g, "").toLowerCase();
    return shortcut;
  }

  renderTabs = environment => {
    return <Tab key={environment}>{environment}</Tab>;
  };

  renderShortcuts = shortcutsPerEnvironment => {
    console.log(shortcutsPerEnvironment);
    return (
      <TabPanel key={shortcutsPerEnvironment.os}>
        <Shortcuts
          shortcuts={shortcutsPerEnvironment}
          goToShortcut={this.goToShortcut}
        />
      </TabPanel>
    );
  };

  showMain = () => {
    this.props.history.push("/");
    var refreshedShortcuts = [...this.state.shortcutsPerEnvironments];
    this.setState({ shortcutsPerEnvironments: refreshedShortcuts });
  };

  onSelect = tabIndex => {
    let os = this.getOSByIndex(tabIndex);
    this.props.history.push(`/${os}`);
    this.setState({ tabIndex });
  };
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <header onClick={() => this.showMain()}>
            <h1>Shortcuts</h1>
          </header>

          <Tabs selectedIndex={this.state.tabIndex} onSelect={this.onSelect}>
            <TabList>{this.state.environments.map(this.renderTabs)}</TabList>
            {this.state.shortcutsPerEnvironments.map(this.renderShortcuts)}
            {/* <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel> */}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default TabSection;
