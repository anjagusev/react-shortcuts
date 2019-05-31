import React from "react";
import { withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./main.scss";
import shortcuts from "./shortcuts.json";

class Shortcuts extends React.Component {
  state = {
    shortcuts: [],

    selectedShortcut: []
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentWillMount() {
    console.log(this.props.shortcuts);

    //add a slug to every shortcut for url
    let updatedShortcuts = [...this.props.shortcuts.shortcuts];
    // const distinctEnvironments = [
    //   ...new Set(updatedShortcuts.map(x => x.os.toLowerCase()))
    // ];
    //updatedShortcuts = updatedShortcuts.map(this.generateSlugs);

    const { params } = this.props.match;
    console.log(params);
    console.log("is params empty?");
    if (params === "") {
      console.log("params is empty ");
    }
    if (this.isEmpty(params)) {
      console.log("empty");
      const selectedShortcut = updatedShortcuts;
      this.setState({
        shortcuts: updatedShortcuts,
        selectedShortcut: selectedShortcut
      });
    }
    // else {
    //otherwise all shortcuts are selected
    this.setState({
      shortcuts: updatedShortcuts,
      selectedShortcut: updatedShortcuts
    });
  }

  renderKeys = (key, i) => {
    return <kbd key={i}>{key}</kbd>;
  };
  renderTableRow = (command, i) => {
    return (
      <tr key={i}>
        <td>
          <p>{command.action}</p>
        </td>
        <td>
          <p>{command.keys.map((key, i) => this.renderKeys(key, i))}</p>
        </td>
      </tr>
    );
  };
  renderTable = (shortcut, i) => {
    //determines which css grid class to give the shortcut based on number of shortcuts, plus header and title.
    const classNumber = shortcut.commands.length + 2;
    const classTitle = shortcut.title.replace(/\s+/g, "").toLowerCase();
    const generatedClassName = `box ${classTitle} v${classNumber}`;
    return (
      <div key={i} className={generatedClassName}>
        <h2>{shortcut.title}</h2>
        <hr />
        <div className="box-wrapper">
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Action</p>
                </td>

                <td>
                  <p>Key</p>
                </td>
              </tr>
              {shortcut.commands.map((command, i) =>
                this.renderTableRow(command, i)
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  goToShortcut(shortcut) {
    console.log(this.state);
    if (shortcut.slug == "all") {
      let selectedShortcut = [...this.state.shortcuts];
      console.log(selectedShortcut);
      this.setState({ selectedShortcut });
      console.log("all");
      this.props.history.push(`/`);
    } else {
      console.log(this.state);
      console.log(shortcuts);
      let selectedShortcut = [...this.state.shortcuts];
      selectedShortcut = selectedShortcut.filter(
        sc => sc.slug == shortcut.slug
      );
      this.props.history.push(`/${shortcut.os}/${shortcut.slug}`);
      this.setState({ selectedShortcut });
    }
  }

  renderLinks = shortcuts => {
    return shortcuts.map((shortcut, i) => {
      return (
        <li key={i} onClick={() => this.goToShortcut(shortcut)}>
          {shortcut.title}
        </li>
      );
    });
  };

  render() {
    return (
      <div className="wrapper">
        <ul className="links">{this.renderLinks(this.state.shortcuts)}</ul>
        <div id="wrap">
          <div className="wrap">
            {this.state.selectedShortcut.map((shortcut, i) =>
              this.renderTable(shortcut, i)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shortcuts);
