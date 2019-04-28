import React from "react";
import logo from "./logo.svg";
import "./main.scss";
import shortcuts from "./shortcuts.json";

class Shortcuts extends React.Component {
  state = {
    shortcuts: shortcuts,
    selectedShortcut: []
  };

  componentWillMount() {
    //add a slug to every shortcut for url
    let updatedShortcuts = [...this.state.shortcuts];
    updatedShortcuts = updatedShortcuts.map(shortcut => {
      shortcut.slug = shortcut.title.replace(/\s+/g, "").toLowerCase();
      return shortcut;
    });

    const { params } = this.props.match;
    if (params.Id != null) {
      console.log("updating?");
      const selectedShortcut = updatedShortcuts.filter(
        shortcut => shortcut.slug == params.Id
      );
      this.setState({
        shortcuts: updatedShortcuts,
        selectedShortcut: selectedShortcut
      });
    } else {
      this.setState({
        shortcuts: updatedShortcuts,
        selectedShortcut: updatedShortcuts
      });
    }
  }

  goToShortcut(slug) {
    if (slug == "all") {
      let selectedShortcut = [...this.state.shortcuts];
      this.setState({ selectedShortcut });
      console.log("all");
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/${slug}`);
      let selectedShortcut = [...this.state.shortcuts];
      selectedShortcut = selectedShortcut.filter(
        shortcut => shortcut.slug == slug
      );
      this.setState({ selectedShortcut });
    }
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
    const generatedClassName = `box ${classTitle} h${classNumber}`;
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

  renderLinks = shortcuts => {
    console.log(shortcuts);
    return shortcuts.map((shortcut, i) => {
      return (
        <li key={i} onClick={() => this.goToShortcut(shortcut.slug)}>
          {shortcut.title} - {shortcut.slug}
        </li>
      );
    });
  };

  render() {
    return (
      <div id="wrapper">
        <header onClick={() => this.goToShortcut("all")}>
          <h1>Shortcuts</h1>
        </header>
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

export default Shortcuts;
