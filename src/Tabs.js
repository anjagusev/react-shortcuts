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
    tabIndex: 0,
    selectedShortcut: []
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
    let selectedShortcut = updatedShortcuts;
    let tabIndex = 0;
    const { params } = this.props.match;
    let index = 0;
    //if operating system param exists but shortcut param doesn't,
    //show all shortcuts based on operating system
    if (params.os != null && params.Id == null) {
      tabIndex = distinctEnvironments.findIndex(env => env === params.os);
      selectedShortcut = this.filterByEnvironment(
        params.os,
        this.state.shortcuts
      );
    }
    //if operating system and shortcut id exist, display the selected shortcut
    else if (params.Id != null) {
      selectedShortcut = updatedShortcuts.filter(sc => sc.slug == params.Id);
    }
    this.setState({
      shortcuts: updatedShortcuts,
      environments: distinctEnvironments,
      shortcutsPerEnvironments: environmentArrays,
      tabIndex,
      selectedShortcut
    });
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

  goToShortcut = shortcut => {
    //This is called when user clicks "Shortcuts" header.
    //It displays all existing shortcuts for tab1 operating system
    if (shortcut.slug == "all") {
      let selectedShortcut = [...this.state.shortcuts];

      this.props.history.push(`/`);
      this.setState({ selectedShortcut, tabIndex: 0 });
    } else {
      //This is called when a specific shortcut is clicked on.
      let selectedShortcut = [...this.state.shortcuts];
      selectedShortcut = selectedShortcut.filter(
        sc => sc.slug == shortcut.slug
      );
      this.setState({ selectedShortcut });
      this.props.history.push(`/${shortcut.os}/${shortcut.slug}`);
    }
  };

  renderShortcuts = shortcutObj => {
    return (
      <TabPanel key={shortcutObj.os}>
        <Shortcuts
          shortcuts={shortcutObj}
          goToShortcut={this.goToShortcut}
          selectedShortcut={this.state.selectedShortcut}
          environments={this.state.environments}
        />
      </TabPanel>
    );
  };

  //This is the tab select function
  onSelect = tabIndex => {
    let os = this.getOSByIndex(tabIndex);
    this.props.history.push(`/${os}`);
    let selectedShortcuts = this.filterByEnvironment(os, this.state.shortcuts);
    this.setState({ tabIndex, selectedShortcut: selectedShortcuts });
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <header onClick={() => this.goToShortcut({ slug: "all" })}>
            <h1>Shortcuts</h1>
          </header>

          <Tabs selectedIndex={this.state.tabIndex} onSelect={this.onSelect}>
            <TabList>{this.state.environments.map(this.renderTabs)}</TabList>
            {this.state.shortcutsPerEnvironments.map(this.renderShortcuts)}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default TabSection;
