import React from "react";
import { withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./main.scss";
import shortcuts from "./shortcuts.json";

class Shortcuts extends React.Component {
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

  renderLinks = shortcuts => {
    return shortcuts.map((shortcut, i) => {
      return (
        <li key={i} onClick={() => this.props.goToShortcut(shortcut)}>
          {shortcut.title}
        </li>
      );
    });
  };

  render() {
    return (
      <div className="wrapper">
        <ul className="links">
          {this.renderLinks(this.props.shortcuts.shortcuts)}
        </ul>
        <div id="wrap">
          <div className="wrap">
            {this.props.selectedShortcut.map((shortcut, i) =>
              this.renderTable(shortcut, i)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shortcuts);
