import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import { CreateTable } from "../../Shared/Table";
import { getDesignNotes, deleteDesignNote } from '../../../services/api';
import { DesignNotesForm } from './Form';
import config from "../../../config";

export class DesignNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      sections: config.designNotes.sections,
      properties: config.designNotes.properties
    }
  };

  componentDidMount() {
    getDesignNotes(this.props.date).then(data => this.setState({ data, loading: false }))
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <Tabs>
          <TabList>
            {this.state.sections.map(s => <Tab key={s}>{s}</Tab>)}
          </TabList>

          {this.state.sections.map(s => (
            <TabPanel key={s}>
              {CreateTable(this.state.data.filter(x => x.section === s), this.state.properties, deleteDesignNote)}
              <DesignNotesForm date={this.props.date} section={s} properties={this.state.properties} />
            </TabPanel>
            ))}
        </Tabs>
      </>
    );
  }
}