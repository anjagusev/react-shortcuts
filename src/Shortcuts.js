import React from "react";
import logo from "./logo.svg";
import "./main.scss";
import shortcuts from "./shortcuts.json";

function Shortcuts() {
  const renderKeys = (key, i) => {
    return <kbd key={i}>{key}</kbd>;
  };
  const renderTableRow = (command, i) => {
    return (
      <tr key={i}>
        <td>
          <p>{command.action}</p>
        </td>
        <td>
          <p>{command.keys.map((key, i) => renderKeys(key, i))}</p>
        </td>
      </tr>
    );
  };
  const renderTable = (shortcut, i) => {
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
                renderTableRow(command, i)
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLinks = shortcuts => {
    console.log(shortcuts);
    return shortcuts.map((shortcut, i) => {
      const urlLink = shortcut.title.replace(/\s+/g, "").toLowerCase();
      return (
        <li>
          {shortcut.title} - {urlLink}
        </li>
      );
    });
  };

  return (
    <div id="wrapper">
      <header>
        <h1>Shortcuts</h1>
      </header>
      <ul className="links">{renderLinks(shortcuts)}</ul>
      <div id="wrap">
        <div className="wrap">
          {shortcuts.map((shortcut, i) => renderTable(shortcut, i))}
        </div>
      </div>
    </div>
  );
}

export default Shortcuts;
