import React, { Fragment } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import _ from 'lodash';
import Cookie from 'js-cookie';
import withReducer from './patch';

const initialTabs = [
  {
    title: 'title1',
    content: 'content1',
    id: _.uniqueId(),
  },
  {
    title: 'title2',
    content: 'content2',
    id: _.uniqueId(),
  },
];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'TAB_ADD':
      return [...state, payload.tab];
    case 'TAB_REMOVE':
      return state.filter(({ id }) => id !== payload.id);
    default:
      return state;
  }
};

const App = (props) => {
  const { tabs, setTabs, storage = Cookie } = props;

  const addTab = () => setTabs({
    type: 'TAB_ADD',
    payload: {
      tab: {
        id: _.uniqueId(),
        title: 'title2',
        content: 'content2',
      },
    },
  });

  const renderTabTitle = (tab) => {
    const { id, title } = tab;
    const removeTab = () => setTabs({
      type: 'TAB_REMOVE',
      payload: {
        id,
      },
    });

    return (
      <Fragment key={id}>
        <Tab data-test="tab-item">{title}</Tab>
        <button data-test="tab-remove-btn" type="button" onClick={removeTab} />
      </Fragment>
    );
  };

  const saveLastOpenedIndex = index => storage.set('lastTabIndex', index);

  const getLastOpenedIndex = () => storage.get('lastTabIndex') || 0;

  return (
    <>
      <Tabs defaultIndex={getLastOpenedIndex()} onSelect={saveLastOpenedIndex}>
        <TabList>
          <div data-test="tabs-box">
            {tabs.map(renderTabTitle)}
          </div>
        </TabList>

        <div>
          {tabs.map(({ content }) => (
            <TabPanel key={_.uniqueId()}>
              <h2>{content}</h2>
            </TabPanel>
          ))}
        </div>
      </Tabs>
      <button data-test="tab-add-btn" type="button" onClick={addTab} />
    </>
  );
};

export default withReducer('tabs', 'setTabs', reducer, initialTabs)(App);
